# Overview

The service provider is the entry point for your plugin. It handles registration of migrations, settings, dependencies, and installation/uninstallation commands.

## BlogServiceProvider Example

```php
<?php

namespace Webkul\Blog;

use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Webkul\Support\Console\Commands\InstallCommand;
use Webkul\Support\Console\Commands\UninstallCommand;
use Webkul\Support\Package;
use Webkul\Support\PackageServiceProvider;

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
        // Migration files will be listed here
      ])
      ->runsMigrations()
      ->hasSettings([
        // Settings migrations will be listed here
      ])
      ->runsSettings()
      ->hasDependencies([
        'website',
      ])
      ->hasInstallCommand(function (InstallCommand $command) {
        $command
          ->installDependencies()
          ->runsMigrations();
      })
      ->hasUninstallCommand(function (UninstallCommand $command) {});
  }

  public function packageBooted(): void
  {
    FilamentAsset::register([
      Css::make('blogs', __DIR__.'/../resources/dist/blogs.css'),
    ], 'blogs');
  }
}
```

## Service Provider Configuration

### Registering Migrations

[Migrations](../getting-started/migrations.md) are crucial for setting up your plugin's database schema. Register them in the service provider:

```php
public function configureCustomPackage(Package $package): void
{
    $package->name(static::$name)
        ->hasViews()
        ->hasTranslations()
        ->hasMigrations([
            '2025_03_06_093011_create_blogs_categories_table',
            '2025_03_06_094011_create_blogs_posts_table',
            '2025_03_07_065635_create_blogs_tags_table',
            '2025_03_07_065715_create_blogs_post_tags_table',
        ])
        ->runsMigrations();
}
```

The `hasMigrations()` method registers the migrations that will be used by the application, while `runsMigrations()` ensures they are executed during plugin installation.

### Registering Settings

[Settings](../getting-started/settings.md) allow users to configure your plugin. Register them like this:

```php
public function configureCustomPackage(Package $package): void
{
    $package->name(static::$name)
        ->hasViews()
        ->hasTranslations()
        ->hasMigrations([...])
        ->runsMigrations()
        ->hasSettings([
            '2025_03_12_111247_create_blogs_posts_settings'
        ])
        ->runsSettings();
}
```

The `hasSettings()` method registers setting migrations, while `runsSettings()` ensures they are executed during plugin installation.

### Managing Dependencies

If your plugin depends on other plugins, declare them using the `hasDependencies()` method:

```php
->hasDependencies([
    'website',
])
```

This ensures that when your plugin is installed, its dependencies are installed first. In this example, the 'website' plugin will be installed before the 'blogs' plugin.

### Installation and Uninstallation

The `hasInstallCommand()` and `hasUninstallCommand()` methods define what happens when your plugin is installed or uninstalled:

```php
->hasInstallCommand(function (InstallCommand $command) {
    $command
        ->installDependencies()
        ->runsMigrations();
})
->hasUninstallCommand(function (UninstallCommand $command) {
    // Cleanup operations
});
```

When uninstalling a plugin, the system will prompt for confirmation:

```shell
Are you sure you want to uninstall this package? This action cannot be undone! (yes/no) [no]:
> yes
```

If you attempt to uninstall a plugin that other plugins depend on, you'll receive a warning:

```shell
Package website has dependents: blogs. Please uninstall dependents first!
```

### Additional Configuration

The `packageBooted()` method allows you to add additional configurations, such as registering CSS, JavaScript, or other resources:

```php
public function packageBooted(): void
{
    FilamentAsset::register([
        Css::make('blogs', __DIR__.'/../resources/dist/blogs.css'),
    ], 'blogs');
}
```

## Registering Your plugin's Provider

After creating your service provider, register it in `bootstrap/providers.php`:

```php
<?php

return [
    // Other service providers
    Webkul\Blog\BlogServiceProvider::class,
];
```
