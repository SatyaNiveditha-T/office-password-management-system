-- Create OfficePasswordDB schema

-- Drop existing tables if they exist (for clean reinstall)
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'AuditLogs')
    DROP TABLE AuditLogs;
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Passwords')
    DROP TABLE Passwords;
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'OTP')
    DROP TABLE OTP;
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
    DROP TABLE Users;
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'Roles')
    DROP TABLE Roles;

-- Create Roles table
CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(1,1),
    RoleName NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(200),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Create Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Phone NVARCHAR(20),
    Department NVARCHAR(50),
    RoleID INT NOT NULL FOREIGN KEY REFERENCES Roles(RoleID),
    PasswordHash NVARCHAR(MAX) NOT NULL,
    MFAEnabled BIT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'Active',
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Create OTP table
CREATE TABLE OTP (
    OTPID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    OTPCode NVARCHAR(6) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    Verified BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Create Passwords table
CREATE TABLE Passwords (
    PasswordID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL FOREIGN KEY REFERENCES Users(UserID),
    EncryptedPassword NVARCHAR(MAX) NOT NULL,
    PasswordTitle NVARCHAR(100),
    URL NVARCHAR(500),
    Username NVARCHAR(100),
    Notes NVARCHAR(MAX),
    Category NVARCHAR(50),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Create AuditLogs table
CREATE TABLE AuditLogs (
    AuditID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Action NVARCHAR(100) NOT NULL,
    Resource NVARCHAR(100),
    ResourceID INT,
    OldValue NVARCHAR(MAX),
    NewValue NVARCHAR(MAX),
    IPAddress NVARCHAR(50),
    UserAgent NVARCHAR(500),
    Status NVARCHAR(20) DEFAULT 'Success',
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- Create indexes for better performance
CREATE INDEX IX_Users_Email ON Users(Email);
CREATE INDEX IX_Users_Status ON Users(Status);
CREATE INDEX IX_OTP_UserID ON OTP(UserID);
CREATE INDEX IX_Passwords_UserID ON Passwords(UserID);
CREATE INDEX IX_AuditLogs_UserID ON AuditLogs(UserID);
CREATE INDEX IX_AuditLogs_CreatedAt ON AuditLogs(CreatedAt);

-- Insert default roles
INSERT INTO Roles (RoleName, Description) VALUES
    ('Admin', 'Administrator with full access'),
    ('User', 'Regular user with limited access'),
    ('Manager', 'Manager with team oversight');

PRINT 'Database schema created successfully!';
