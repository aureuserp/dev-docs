# Architecture Concepts

**Aureus ERP** is a robust and modular ERP system built on **Filament PHP** and **Laravel**. The goal of this document is to provide an overview of how Aureus ERP works and its architectural concepts.

We embrace the power of **open-source** technologies, and Aureus ERP is developed using **PHP**, **Laravel**, **Filament PHP**, **Alpine.js**, **Livewire**, and **Tailwind CSS**.

Since **Aureus ERP** is designed for enterprise resource planning, it provides a structured approach to managing business operations, including user management, inventory, financials, and more. It offers both front-end and back-end features to enable seamless administrative control and user interactions.

## Modular Plugin-Based Architecture

Aureus ERP follows a **plugin-based architecture** inspired by **Filament PHP plugin development patterns**. Each feature is encapsulated within a plugin, making it easy to extend, maintain, and customize. The system consists of a **core module** and multiple plugins that can be installed or uninstalled as needed.

### Plugin Management

All plugins, except the core system, can be installed or removed dynamically using Artisan commands:

```sh
php artisan <plugin-name>:install
php artisan <plugin-name>:uninstall
```

### Plugin Directory Structure

All available plugins are located inside the `plugins/webkul` directory, following a structured format to ensure seamless integration with the core system.

## Event-Driven Development

Aureus ERP leverages Laravel's **event-driven approach** to register useful events triggered on key pages and actions. These events allow developers to hook into the system and perform **custom operations** without modifying the core.

## Alpine.js & Livewire for UI Components

Aureus ERP integrates **Alpine.js** and **Livewire** for dynamic and interactive UI components, ensuring a smooth user experience. These technologies provide a **reactive interface** for data management, making interactions efficient and user-friendly while keeping the frontend lightweight.

## Conclusion

Aureus ERP’s architecture is designed to be **scalable, maintainable, and customizable**. By leveraging **Filament PHP plugins**, **Laravel events**, and **Alpine.js & Livewire components**, it ensures a flexible and developer-friendly ecosystem for building ERP solutions.
