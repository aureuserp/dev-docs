# **Overview**

The `Filament` directory is used to define clusters, resources, pages, and widgets within the FilamentPHP panel. This structure allows for better organization and management of different sections in the plugin.

For more details, refer to [Resources](../getting-started/resources/getting-started.md).

## **Types of Resource Registrations in the Plugin**

In the `BlogPlugin`, we register resources, pages, clusters, and widgets for two main panels:

1. **Admin Panel** (`Admin` directory)
2. **Customer Panel** (`Customer` directory)

Each panel has its own directory structure for managing Filament-related components.

## **Registering Resources and Clusters**

The `register` method ensures that resources, pages, clusters, and widgets are only registered if the plugin is installed. It also distinguishes between `admin` and `customer` panels, dynamically loading their respective components.

### **Implementation in `BlogPlugin.php`**

```php
use Filament\Panel;

public function register(Panel $panel): void
{
    if (! Package::isPluginInstalled($this->getId())) {
        return;
    }

    $panel
        ->when($panel->getId() === 'customer', function (Panel $panel) {
            $panel
                ->discoverResources(in: $this->getPluginBasePath('/Filament/Customer/Resources'), for: 'Webkul\\Blog\\Filament\\Customer\\Resources')
                ->discoverPages(in: $this->getPluginBasePath('/Filament/Customer/Pages'), for: 'Webkul\\Blog\\Filament\\Customer\\Pages')
                ->discoverClusters(in: $this->getPluginBasePath('/Filament/Customer/Clusters'), for: 'Webkul\\Blog\\Filament\\Customer\\Clusters')
                ->discoverWidgets(in: $this->getPluginBasePath('/Filament/Customer/Widgets'), for: 'Webkul\\Blog\\Filament\\Customer\\Widgets');
        })
        ->when($panel->getId() === 'admin', function (Panel $panel) {
            $panel
                ->discoverResources(in: $this->getPluginBasePath('/Filament/Admin/Resources'), for: 'Webkul\\Blog\\Filament\\Admin\\Resources')
                ->discoverPages(in: $this->getPluginBasePath('/Filament/Admin/Pages'), for: 'Webkul\\Blog\\Filament\\Admin\\Pages')
                ->discoverClusters(in: $this->getPluginBasePath('/Filament/Admin/Clusters'), for: 'Webkul\\Blog\\Filament\\Admin\\Clusters')
                ->discoverWidgets(in: $this->getPluginBasePath('/Filament/Admin/Widgets'), for: 'Webkul\\Blog\\Filament\\Admin\\Widgets');
        });
}
```

### **Explanation**

- **Checks if the plugin is installed** before registering components.
- **Registers Filament resources, pages, clusters, and widgets** separately for the `admin` and `customer` panels.
- **Uses `discoverResources`, `discoverPages`, `discoverClusters`, and `discoverWidgets`** to automatically load Filament components from the correct directories.

## **Directory Structure**

To properly register resources, clusters, pages, and widgets, the following directory structure must be followed:

```
+-- plugins
|   +-- blogs
|   |   +-- Filament
|   |   |   +-- Admin
|   |   |   |   +-- Resources   # Admin-specific Filament resources
|   |   |   |   +-- Pages       # Admin-specific pages
|   |   |   |   +-- Clusters    # Admin-specific clusters
|   |   |   |   +-- Widgets     # Admin-specific widgets
|   |   |   +-- Customer
|   |   |   |   +-- Resources   # Customer-specific Filament resources
|   |   |   |   +-- Pages       # Customer-specific pages
|   |   |   |   +-- Clusters    # Customer-specific clusters
|   |   |   |   +-- Widgets     # Customer-specific widgets
```

## **Usage Guidelines**

### **1. Admin Panel (`Admin` directory)**

If you want to display resources, clusters, pages, or widgets in the **admin panel**, create your Filament components inside the `Admin` directory.

Example:

```
plugins/blogs/Filament/Admin/Resources/PostResource.php
plugins/blogs/Filament/Admin/Pages/ManagePosts.php
```

These files will automatically be discovered and registered when the admin panel is initialized.

---

### **2. Customer Panel (`Customer` directory)**

If you want to display Filament components (resources, clusters, pages, or widgets) in the **customer panel**, create them inside the `Customer` directory.

Example:

```
plugins/blogs/Filament/Customer/Resources/CommentResource.php
plugins/blogs/Filament/Customer/Pages/Dashboard.php
```

This ensures a clear separation between admin and customer functionalities.


## **Best Practices**

* Keep **admin and customer logic isolated** for cleaner code maintenance.
* Always ensure your **namespace** matches the directory structure (e.g., `Webkul\\Blog\\Filament\\Admin\\Resources`).
* Regularly **clear and rebuild cache** after creating or modifying Filament components:

```bash
php artisan optimize:clear
php artisan filament:cache
```

* If new components don’t appear in the panel, verify that:

  * The plugin is installed (`Package::isPluginInstalled()`).
  * The directory paths in `discoverResources` match your folder structure.
  * The namespaces are correct and autoloaded via Composer.


## **Conclusion**

By following this directory structure and registration approach, **Aureus ERP** ensures that each plugin integrates seamlessly with FilamentPHP.
This pattern provides a clean, scalable way to manage both **admin** and **customer** panel functionalities — ensuring better organization, modularity, and future maintainability.
