# Database Setup Scripts

This directory contains SQL scripts for setting up the EduJourney database.

## Scripts

- `00_drop_database.sql`: Drops the database if it exists (useful for clean setup)
- `01_create_database.sql`: Creates the database and necessary extensions
- `02_create_users_table.sql`: Creates the users table and related objects

## How to Use

1. First, make sure PostgreSQL is installed and running on your system
2. Open a terminal and connect to PostgreSQL as a superuser:
   ```bash
   psql -U postgres
   ```
3. Run the scripts in order:
   ```bash
   \i 00_drop_database.sql
   \i 01_create_database.sql
   \i 02_create_users_table.sql
   ```

## Database Structure

### Users Table

- `id`: Serial primary key
- `email`: Unique email address
- `password`: Hashed password
- `first_name`: User's first name
- `last_name`: User's last name
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

## Notes

- The scripts include automatic timestamp updates for the `updated_at` column
- An index is created on the email field for faster lookups
- The database uses the UUID extension for future use with other tables
