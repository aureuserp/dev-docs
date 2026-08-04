# Overview

Clusters in AureusERP help organize resources and custom pages within the FilamentPHP panel. They allow logical grouping of related sections, reducing sidebar clutter and enhancing navigation.

## When using clusters

- A new navigation item links to the first resource or page within the cluster.
- Individual navigation items are removed from the main sidebar.
- A sub-navigation UI is added within the cluster.
- URLs of resources and pages are prefixed with the cluster name.
- Breadcrumbs display the cluster name, linking to the first resource or page.

## Creating a Cluster

To enable clusters in AureusERP, configure the panel to discover cluster classes. Add the following in your panel configuration:

```php
    public function register(Panel $panel): void
    {
        $panel
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
                    // below method is responsible to discover the clusters form blog plugin.
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

Now, generate a cluster using:

```sh
php artisan make:filament-cluster Posts
```

This creates a `Posts` cluster in `Webkul\Blog\Filament\Admin\Clusters`:

```php
<?php

namespace Webkul\Blog\Filament\Admin\Clusters;

use BackedEnum;
use Filament\Clusters\Cluster;
use UnitEnum;
use Webkul\Support\Enums\NavigationGroup;

class Posts extends Cluster
{
    protected static ?string $slug = 'blog/posts';

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static ?int $navigationSort = 2;

    public static function getNavigationLabel(): string
    {
        return __('Posts');
    }

    public static function getNavigationGroup(): string|UnitEnum
    {
        return NavigationGroup::Website;
    }
}
```

You can customize the navigation using `$navigationLabel`, `$navigationSort`, and `$navigationGroup`. Note that in Filament 5 the `$navigationIcon` property is typed `string|BackedEnum|null`, and `getNavigationGroup()` returns `string|UnitEnum`. AureusERP plugins group their navigation using the shared `Webkul\Support\Enums\NavigationGroup` enum so that all plugins appear under consistent groups in the sidebar.

## Adding Resources and Pages to a Cluster

To assign a resource or page to a cluster, set the `$cluster` property:

```php
use Webkul\Blog\Filament\Admin\Clusters\Posts;

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

## More Information

For more details, refer to the [FilamentPHP Clusters Documentation](https://filamentphp.com/docs/5.x/navigation/clusters).
