const { sql } = require('../config/db');
const { encrypt, decrypt } = require('../utils/passwordCrypto');

exports.getPasswordsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await sql.query`
      SELECT PasswordID, UserID, EncryptedPassword, PasswordTitle, URL, Username, Notes, Category, CreatedAt
      FROM Passwords
      WHERE UserID = ${parseInt(userId)}
      ORDER BY PasswordID DESC
    `;

    const data = result.recordset.map(r => ({
      ...r,
      DecryptedPassword: null // do not expose by default
    }));

    res.json({ success: true, data, count: data.length });
  } catch (err) {
    console.error('Get Passwords Error:', err);
    res.status(500).json({ success: false, message: 'Error fetching passwords', error: err.message });
  }
};

exports.getPasswordCountByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await sql.query`
      SELECT COUNT(*) AS cnt FROM Passwords WHERE UserID = ${parseInt(userId)}
    `;
    const count = result.recordset[0].cnt || 0;
    res.json({ success: true, count });
  } catch (err) {
    console.error('Get Password Count Error:', err);
    res.status(500).json({ success: false, message: 'Error fetching password count', error: err.message });
  }
};

exports.createPassword = async (req, res) => {
  try {
    const { UserID, PasswordPlain, PasswordTitle, URL, Username, Notes, Category } = req.body;
    if (!UserID || !PasswordPlain) {
      return res.status(400).json({ success: false, message: 'UserID and PasswordPlain are required' });
    }
    const encrypted = encrypt(PasswordPlain);
    await sql.query`
      INSERT INTO Passwords (UserID, EncryptedPassword, PasswordTitle, URL, Username, Notes, Category)
      VALUES (${UserID}, ${encrypted}, ${PasswordTitle}, ${URL}, ${Username}, ${Notes}, ${Category})
    `;
    res.status(201).json({ success: true, message: 'Password stored' });
  } catch (err) {
    console.error('Create Password Error:', err);
    res.status(500).json({ success: false, message: 'Error storing password', error: err.message });
  }
};
