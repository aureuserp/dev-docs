# **Modular Design in Aureus ERP**

Aureus ERP is designed with a **plugin-based architecture** to ensure **scalability, flexibility, and maintainability**. Instead of traditional modules, **Aureus ERP treats each feature as a standalone plugin**, allowing seamless extensions without modifying the core system.

## **Key Benefits of Plugin-Based Architecture**

1. **Decoupled Functionality** – Each plugin encapsulates a specific feature, reducing interdependencies.
2. **Reusability** – Plugins can be reused across different ERP instances, minimizing redundant work.
3. **Easy Maintenance** – Bugs and enhancements can be managed independently without affecting other parts of the system.
4. **Scalability** – New features can be added as plugins without altering the core ERP functionality.

---

## **Plugin Structure in Aureus ERP**

Aureus ERP follows a **Laravel package structure** inspired by the **package-skeleton-laravel** repository. Each plugin is structured as an independent package inside the `plugins/` directory.

### **Overall Directory Structure**

```
├── plugins
  ├── plugin-name
    ├── database
      ├── factories        # Factory classes for generating test data
      ├── migrations       # Plugin-specific database migrations
      └── seeders          # Plugin-specific database seeders
    ├── resources
      ├── views           # Blade views for UI templates
      └── lang            # Language translations
    ├── src
      ├── Filament
        ├── Resources      # Filament resources for CRUD operations
        ├── Pages          # Custom Filament pages
        └── Widgets        # Dashboard widgets
      ├── Livewire         # Livewire components for UI interactivity
      ├── Models           # Plugin-specific Eloquent models
      ├── Policies         # Authorization policies for plugin entities
      ├── Routes
        ├── web.php        # Web routes (if needed)
        └── api.php        # API routes (if needed)
      ├── Services         # Business logic encapsulated in service classes
      ├── PluginNamePlugin.php # Register the plugin which will useful for registering the filament related stuff.
      └── PluginNameServiceProvider.php # Register the migrations, settings, install and uninstallation.
    ├── config            # Plugin-specific configuration files
    ├── tests             # Unit and feature tests
    └── composer.json     # Plugin's composer dependencies
```

---

## **Core Technologies in Aureus ERP**

### **FilamentPHP for Admin Panel**

Aureus ERP uses **FilamentPHP** as the admin panel framework, leveraging:

- **Filament Resources** – CRUD management for entities such as users, orders, and products.
- **Filament Pages** – Custom pages beyond standard CRUD (e.g., Reports, Dashboards).
- **Filament Widgets** – Custom dashboard widgets to display analytics and insights.

### **Livewire & Alpine.js for Interactivity**

- **Livewire** – Provides real-time interactions without requiring a full-page reload.
- **Alpine.js** – Enhances UI with lightweight JavaScript functionality.

### **Tailwind CSS for Styling**

Aureus ERP adopts **Tailwind CSS** for a **utility-first** approach to styling, ensuring modern, responsive UI design.

## **Registering Plugins in Aureus ERP**

Aureus ERP follows a **plugin-based architecture**, allowing seamless integration and management of various business modules. Each plugin must be registered within the system to ensure proper functionality and availability.

## **1. Registering a Plugin**

To register a new plugin, append its class reference inside the `bootstrap/plugins.php` file. This ensures that the system recognizes and loads the plugin automatically.

### **Example: Defining Plugins in `bootstrap/plugins.php`**

```php
<?php

return [
    //
    Webkul\PluginNamespace\PluginNamePlugin::class,
];
```

When adding a new plugin, simply append its respective class to this array.

---

## **2. Registering Plugin Service Providers**

To ensure each plugin functions correctly, its **service provider** must be registered within the `bootstrap/providers.php` file. This step allows Laravel to load the necessary services, configurations, and dependencies related to the plugin.

### **Example: Defining Service Providers in `bootstrap/providers.php`**

```php
<?php

return [
    //
    Webkul\PluginNamespace\PluginNameServiceProvider::class,
];
```

By registering the plugin’s service provider, Laravel will automatically handle migrations, routes, views, and other essential components.

---

## **Conclusion**

Aureus ERP's **plugin-based structure** ensures a **scalable, flexible, and maintainable** system. By registering plugins in `bootstrap/plugins.php` and configuring their **service providers** in `bootstrap/providers.php`, you enable smooth integration and efficient management of business features.

📌 **Following this structured approach ensures that your ERP system remains modular, easy to extend, and well-organized.** 🚀
