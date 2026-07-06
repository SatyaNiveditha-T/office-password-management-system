-- Sample data for testing

-- Insert sample users (password: Welcome@123 hashed with bcrypt)
-- Note: These are placeholder password hashes - use the createAdmin.js script to create real admin user
INSERT INTO Users (FullName, Email, Phone, Department, RoleID, PasswordHash, MFAEnabled, Status)
VALUES 
    ('John Doe', 'john.doe@office.com', '9876543210', 'IT', 1, '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 0, 'Active'),
    ('Jane Smith', 'jane.smith@office.com', '9876543211', 'HR', 2, '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 0, 'Active'),
    ('Bob Johnson', 'bob.johnson@office.com', '9876543212', 'Sales', 3, '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 0, 'Active');

-- Insert sample passwords
INSERT INTO Passwords (UserID, EncryptedPassword, PasswordTitle, URL, Username, Category, Notes)
VALUES
    (1, 'encrypted_password_1', 'Gmail Account', 'https://gmail.com', 'john.doe@gmail.com', 'Email', 'Personal email'),
    (1, 'encrypted_password_2', 'GitHub Account', 'https://github.com', 'johndoe', 'Development', 'GitHub repository access'),
    (2, 'encrypted_password_3', 'LinkedIn Account', 'https://linkedin.com', 'jane.smith', 'Social', 'Professional network'),
    (3, 'encrypted_password_4', 'Salesforce CRM', 'https://salesforce.com', 'bob.johnson', 'Business', 'CRM system access');

-- Insert sample audit logs
INSERT INTO AuditLogs (UserID, Action, Resource, ResourceID, Status)
VALUES
    (1, 'Login', 'User', 1, 'Success'),
    (2, 'ViewPassword', 'Password', 1, 'Success'),
    (3, 'CreatePassword', 'Password', 4, 'Success'),
    (1, 'UpdateUser', 'User', 2, 'Success');

PRINT 'Sample data inserted successfully!';
