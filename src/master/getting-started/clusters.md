# Overview

Clusters in Aures ERP help organize resources and custom pages within the FilamentPHP panel. They allow logical grouping of related sections, reducing sidebar clutter and enhancing navigation.

## When using clusters

- A new navigation item links to the first resource or page within the cluster.
- Individual navigation items are removed from the main sidebar.
- A sub-navigation UI is added within the cluster.
- URLs of resources and pages are prefixed with the cluster name.
- Breadcrumbs display the cluster name, linking to the first resource or page.

## Creating a Cluster

To enable clusters in Aures ERP, configure the panel to discover cluster classes. Add the following in your panel configuration:

```php
    public function register(Panel $panel): void
    {
        if (! Package::isPluginInstalled($this->getId())) {
            return;
        }

        $panel
            ->when($panel->getId() == 'admin', function (Panel $panel) {
                $panel
                    ->discoverResources(in: $this->getPluginBasePath('/Filament/Resources'), for: 'Webkul\\Blog\\Filament\\Resources')
                    ->discoverPages(in: $this->getPluginBasePath('/Filament/Pages'), for: 'Webkul\\Blog\\Filament\\Pages')
                    ->discoverClusters(in: $this->getPluginBasePath('/Filament/Clusters'), for: 'Webkul\\Blog\\Filament\\Clusters')
                    ->discoverWidgets(in: $this->getPluginBasePath('/Filament/Widgets'), for: 'Webkul\\Blog\\Filament\\Widgets');
            });
    }
```

Now, generate a cluster using:

```sh
php artisan make:filament-cluster Posts
```

This creates a `Products` cluster in `Webkul\Blog\Filament\Clusters`:

```php
<?php

namespace Webkul\Blog\Filament\Clusters;

use Filament\Clusters\Cluster;

class Posts extends Cluster
{
    protected static ?string $slug = 'blog/posts';

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?int $navigationSort = 2;

    public static function getNavigationLabel(): string
    {
        return __('Posts');
    }

    public static function getNavigationGroup(): string
    {
        return __('Blog');
    }
}
```

You can customize the navigation using `$navigationLabel`, `$navigationSort`, and `$navigationGroup`.

## Adding Resources and Pages to a Cluster

To assign a resource or page to a cluster, set the `$cluster` property:

```php
use Webkul\Blog\Filament\Clusters\Posts;

protected static ?string $cluster = Posts::class;
```

## Recommended Code Structure

For better organization, store related resources and pages inside a directory matching the cluster name:

```
+-- Clusters
|   +-- Posts.php
|   +-- Posts
|   |   +-- Resources
|   |   |   +-- PostResource.php
|   |   |   +-- PostResource
|   |   |   |   +-- Pages
|   |   |   |   |   +-- CreatePost.php
|   |   |   |   |   +-- EditPost.php
|   |   |   |   |   +-- ListPosts.php
```

Filament will prompt whether to place new resources or pages inside a cluster when using `make:filament-resource` or `make:filament-page`.

## More Information

For more details, refer to the [FilamentPHP Clusters Documentation](https://filamentphp.com/docs/3.x/panels/clusters).
