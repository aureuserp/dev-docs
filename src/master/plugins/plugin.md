# Overview

The `BlogPlugin` class integrates a blogging module into Aureus ERP using FilamentPHP. It allows the registration of Filament resources, pages, clusters, and widgets dynamically based on the active panel (`admin` or `customer`).

## Plugin Structure

The plugin follows a modular structure with separate directories for `Admin` and `Customer` functionalities. To add menus, resources, clusters, pages, and widgets, you must create the appropriate directory and implement the necessary components.

### File Location

This plugin should be placed inside the `Webkul\Blog` namespace.

## Class Definition: `BlogPlugin`

### Methods and Responsibilities

### `getId(): string`

Returns the unique identifier for the plugin.

```php
public function getId(): string
{
    return 'blogs';
}
```

### `make(): static`

Creates an instance of the plugin using Laravel's service container.

```php
public static function make(): static
{
    return app(static::class);
}
```

### `register(Panel $panel): void`

Registers Filament resources, pages, clusters, and widgets based on the panel ID (`admin` or `customer`). If the plugin is not installed, registration is skipped.

```php
public function register(Panel $panel): void
{
    if (! Package::isPluginInstalled($this->getId())) {
        return;
    }

    $panel
        ->when($panel->getId() == 'customer', function (Panel $panel) {
            $panel
                ->discoverResources(in: $this->getPluginBasePath('/Filament/Customer/Resources'), for: 'Webkul\\Blog\\Filament\\Customer\\Resources')
                ->discoverPages(in: $this->getPluginBasePath('/Filament/Customer/Pages'), for: 'Webkul\\Blog\\Filament\\Customer\\Pages')
                ->discoverClusters(in: $this->getPluginBasePath('/Filament/Customer/Clusters'), for: 'Webkul\\Blog\\Filament\\Customer\\Clusters')
                ->discoverClusters(in: $this->getPluginBasePath('/Filament/Customer/Widgets'), for: 'Webkul\\Blog\\Filament\\Customer\\Widgets');
        })
        ->when($panel->getId() == 'admin', function (Panel $panel) {
            $panel
                ->discoverResources(in: $this->getPluginBasePath('/Filament/Admin/Resources'), for: 'Webkul\\Blog\\Filament\\Admin\\Resources')
                ->discoverPages(in: $this->getPluginBasePath('/Filament/Admin/Pages'), for: 'Webkul\\Blog\\Filament\\Admin\\Pages')
                ->discoverClusters(in: $this->getPluginBasePath('/Filament/Admin/Clusters'), for: 'Webkul\\Blog\\Filament\\Admin\\Clusters')
                ->discoverClusters(in: $this->getPluginBasePath('/Filament/Admin/Widgets'), for: 'Webkul\\Blog\\Filament\\Admin\\Widgets');
        });
}
```

### `boot(Panel $panel): void`

This method is currently empty but can be used for additional setup during the plugin boot process.

```php
public function boot(Panel $panel): void
{
    // Additional setup if required
}
```

### `getPluginBasePath($path = null): string`

Returns the base path of the plugin, useful for dynamically locating directories.

```php
protected function getPluginBasePath($path = null): string
{
    $reflector = new \ReflectionClass(get_class($this));
    return dirname($reflector->getFileName()) . ($path ?? '');
}
```

## Adding Resources, Pages, Clusters, and Widgets

- **Admin Panel (`admin`)**: Create the required Filament components inside `Filament/Admin/`
- **Customer Panel (`customer`)**: Create the required Filament components inside `Filament/Customer/`

For example, to register a blog post resource into admin then you have to create **resources** into the **Admin** directory and if you wish to show resources into the **frontend** then you have to create resources into the **Customer** directory below is the example of the demo code.

### `Filament/Admin/Resources/BlogPostResource.php`

```php
namespace Webkul\Blog\Filament\Admin\Resources;

use Filament\Resources\Resource;
use Webkul\Blog\Models\BlogPost;
use Filament\Resources\Forms;
use Filament\Resources\Tables;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
}
```

## Registering Your Plugin's **BlogPlugin.php** into the **bootstrap/plugins.php**

After creating your **BlogPlugin.php**, register it in `bootstrap/plugins.php`:

```php
<?php

return [
    // Other plugin to be registered.
    Webkul\Blog\BlogPlugin::class,
];
```
