# **Settings Migrations**

[Spatie’s Laravel Settings](https://filamentphp.com/plugins/filament-spatie-settings) package provides a structured way to manage system-wide settings using a database instead of configuration files. It allows defining, storing, and retrieving settings dynamically, ensuring consistency across different environments.

## **Key Features of Spatie Laravel Settings**

- **Database-Driven Settings:** Store configuration values dynamically.
- **Type-Safe Settings:** Define strict types and validation rules.
- **Cached for Performance:** Optimized retrieval with caching.
- **Grouped Settings:** Organize settings into structured classes.
- **Auto-Discovery:** Automatically loads registered settings.

## **Creating a Settings Page in Filament**

You can create a settings page using the following Artisan command:

```bash
php artisan make:filament-settings-page ManagePosts PostSettings
```

This command will prompt you to select the panel where you want to create the settings:

```
┌ Which panel would you like to create this in? ───────────────┐
│ › ● admin                                                    │
│ ○ customer                                                   │
└──────────────────────────────────────────────────────────────┘
```

After selecting the panel, another prompt will ask for the namespace in which you want to create the settings page:

```
┌ Which namespace would you like to create this in? ─────────────────┐
│ › ● Webkul\Inventory\Filament\Clusters\Settings\Pages              │
│ ○ Webkul\Manufacturing\Filament\Clusters\Settings\Pages            │
│ ○ Webkul\Website\Filament\Admin\Clusters\Settings\Pages            │
│ ○ Webkul\Support\Filament\Clusters\Settings\Pages                  │
└────────────────────────────────────────────────────────────────────┘
```

For this example, we assume you are creating the setting inside:

```
┌ Which namespace would you like to create this in? ───────────┐
│ Webkul\Blog\Filament\Admin\Clusters\Settings\Pages           │
└──────────────────────────────────────────────────────────────┘
```

This will generate a settings page file in the following directory:

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- src
|   |   |   |   +-- Filament
|   |   |   |   |   +-- Admin
|   |   |   |   |   |   +-- Clusters
|   |   |   |   |   |   |   +-- Settings
|   |   |   |   |   |   |   |   +-- Pages
|   |   |   |   |   |   |   |   |   +-- ManagePosts.php
```

### **Generated Settings Page Class**

```php
<?php

namespace Webkul\Blog\Filament\Admin\Clusters\Settings\Pages;

use BackedEnum;
use Filament\Pages\SettingsPage;
use Filament\Schemas\Schema;
use Webkul\Blog\Settings\PostSettings;
use Webkul\Support\Filament\Clusters\Settings;

class ManagePosts extends SettingsPage
{
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string $settings = PostSettings::class;

    protected static ?string $cluster = Settings::class;

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Define form fields here
            ]);
    }
}
```

::: tip Unified Settings
Every plugin attaches its settings pages to the shared `Webkul\Support\Filament\Clusters\Settings` cluster. This groups all plugin settings under a single **Settings** section in the admin panel, so always set `$cluster` to this class instead of creating a plugin-specific settings cluster.
:::

## **Creating the PostSettings Class**

Next, create a settings class that will store database-based settings:

```php
<?php

namespace Webkul\Blog\Settings;

use Spatie\LaravelSettings\Settings;

class PostSettings extends Settings
{
    public bool $enable_comments;
    public bool $require_approval_for_comments;
    public bool $enable_ratings;

    public static function group(): string
    {
        return 'blogs_posts';
    }
}
```

### **Updating the ManagePosts Class**

Once you have created the `PostSettings` class, update the `ManagePosts` settings page to use it.

## **Creating a Settings Migration**

To create a migration for the settings, run:

```bash
php artisan make:settings-migration create_blogs_posts_settings
```

This will generate a migration file. Place the migration inside:

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- database
|   |   |   |   +-- factories
|   |   |   |   +-- migrations
|   |   |   |   +-- seeders
|   |   |   |   +-- settings   # Place migration files here
```

adding settings according to your need, make sure you have to use same **Webkul\Blog\Settings\PostSettings** group name as prefix like shown given below.

```php
<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('blogs_posts.enable_comments', false);
        $this->migrator->add('blogs_posts.require_approval_for_comments', false);
        $this->migrator->add('blogs_posts.enable_ratings', false);
    }

    public function down(): void
    {
        $this->migrator->deleteIfExists('blogs_posts.enable_comments');
        $this->migrator->deleteIfExists('blogs_posts.require_approval_for_comments');
        $this->migrator->deleteIfExists('blogs_posts.enable_ratings');
    }
};
```

## **Registering the Migration in the Service Provider**

After placing the migration files, they must be registered within the corresponding **Service Provider** of the plugin to ensure they are loaded when running `php artisan migrate`.

## **Example: BlogServiceProvider.php After setting migrations**

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
            ->hasSettings([
                '2025_03_12_111247_create_blogs_posts_settings',
            ])
            ->runsSettings()
            ->hasInstallCommand(function (InstallCommand $command) {
                $command
                    ->installDependencies()
                    ->runsMigrations();
            })
            ->hasUninstallCommand(function (UninstallCommand $command) {});
    }

    public function packageBooted(): void
    {
        // Additional boot logic if necessary
    }
}
```

after this you can perform laravel default migrations operations like migrate, rollback etc or it will automatic execute settings migrations when you install plugin.

## **Retrieving Settings**

AureusERP provides a centralized `settings()` helper (backed by `Webkul\Support\SettingsRegistry`) for retrieving settings anywhere in your code. The registry resolves each settings class once and reuses the same instance for subsequent calls:

```php
use Webkul\Blog\Settings\PostSettings;

if (settings(PostSettings::class)->enable_comments) {
    // Comments are enabled
}
```

You can also resolve the settings class directly from the container using `app(PostSettings::class)`, but the `settings()` helper is the preferred approach across plugins.
