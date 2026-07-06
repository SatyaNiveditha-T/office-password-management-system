-- Create the OfficePasswordDB database

-- Check if database exists and drop it (for clean reinstall)
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'OfficePasswordDB')
BEGIN
    ALTER DATABASE OfficePasswordDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE OfficePasswordDB;
END

-- Create new database
CREATE DATABASE OfficePasswordDB;

-- Use the database
USE OfficePasswordDB;

PRINT 'Database OfficePasswordDB created successfully!';
