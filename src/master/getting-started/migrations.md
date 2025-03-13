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

```txt
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

## **Settings Migrations**

Spatie’s [Laravel Settings](https://filamentphp.com/plugins/filament-spatie-settings) package provides a structured way to manage system-wide settings using a database instead of configuration files. It allows defining, storing, and retrieving settings dynamically, ensuring consistency across different environments.

## **Key Features of Spatie Laravel Settings**

- **Database-Driven Settings:** Store configuration values dynamically.
- **Type-Safe Settings:** Define strict types and validation rules.
- **Cached for Performance:** Optimized retrieval with caching.
- **Grouped Settings:** Organize settings into structured classes.
- **Auto-Discovery:** Automatically loads registered settings.

## **Creating a Settings Page in Filament**

You can create a settings page using the following Artisan command:

```bash
php artisan make:filament-settings-page ManageProduct ProductSettings
```

This command will prompt you to select the panel where you want to create the settings:

```txt
┌ Which panel would you like to create this in? ───────────────┐
│ › ● admin                                                    │
│ ○ customer                                                   │
└──────────────────────────────────────────────────────────────┘
```

After selecting the panel, another prompt will ask for the namespace in which you want to create the settings page:

```txt
┌ Which namespace would you like to create this in? ─────────────────┐
│ › ● Webkul\Contact\Filament\Clusters\Configurations\Pages          │
│ ○ Webkul\Employee\Filament\Clusters\Configurations\Pages           │
│ ○ Webkul\Inventory\Filament\Clusters\Configurations\Pages          │
│ ○ Webkul\Inventory\Filament\Clusters\Operations\Pages              │
└────────────────────────────────────────────────────────────────────┘
```

For this example, we assume you are creating the setting inside:

```txt
┌ Which namespace would you like to create this in? ───────────┐
│ Webkul\Support\Filament\Clusters\Settings\Page               │
└──────────────────────────────────────────────────────────────┘
```

This will generate a settings page file in the following directory:

```txt
+-- plugins
|   +-- webkul
|   |   +-- inventories
|   |   |   +-- src
|   |   |   |   +-- Filament
|   |   |   |   |   +-- Clusters
|   |   |   |   |   |   +-- Settings
|   |   |   |   |   |   |   +-- Pages
|   |   |   |   |   |   |   |   +-- ManageProduct.php
```

### **Generated Settings Page Class**

```php
<?php

namespace Webkul\Inventory\Filament\Clusters\Settings\Pages;

use Webkul\Support\Filament\Clusters\Settings;
use App\Settings\ProductSettings;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\SettingsPage;

class ManageProduct extends SettingsPage
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = ProductSettings::class;

    protected static ?string $cluster = Settings::class;

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                // Define form fields here
            ]);
    }
}
```

## **Creating the ProductSettings Class**

Next, create a settings class that will store database-based settings:

```php
<?php

namespace Webkul\Inventory\Settings;

use Spatie\LaravelSettings\Settings;

class ProductSettings extends Settings
{
    public bool $enable_variants;
    public bool $enable_uom;
    public bool $enable_packagings;

    public static function group(): string
    {
        return 'inventories_product';
    }
}
```

### **Updating the ManageProduct Class**

Once you have created the `ProductSettings` class, update the `ManageProduct` settings page to use it.

## **Creating a Settings Migration**

To create a migration for the settings, run:

```bash
php artisan make:settings-migration create_inventories_products_settings
```

This will generate a migration file. Place the migration inside:

```txt
+-- plugins
|   +-- webkul
|   |   +-- inventories
|   |   |   +-- database
|   |   |   |   +-- factories
|   |   |   |   +-- migrations
|   |   |   |   +-- seeders
|   |   |   |   +-- settings   # Place migration files here
```

adding settings according to your need, make sure you have to use same **Webkul\Inventory\Settings\ProductSettings** group name as prefix like shown given below.

```php
<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('inventories_product.enable_variants', true);
        $this->migrator->add('inventories_product.enable_uom', false);
        $this->migrator->add('inventories_product.enable_packagings', false);
    }

    public function down(): void
    {
        $this->migrator->deleteIfExists('inventories_product.enable_variants');
        $this->migrator->deleteIfExists('inventories_product.enable_uom');
        $this->migrator->deleteIfExists('inventories_product.enable_packagings');
    }
};

```

## **Registering the Migration in the Service Provider**

After placing the migration files, they must be registered within the corresponding **Service Provider** of the plugin to ensure they are loaded when running `php artisan migrate`.

## **Example: InventoryServiceProvider.php After setting migrations**

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
            ->hasSettings([
                '2025_03_12_111247_create_inventories_products_settings'
            ])
            ->runsSettings()
            ->hasInstallCommand(function (InstallCommand $command) {})
            ->hasUninstallCommand(function (UninstallCommand $command) {});
    }

    public function packageBooted(): void
    {
        // Additional boot logic if necessary
    }
}
```

after this you can perform laravel default migrations operations like migrate, rollback etc.
