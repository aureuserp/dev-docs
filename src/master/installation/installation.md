# Installation & Configuration

Installing and setting up Aureus ERP is quick and straightforward. Follow the steps below to get started:

1. **Run the Installation Command**  
   Simply execute the following command in your terminal:

   ```bash
   php artisan erp:install
   ```

2. **What Happens During Installation**:

   - **Migrations & Seeders**:
     - All migrations and seeders from the core or base Laravel project are executed to set up the database schema and populate initial data.
   - **Roles & Permissions**:
     - The `Filament Shield` package automatically generates roles and permissions for the application.
   - **Database Seeders**:
     - Additional seeders are generated and executed to ensure the database is fully populated with the required default configurations.

3. **Admin Account Setup**

   - After the installation process, the command prompts you to provide **Admin Login Credentials** (email and password).
   - These credentials are used to log in to the admin panel.

4. **Installation Complete**  
   Once the above steps are finished, the installation process is complete, and you can start using Aureus ERP.

That’s it! With just one command, your Aureus ERP environment is ready to use.
