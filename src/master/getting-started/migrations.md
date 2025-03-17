# **Migrations**

Migrations provide a structured way to manage database schemas, enabling version control for database changes. They ensure consistency across development and production environments.

## **Key Features of Migrations**

- **Version Control:** Track database changes efficiently.
- **Schema Management:** Modify tables, columns, indexes, and constraints easily.
- **Rollback & Refresh:** Revert changes without losing data integrity.
- **Seeding Support:** Populate tables with default data using seeders.

## **Creating a Migration**

You can create a migration using the following Artisan command:

```bash
php artisan make:migration create_products_table
```

Alternatively, you can generate a model along with its migration using:

```bash
php artisan make:model Product -m
```

This will create:

- A model file in `app/Models/Product.php`
- A migration file in `database/migrations/`

## **Organizing Migrations in Plugin Structure**

Once a migration or model is created, you need to place them in the appropriate directories within the plugin structure:

```
+-- plugins
|   +-- webkul
|   |   +-- inventories
|   |   |   +-- database
|   |   |   |   +-- factories
|   |   |   |   +-- migrations  # Place migration files here
|   |   |   |   +-- seeders
|   |   |   |   +-- settings
|   |   |   +-- resources
|   |   |   +-- src
|   |   |   |   +-- Filament
|   |   |   |   |   +-- Clusters
|   |   |   |   |   |   +-- Inventories.php
|   |   |   |   |   |   +-- Inventories
|   |   |   |   |   |   |   +-- Resources
|   |   |   |   |   |   |   |   +-- InventoryResource.php
|   |   |   |   |   |   |   |   +-- InventoryResource
|   |   |   |   |   |   |   |   |   +-- Pages
|   |   |   |   |   |   |   |   |   |   +-- CreateInventory.php
|   |   |   |   |   |   |   |   |   |   +-- EditInventory.php
|   |   |   |   |   |   |   |   |   |   +-- ListInventories.php
|   |   |   |   +-- Models  # Place your model here and update its namespace
```

## **Registering Migrations in the Plugin Service Provider**

After placing the migration files, they must be registered within the corresponding **Service Provider** of the plugin. This ensures that migrations are loaded when running `php artisan migrate`.

### **Example: InventoryServiceProvider.php**

```php
<?php

namespace Webkul\Inventory;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Webkul\Support\Console\Commands\InstallCommand;
use Webkul\Support\Console\Commands\UninstallCommand;
use Webkul\Support\Package;
use Webkul\Support\PackageServiceProvider;

class InventoryServiceProvider extends PackageServiceProvider
{
    public static string $name = 'inventories';

    public static string $viewNamespace = 'inventories';

    public function configureCustomPackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations()
            ->hasMigrations([
                '2025_01_06_072032_create_products_table', // Register the migration file
            ])
            ->runsMigrations() // Ensure the migrations run when needed
            ->hasInstallCommand(function (InstallCommand $command) {})
            ->hasUninstallCommand(function (UninstallCommand $command) {});
    }

    public function packageBooted(): void
    {
        //
    }
}
```

## **Understanding Migration Registration**

1. **`hasMigrations([...])`**

   - This method registers the migration file inside the plugin.
   - The filename should match the migration file placed in `database/migrations/`.
   - Example: `'2025_01_06_072032_create_products_table'`

2. **`runsMigrations()`**

   - This method ensures that the registered migrations will run automatically when executing `php artisan migrate`.

### **Running Migrations in a Plugin**

After registration, you can apply migrations using:

```bash
php artisan migrate
```

To rollback the last migration:

```bash
php artisan migrate:rollback
```

To reset all migrations and re-run them:

```bash
php artisan migrate:refresh
```
