# Overview

The `BlogPlugin` class integrates a blogging module into AureusERP using FilamentPHP. It allows the registration of Filament resources, pages, clusters, and widgets dynamically based on the active panel (`admin` or `customer`).

## Plugin Structure

The plugin follows a modular structure with separate directories for `Admin` and `Customer` functionalities. To add menus, resources, clusters, pages, and widgets, you must create the appropriate directory and implement the necessary components.

### File Location

This plugin should be placed inside the `Webkul\Blog` namespace, in `plugins/webkul/blogs/src/BlogPlugin.php`.

## Class Definition: `BlogPlugin`

The plugin class implements the `Filament\Contracts\Plugin` contract:

```php
<?php

namespace Webkul\Blog;

use Filament\Contracts\Plugin;
use Filament\Panel;
use Webkul\PluginManager\Package;

class BlogPlugin implements Plugin
{
    // ...
}
```

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
                ->discoverResources(
                    in: __DIR__.'/Filament/Customer/Resources',
                    for: 'Webkul\\Blog\\Filament\\Customer\\Resources'
                )
                ->discoverPages(
                    in: __DIR__.'/Filament/Customer/Pages',
                    for: 'Webkul\\Blog\\Filament\\Customer\\Pages'
                )
                ->discoverClusters(
                    in: __DIR__.'/Filament/Customer/Clusters',
                    for: 'Webkul\\Blog\\Filament\\Customer\\Clusters'
                )
                ->discoverWidgets(
                    in: __DIR__.'/Filament/Customer/Widgets',
                    for: 'Webkul\\Blog\\Filament\\Customer\\Widgets'
                );
        })
        ->when($panel->getId() == 'admin', function (Panel $panel) {
            $panel
                ->discoverResources(
                    in: __DIR__.'/Filament/Admin/Resources',
                    for: 'Webkul\\Blog\\Filament\\Admin\\Resources'
                )
                ->discoverPages(
                    in: __DIR__.'/Filament/Admin/Pages',
                    for: 'Webkul\\Blog\\Filament\\Admin\\Pages'
                )
                ->discoverClusters(
                    in: __DIR__.'/Filament/Admin/Clusters',
                    for: 'Webkul\\Blog\\Filament\\Admin\\Clusters'
                )
                ->discoverWidgets(
                    in: __DIR__.'/Filament/Admin/Widgets',
                    for: 'Webkul\\Blog\\Filament\\Admin\\Widgets'
                );
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

## Adding Resources, Pages, Clusters, and Widgets

- **Admin Panel (`admin`)**: Create the required Filament components inside `Filament/Admin/`
- **Customer Panel (`customer`)**: Create the required Filament components inside `Filament/Customer/`

For example, to register a blog post resource into admin then you have to create **resources** into the **Admin** directory and if you wish to show resources into the **frontend** then you have to create resources into the **Customer** directory below is the example of the demo code.

### `Filament/Admin/Resources/PostResource.php`

```php
<?php

namespace Webkul\Blog\Filament\Admin\Resources;

use Filament\Resources\Resource;
use Webkul\Blog\Models\Post;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
}
```

## Registering Your Plugin's **BlogPlugin.php** with the Panels

After creating your **BlogPlugin.php**, register it with the Filament panels from the `packageRegistered()` method of your [service provider](service-provider.md), using `Panel::configureUsing()`:

```php
use Filament\Panel;

public function packageRegistered(): void
{
    Panel::configureUsing(function (Panel $panel): void {
        $panel->plugin(BlogPlugin::make());
    });
}
```

This attaches the plugin to every panel. The `register()` method of the plugin then decides, per panel, which components to load — and skips everything when the plugin is not installed.
