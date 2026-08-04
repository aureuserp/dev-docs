# Architecture Concepts

**AureusERP** is a robust and modular ERP system built on **Filament PHP** and **Laravel**. The goal of this document is to provide an overview of how AureusERP works and its architectural concepts.

We embrace the power of **open-source** technologies, and AureusERP is developed using **PHP**, **Laravel**, **Filament PHP**, **Alpine.js**, **Livewire**, and **Tailwind CSS**.

Since **AureusERP** is designed for enterprise resource planning, it provides a structured approach to managing business operations, including user management, inventory, financials, and more. It offers both front-end and back-end features to enable seamless administrative control and user interactions.

## Modular Plugin-Based Architecture

AureusERP follows a **plugin-based architecture** inspired by **Filament PHP plugin development patterns**. Each feature is encapsulated within a plugin, making it easy to extend, maintain, and customize. The system consists of a **core module** and multiple plugins that can be installed or uninstalled as needed.

### Plugin Management

All plugins, except the core system, can be installed or removed dynamically using Artisan commands:

```sh
php artisan <plugin-name>:install
php artisan <plugin-name>:uninstall
```

Plugins can also be installed and uninstalled from the admin panel through the **Plugins** screen provided by the Plugin Manager plugin.

### Plugin Directory Structure

All available plugins are located inside the `plugins/webkul` directory, following a structured format to ensure seamless integration with the core system.

## Multi-Company Support

AureusERP supports running **multiple companies** from a single installation. Records are scoped to companies, users are restricted to the companies they are allowed to access, and a **company switcher** in the admin panel controls which companies' data is active. Supporting traits such as `BelongsToCompany` and `RestrictToAllowedCompanies`, along with the `CompanyContext` service, are provided by the Support plugin.

## Event-Driven Development

AureusERP leverages Laravel's **event-driven approach** to register useful events triggered on key pages and actions. These events allow developers to hook into the system and perform **custom operations** without modifying the core.

## Alpine.js & Livewire for UI Components

AureusERP integrates **Alpine.js** and **Livewire** for dynamic and interactive UI components, ensuring a smooth user experience. These technologies provide a **reactive interface** for data management, making interactions efficient and user-friendly while keeping the frontend lightweight.

## Conclusion

AureusERP’s architecture is designed to be **scalable, maintainable, and customizable**. By leveraging **Filament PHP plugins**, **Laravel events**, and **Alpine.js & Livewire components**, it ensures a flexible and developer-friendly ecosystem for building ERP solutions.
