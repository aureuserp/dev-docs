# Introduction to Aureus ERP

[Aureus ERP](https://aureuserp.com/) is a powerful, open-source Enterprise Resource Planning (ERP) solution designed to meet the needs of Small and Medium Enterprises (SMEs) as well as large-scale organizations. Built on **Laravel**, the most popular PHP framework, and **FilamentPHP**, a dynamic resource management library, Aureus ERP offers an extensible and developer-friendly platform for streamlining business operations.

## Key Features

- **Powered by Laravel**: Ensures security, reliability, and scalability, making it ideal for enterprise-level applications.
- **Enhanced with FilamentPHP**: Delivers an intuitive admin panel, modular forms, and dynamic resource management for seamless interaction.
- **Highly Modular Design**: Allows effortless integration of modules for finance, HR, inventory, CRM, and more, catering to diverse business needs.
- **Open-Source & Extensible**: Freely available for use, modification, and extension, encouraging innovation within the developer community.
- **Enterprise-Ready Scalability**: Designed to support complex workflows and business processes, making it adaptable to growing enterprises.

## Why Choose Aureus ERP?

- **Modern Technology Stack**: Combines Laravel's backend robustness with FilamentPHP’s efficiency for an optimal user experience.
- **Developer-Centric Architecture**: Features clean code, modular structure, and comprehensive documentation to support customization and expansion.
- **User-Friendly Interface**: Built with **TailwindCSS** for a responsive, visually appealing, and intuitive UI.
- **Scalable & Customizable**: Easily tailored to fit the unique operational requirements of businesses of all sizes.
- **Community-Driven Innovation**: Supported by an active open-source community, fostering continuous improvements, contributions, and support.

Aureus ERP is your gateway to an efficient, scalable, and highly customizable enterprise solution. Join the community and revolutionize the way you manage your business today!

## Plugins

Aureus ERP plugin are divided into two categories:

### Core Plugin (System Plugin)

These plugin are essential components of the system and are installed by default:

| Module     | Description                                       |
| ---------- | ------------------------------------------------- |
| Analytics  | Business intelligence and reporting tools         |
| Chatter    | Internal communication and collaboration platform |
| Fields     | Customizable data structure management            |
| Security   | Role-based access control and authentication      |
| Support    | Help desk and documentation                       |
| Table View | Customizable data presentation framework          |

### Installable Plugin

These plugin can be installed as needed to extend system functionality:

| Module       | Description                                  |
| ------------ | -------------------------------------------- |
| Accounts     | Financial accounting and reporting           |
| Contacts     | Contact management for customers and vendors |
| Employees    | Employees management                         |
| Inventories  | Inventory and warehouse management           |
| Invoices     | Invoice generation and management            |
| Partners     | Partner relationship management              |
| Payments     | Payment processing and tracking              |
| Products     | Product catalog and management               |
| Projects     | Project planning and management              |
| Purchases    | Procurement and purchase order management    |
| Recruitments | Applicant tracking and hiring                |
| Sales        | Sales pipeline and opportunity management    |
| Time Offs    | Leave management and tracking                |
| Time Sheet   | Employee work hour tracking                  |

## Installation and Management

### Installing a Plugin

To install a plugin, use the following command syntax:

```bash
php artisan <plugin-name>:install
```

For example, to install the Inventories plugin:

```bash
php artisan inventories:install
```

During installation, the system will check for dependencies and prompt you if there are any conflicts or prerequisites:

```
This package products is already installed. What would you like to do? [Skip]:
  [0] Reseed
  [1] Skip
  [2] Show Seeders
```

Options:

- **Reseed**: Reinstall the plugin's seed data
- **Skip**: Continue without modifying an already installed dependency
- **Show Seeders**: Display the available data seeders for the plugin

### Uninstalling a Plugin

To remove a plugin, use the following command syntax:

```bash
php artisan <plugin-name>:uninstall
```

For example, to uninstall the Inventories plugin:

```bash
php artisan inventories:uninstall
```

## Module Dependencies

Some plugins require other plugin to function properly. The system will automatically inform you of these dependencies during the installation process and guide you through installing any required components.

## Customization

Aureus ERP is designed to be highly customizable, allowing you to:

- Install only the plugin you need
- Extend existing plugin with custom functionality
- Create custom dashboards and reports
- Define user roles and permissions
