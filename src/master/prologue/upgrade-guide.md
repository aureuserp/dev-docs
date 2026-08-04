# Upgrade Guide

## Upgrading to v1.5.0

AureusERP **v1.5.0** upgrades the underlying stack. Before upgrading, make sure your server meets the new requirements:

- **PHP**: 8.3 or higher
- **Laravel**: 13.x
- **FilamentPHP**: 5.x

::: warning
If you have custom plugins or Filament customizations, review them against Filament 5 and Laravel 13 before upgrading, as these are major framework upgrades.
:::

## Upgrade Steps

To upgrade **AureusERP** to the latest version, follow these steps:

### 1. Backup Your Project

Before proceeding with the upgrade, ensure you **back up** your existing database and project files:

### 2. Pull the Latest Code

Navigate to your project’s root directory and pull the latest changes:

```sh
git pull origin master
```

If you have local changes that conflict with the update, you may need to **stash** them first:

```sh
git stash
git pull origin master
git stash pop  # Restore stashed changes
```

### 3. Update Dependencies

Once the latest code is pulled, update the dependencies:

```sh
composer install --no-dev --optimize-autoloader
```

If necessary, update Filament:

```sh
composer update filament/filament --with-dependencies
```

### 4. Verify `.env` Configuration

Check your **`.env`** file and ensure it contains the correct database and application settings. If necessary, update it to reflect any new configurations introduced in the latest version.

### 5. Clear Cache and Recompile Assets

Run the following commands to clear cache and refresh your application settings:

```sh
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

### 6. Run Database Migrations

Execute the migration command to apply any new database schema changes:

```sh
php artisan migrate
```

::: warning
If your project has significant customizations, review the migrations carefully before running them.
:::

### 7. Update Storage and Symlink Public Assets

Ensure storage links are correctly set up by running:

```sh
php artisan storage:link
```

If your existing project depends on local storage or logs, copy them to the latest version:

```sh
cp -r storage-backup/app/public storage/app/public
```

Perform testing on all major features before deploying the upgraded application to production.
