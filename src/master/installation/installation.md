# Installation & Configuration

Installing and setting up AureusERP is quick and straightforward. Follow the steps below to get started:

## 1. Clone or Download the Repository

You can get the latest version of AureusERP from GitHub:

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

## 4. Configure the Environment File

Copy the example environment file and generate the application key:

```bash
cp .env.example .env
php artisan key:generate
```

By default, the application uses SQLite (`DB_CONNECTION=sqlite`). To use MySQL instead, edit the `.env` file and configure the database settings as per your environment:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Or, to use PostgreSQL (supported as of v1.5.0):

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

## 5. Run the Installation Command

Execute the following command to install AureusERP:

```bash
php artisan erp:install
```

The command can also be run non-interactively by passing the admin credentials as options:

```bash
php artisan erp:install --admin-name="Administrator" --admin-email="admin@example.com" --admin-password="password"
```

## 6. What Happens During Installation?

### a. Migrations

- All migrations are executed to set up the database schema.

### b. Roles & Permissions

- The `Filament Shield` package automatically generates roles and permissions for the application, and all permissions are assigned to the admin role.

### c. Storage Link

- A symbolic link from `public/storage` to `storage/app/public` is created if it does not already exist.

### d. Seeders

- Seeders are executed to populate initial data, including the default company.

### e. Admin User & Default Settings

- The admin user is created, assigned the admin role, and linked to the default company, and the default settings (company, role, and currency) are synced.

## 7. Admin Account Setup

During the installation, you will be prompted to provide **Admin Login Credentials** (name, email, and password). These credentials are used to log in to the admin panel. The password must be at least 8 characters long.

::: warning Reinstallation
If AureusERP is already installed, running `php artisan erp:install` again will ask for explicit confirmation and then **wipe the database** before reinstalling. This action cannot be undone.
:::

## 8. Filament Installation Notes

- AureusERP uses FilamentPHP, which introduces new features and improvements.
- Ensure your PHP version is compatible (PHP 8.3 or higher required).
- The installation process automatically sets up Filament Shield roles and permissions.
- Filament resources, pages, clusters, and widgets are registered separately for admin and customer panels.
- For plugin development, follow the new Filament resource registration structure.
- The `composer.json` includes a post-autoload-dump script that runs `php artisan filament:upgrade` to handle Filament upgrades.
- Refer to the [FilamentPHP documentation](https://filamentphp.com/docs/5.x) for detailed information.

## 9. Final Steps

Once the installation is complete, you can start the development server:

```bash
php artisan serve
```

Then, open your browser and access the application at:

```bash
http://127.0.0.1:8000
```

That’s it! Your AureusERP environment is now ready to use.
