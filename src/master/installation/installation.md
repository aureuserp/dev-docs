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

By default, the application uses MySQL (`DB_CONNECTION=mysql`). Edit the `.env` file and configure the database settings as per your environment:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Or, to use MariaDB 10.6+:

```bash
DB_CONNECTION=mariadb
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

Or, to use PostgreSQL 16+ (supported as of v1.5.0):

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

## 5. Run the Installation Command

```bash
php artisan erp:install
```

The installer asks for:

1. **Country**: the country your business is based in. The default currency is taken from it.
2. **Admin name, email and password**: used to log in to the admin panel. The password must be at least 8 characters.

### Non-interactive install

To skip all prompts, pass the values as options:

```bash
php artisan erp:install --admin-name="Administrator" --admin-email="admin@example.com" --admin-password="password"
```

Add `--country="India"` or `--currency="INR"` to also set the country or currency. If you pass neither, the currency from `APP_CURRENCY` in `.env` (default `USD`) is used.

| Option | Description | If not passed |
|--------|-------------|---------------|
| `--admin-name` | Admin user name. | Asked as a prompt. |
| `--admin-email` | Admin user email. | Asked as a prompt. |
| `--admin-password` | Admin password (minimum 8 characters). | Asked as a prompt. |
| `--country` | Country name or two letter code. The currency is derived from it. | Asked as a prompt. |
| `--currency` | Currency ISO code. Overrides the country. | Currency from `APP_CURRENCY` in `.env`. |
| `--force` | Skip the reinstall confirmation. The database is wiped. | Confirmation is asked. |

## 6. What Happens During Installation?

### a. Migrations

- All migrations are executed to set up the database schema.

### b. Roles & Permissions

- The `Filament Shield` package automatically generates roles and permissions for the application, and all permissions are assigned to the admin role.

### c. Storage Link

- A symbolic link from `public/storage` to `storage/app/public` is created if it does not already exist.

### d. Seeders

- Seeders are executed to populate initial data, including the default company. The country and currency from step 5 are then applied to that company.

### e. Admin User & Default Settings

- The admin user is created, assigned the admin role, and linked to the default company, and the default settings (company, role, and currency) are synced.

### f. Installation Marker

- A `storage/installed` file is created to mark the installation as complete.

::: tip APP_CURRENCY
The base currency is stored in the settings. If it differs from `APP_CURRENCY` in your `.env`, the installer prints a warning. Set `APP_CURRENCY` to the installed currency so the fallback matches.
:::

## 7. Admin Account Setup

During the installation, you will be prompted to provide **Admin Login Credentials** (name, email, and password). These credentials are used to log in to the admin panel. The password must be at least 8 characters long.

::: warning Reinstallation
If AureusERP is already installed (the `storage/installed` file exists), running `php artisan erp:install` again asks you to type `REINSTALL` and then confirm a second time. It then runs `migrate:fresh` and **wipes the database** before reinstalling. This action cannot be undone. Passing `--force` skips these confirmations.
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
