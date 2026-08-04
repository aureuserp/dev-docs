# **Overview**

Clusters in AureusERP are used to organize related resources and custom pages within the FilamentPHP panel. They help streamline navigation by grouping similar sections, reducing sidebar clutter, and improving user experience.

## **Benefits of Using Clusters**

- A new navigation item is created, linking to the first resource or page within the cluster.
- Individual resources and pages are removed from the main sidebar, making the interface cleaner.
- A sub-navigation UI is introduced within the cluster for easy access to grouped items.
- URLs of resources and pages are automatically prefixed with the cluster name, ensuring better organization.
- Breadcrumbs display the cluster name, linking back to the first resource or page within the cluster for consistent navigation.

Clusters help structure complex applications by logically grouping related sections, improving usability while maintaining a well-organized interface.

## **Example: Defining a Cluster**

Clusters live in the plugin's `src/Filament/.../Clusters` directory, where they are auto-discovered by the plugin class's `discoverClusters()` call. Each cluster extends `Filament\Clusters\Cluster` and declares its slug, navigation label, and [navigation group](filament.md#navigation-groups):

```php
<?php

namespace Webkul\Maintenance\Filament\Clusters;

use Filament\Clusters\Cluster;
use Webkul\Support\Enums\NavigationGroup;

class Maintenance extends Cluster
{
    protected static ?string $slug = 'maintenance/maintenance';

    protected static ?int $navigationSort = -1;

    public static function getNavigationLabel(): string
    {
        return __('maintenance::filament/clusters/maintenance.navigation.title');
    }

    public static function getNavigationGroup(): string|\UnitEnum
    {
        return NavigationGroup::Maintenance;
    }
}
```

For more details, refer to [Clusters](../getting-started/clusters.md).
