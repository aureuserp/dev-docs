# **Overview**

The `Filament` directory is used to define clusters, resources, and pages within the FilamentPHP panel. This structure allows for better organization and management of different sections in the plugin.

For more details, refer to [Resources](../getting-started/resources/getting-started.md).

## **Types of Resource Registrations in the Plugin**

In the `BlogPlugin`, we register resources, pages, and clusters for two main panels:

1. **Admin Panel** (`Admin` directory)
2. **Customer Panel** (`Customer` directory)

Each panel has its own directory structure for managing Filament-related components.

## **Registering Resources and Clusters**

The `register` method ensures that resources, pages, and clusters are only registered if the plugin is installed. It also distinguishes between `admin` and `customer` panels, dynamically loading their respective components.

### **Implementation in `BlogPlugin.php`**

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

Here `Package` is the `Webkul\PluginManager\Package` class, whose static `isPluginInstalled()` method checks the plugin's installation state.

### **Explanation**

- **Checks if the plugin is installed** before registering components.
- **Registers Filament resources, pages, clusters, and widgets** separately for the `admin` and `customer` panels.
- **Uses `discoverResources`, `discoverPages`, `discoverClusters`, and `discoverWidgets`** to automatically load Filament components from the correct directories.

## **Directory Structure**

To properly register resources, clusters, and pages, the following directory structure must be followed:

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- src
|   |   |   |   +-- Filament
|   |   |   |   |   +-- Admin
|   |   |   |   |   |   +-- Resources   # Admin-specific Filament resources
|   |   |   |   |   |   +-- Pages       # Admin-specific pages
|   |   |   |   |   |   +-- Clusters    # Admin-specific clusters
|   |   |   |   |   |   +-- Widgets     # Admin-specific widgets
|   |   |   |   |   +-- Customer
|   |   |   |   |   |   +-- Resources   # Customer-specific Filament resources
|   |   |   |   |   |   +-- Pages       # Customer-specific pages
|   |   |   |   |   |   +-- Clusters    # Customer-specific clusters
|   |   |   |   |   |   +-- Widgets     # Customer-specific widgets
```

## **Usage Guidelines**

- **Admin Panel (`Admin` directory):**
  - If you want to display resources and clusters in the **admin panel**, create your Filament components inside the `Admin` directory.

- **Customer Panel (`Customer` directory):**
  - If you want to show Filament resources and clusters in the **customer panel**, create them inside the `Customer` directory.

::: tip
Plugins that only target the admin panel (for example the `maintenance` plugin) skip the `Admin`/`Customer` split and place their components directly in `src/Filament/Resources`, `src/Filament/Clusters`, and `src/Filament/Widgets`, discovering them from those paths inside the `admin` panel check.
:::

By following this structure, AureusERP ensures clear separation between admin and customer functionalities, making the plugin more maintainable and scalable.

## **Navigation Groups**

The admin panel defines all navigation groups centrally from the `Webkul\Support\Enums\NavigationGroup` enum, which provides the label and icon for each group (Dashboard, Sale, Purchase, Inventory, Website, Setting, and so on). Resources and clusters attach themselves to a group by returning an enum case from `getNavigationGroup()`:

```php
use Webkul\Support\Enums\NavigationGroup;

public static function getNavigationLabel(): string
{
    return __('blogs::filament/admin/resources/post.navigation.title');
}

public static function getNavigationGroup(): string|\UnitEnum
{
    return NavigationGroup::Website;
}
```

Use one of the existing enum cases so your plugin's navigation items appear under the correct top-level group. New groups are added as cases to the `NavigationGroup` enum in the `support` plugin.
