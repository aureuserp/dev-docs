# **Migrations**

[Migrations](https://laravel.com/docs/13.x/migrations) provide a structured way to manage database schemas, enabling version control for database changes. They ensure consistency across development and production environments.

## **Key Features of Migrations**

- **Version Control:** Track database changes efficiently.
- **Schema Management:** Modify tables, columns, indexes, and constraints easily.
- **Rollback & Refresh:** Revert changes without losing data integrity.
- **Seeding Support:** Populate tables with default data using seeders.

## **Creating a Migration**

You can create a migration using the following Artisan command:

```bash
php artisan make:migration create_posts_table
```

Alternatively, you can generate a model along with its migration using:

```bash
php artisan make:model Post -m
```

This will create:

- A model file in `app/Models/Post.php`
- A migration file in `database/migrations/`

## **Organizing Migrations in Plugin Structure**

Once a migration or model is created, you need to place them in the appropriate directories within the plugin structure:

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- database
|   |   |   |   +-- factories
|   |   |   |   +-- migrations  # Place migration files here
|   |   |   |   +-- seeders
|   |   |   |   +-- settings
|   |   |   +-- resources
|   |   |   +-- src
|   |   |   |   +-- Filament
|   |   |   |   |   +-- Admin
|   |   |   |   |   |   +-- Resources
|   |   |   |   |   |   |   +-- PostResource.php
|   |   |   |   |   |   |   +-- PostResource
|   |   |   |   |   |   |   |   +-- Pages
|   |   |   |   |   |   |   |   |   +-- CreatePost.php
|   |   |   |   |   |   |   |   |   +-- EditPost.php
|   |   |   |   |   |   |   |   |   +-- ListPosts.php
|   |   |   |   |   |   |   |   |   +-- ViewPost.php
|   |   |   |   +-- Models  # Place your model here and update its namespace
```

## **Registering Migrations in the Plugin Service Provider**

After placing the migration files, they must be registered within the corresponding **Service Provider** of the plugin. This ensures that migrations are loaded when running `php artisan migrate`.

### **Example: BlogServiceProvider.php**

```php
<?php

namespace Webkul\Blog;

use Webkul\PluginManager\Console\Commands\InstallCommand;
use Webkul\PluginManager\Console\Commands\UninstallCommand;
use Webkul\PluginManager\Package;
use Webkul\PluginManager\PackageServiceProvider;

class BlogServiceProvider extends PackageServiceProvider
{
    public static string $name = 'blogs';

    public static string $viewNamespace = 'blogs';

    public function configureCustomPackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations()
            ->hasMigrations([
                '2025_03_06_094011_create_blogs_posts_table', // Register the migration file
            ])
            ->runsMigrations() // Ensure the migrations run when needed
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->installDependencies()
                    ->runsMigrations();
            })
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
   - Example: `'2025_03_06_094011_create_blogs_posts_table'`

2. **`runsMigrations()`**
   - This method ensures that the registered migrations will run automatically when executing `php artisan migrate`.

When you install plugins all configured migrations, settings and other configuration will be runs else, you can run migrations manually

### **Running Migrations manually**

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
