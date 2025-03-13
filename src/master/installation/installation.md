# Installation & Configuration

Installing and setting up Aureus ERP is quick and straightforward. Follow the steps below to get started:

## 1. Clone or Download the Repository

You can get the latest version of Aureus ERP from GitHub:

```bash
git clone https://github.com/aureuserp/aureuserp.git
```

Alternatively, you can download the ZIP file from the repository and extract it.

## 2. Navigate to the Project Root

```bash
cd aureuserp
```

## 3. Install PHP Dependencies

Run the following command to install the required PHP dependencies:

```bash
composer install
```

If you are setting up a fresh project, you can use:

```bash
composer create-project
```

## 4. Configure the Environment File

Copy the example environment file and update the database configurations:

```bash
cp .env.example .env
```

Edit the `.env` file and configure the database settings as per your environment:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

## 5. Run the Installation Command

Execute the following command to install Aureus ERP:

```bash
php artisan erp:install
```

## 6. What Happens During Installation?

### a. Migrations & Seeders

- All migrations and seeders from the core Laravel project are executed to set up the database schema and populate initial data.

### b. Roles & Permissions

- The `Filament Shield` package automatically generates roles and permissions for the application.

### c. Database Seeding

- Additional seeders are executed to ensure the database is fully populated with the required default configurations.

## 7. Admin Account Setup

During the installation, you will be prompted to provide **Admin Login Credentials** (email and password). These credentials are used to log in to the admin panel.

## 8. Final Steps

Once the installation is complete, you can start the development server:

```bash
php artisan serve
```

Then, open your browser and access the application at:

```bash
http://127.0.0.1:8000
```

That’s it! Your Aureus ERP environment is now ready to use.
