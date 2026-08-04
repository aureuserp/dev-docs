# Core Plugin (System Plugin)

These plugin are essential components of the system and are installed by default:

| Module         | Description                                       |
| -------------- | ------------------------------------------------- |
| Analytics      | Business intelligence and reporting tools         |
| Chatter        | Internal communication and collaboration platform |
| Fields         | Customizable data structure management            |
| Full Calendar  | Calendar components for displaying records as events |
| Partners       | Partner relationship management                   |
| Plugin Manager | Plugin installation and lifecycle management      |
| Security       | Role-based access control and authentication      |
| Support        | Help desk and documentation                       |
| Table View     | Customizable data presentation framework          |

## Installable Plugin

These plugin can be installed as needed to extend system functionality:

| Module       | Description                                  |
| ------------ | -------------------------------------------- |
| Blogs        | Manage blogs                                 |
| Accounts     | Core financial configuration module that defines chart of accounts, journals, ledgers, currencies, and fiscal structures used by other financial plugins           |
| Accounting   | Main accounting operations module that handles journal entries, financial reports, period closing, and accounting workflows based on the Accounts setup           |
| Barcode      | Barcode-driven warehouse operations interface |
| Contacts     | Contact management for customers and vendors |
| Employees    | Employees management                         |
| Inventory    | Inventory and warehouse management           |
| Invoices     | Invoice generation and management            |
| Maintenance  | Equipment and maintenance request management |
| Manufacturing | Manufacturing orders and bill of materials management |
| Payments     | Payment processing and tracking              |
| Products     | Product catalog and management               |
| Projects     | Project planning and management              |
| Purchases    | Procurement and purchase order management    |
| Recruitments | Applicant tracking and hiring                |
| Sales        | Sales pipeline and opportunity management    |
| Time Off     | Leave management and tracking                |
| Timesheets   | Employee work hour tracking                  |
| Website      | Website for customer                         |

## Accounts vs Accounting

In AureusERP, **Accounts** and **Accounting** are intentionally separated to provide a **flexible, scalable, and extensible financial system**.

### **Accounts (Base / Helper Plugin)**

* **Role**: Foundational financial layer
* **Purpose**: Provides core accounting structures used by other financial modules

**Key Responsibilities:**

* Chart of Accounts (assets, liabilities, income, expenses)
* Journals and ledger definitions
* Currency and fiscal configurations
* Common accounting utilities shared across modules

The **Accounts plugin does not handle business workflows directly**. Instead, it acts as a **shared financial backbone** that ensures consistency across all financial operations.

### **Accounting (Main Functional Plugin)**

* **Role**: Primary accounting engine
* **Purpose**: Handles real-world accounting workflows and financial operations

**Key Responsibilities:**

* Journal entries and postings
* Financial reports (Profit & Loss, Balance Sheet, Trial Balance)
* Period closing and adjustments
* Integration with invoices, payments, purchases, and sales
* Audit trails and compliance-ready records

The **Accounting plugin depends on Accounts** to function correctly and uses its structures to execute business logic.

## **Analytics**

- **Purpose**: Provides data visualization and insights for better decision-making.
- **Key Features**:
  - Dashboards for performance metrics and KPIs.
  - Customizable charts and reports.
  - Supports real-time data analysis.

## **Barcode**

- **Purpose**: Barcode-driven interface for warehouse operations.
- **Key Features**:
  - Scan barcodes to process transfers and operations.
  - Perform inventory adjustments from a dedicated lightweight interface.
  - Launched from the admin panel with its own dashboard and login.

## **Blogs**

- **Purpose**: Manages content creation and publishing for company blogs.
- **Key Features**:
  - Supports categories, tags, and SEO optimization.
  - Role-based access for authors and editors.
  - Integration with the company website module.

## **Chatter**

- **Purpose**: Collaborative messaging system for the app.
- **Key Features**:
  - Add/remove followers on tasks or projects.
  - Log notes, schedule activities, and send email notifications.
  - Polymorphic relationships to associate messages with any model.

## **Contacts**

- **Purpose**: Centralized contact management system.
- **Key Features**:
  - Store and manage details of customers, partners, and vendors.
  - Integration with sales and CRM modules.
  - Custom fields support for specific business needs.

## **Employees**

- **Purpose**: Manage employee information and profiles.
- **Key Features**:
  - Role-based permissions and hierarchy management.
  - Tracks time-offs, timesheets, and attendance.

## **Fields**

- **Purpose**: Custom field management for dynamic data capture.
- **Key Features**:
  - Add custom fields to any entity in the system.
  - Supports text, numbers, dropdowns, and file uploads.

## **Full Calendar**

- **Purpose**: Calendar infrastructure used across the system.
- **Key Features**:
  - Calendar widgets and actions for displaying records as events.
  - Used by other plugins such as Time Off and Maintenance.

## **Inventory**

- **Purpose**: Track and manage stock levels across warehouses.
- **Key Features**:
  - Supports multiple warehouses and inventory adjustments.
  - Real-time stock updates linked to sales and purchases.
  - Integration with products and invoices.

## **Invoices**

- **Purpose**: Generate and manage invoices for sales and services.
- **Key Features**:
  - Supports recurring invoices and payment tracking.
  - Multi-currency and tax management.

## **Maintenance**

- **Purpose**: Manage equipment and maintenance operations.
- **Key Features**:
  - Track equipment and equipment categories.
  - Manage maintenance requests through configurable stages.
  - Organize maintenance teams.

## **Manufacturing**

- **Purpose**: Manage production and manufacturing workflows.
- **Key Features**:
  - Manufacturing orders and work orders.
  - Bills of materials and operations.
  - Work centers, lots, and internal transfers.

## **Partners**

- **Purpose**: Manage relationships with business partners.
- **Key Features**:
  - Tracks partnerships, agreements, and contact information.
  - Integration with sales and purchases.

## **Payments**

- **Purpose**: Tracks payments and receipts for financial transactions.
- **Key Features**:
  - Multiple payment methods (cash, bank, online).
  - Reconciliation with accounts and invoices.

## **Plugin Manager**

- **Purpose**: Manage the lifecycle of all plugins.
- **Key Features**:
  - Tracks installed plugins in the `plugins` database table.
  - Provides the `<plugin-name>:install` and `<plugin-name>:uninstall` Artisan commands.
  - Plugins screen in the admin panel to install and uninstall plugins from the UI.

## **Products**

- **Purpose**: Centralized product and service management.
- **Key Features**:
  - Categorization and pricing rules.
  - Inventory tracking and integration with sales and purchases.

## **Projects**

- **Purpose**: Manage projects, tasks, and milestones.
- **Key Features**:
  - Gantt charts and task dependencies.
  - Time tracking and resource allocation.
  - Integration with chatter for communication.

## **Purchases**

- **Purpose**: Manage procurement and vendor relations.
- **Key Features**:
  - Generate purchase orders and manage approvals.
  - Vendor performance tracking.

## **Recruitments**

- **Purpose**: Streamline the hiring process.
- **Key Features**:
  - Tracks job applications and candidate information.
  - Customizable recruitment workflows.

## **Sales**

- **Purpose**: Manage sales processes from lead generation to invoicing.
- **Key Features**:
  - Quotation and order management.
  - Integration with CRM and analytics.

## **Security**

- **Purpose**: Manage roles, permissions, and access control.
- **Key Features**:
  - Role-based permissions using Spatie package.
  - Customizable security policies for data protection.

## **Support**

- **Purpose**: Handle customer queries and issue resolution.
- **Key Features**:
  - Ticketing system for support requests.
  - Automated reminders and escalation rules.

## **Table-Views**

- **Purpose**: Unified table management system for list views.
- **Key Features**:
  - Supports column filtering and sorting.
  - Customizable data grids for each module.

## **Time Off**

- **Purpose**: Manage employee leave requests and approvals.
- **Key Features**:
  - Leave balance tracking and policies.
  - Integration with payroll and employee modules.

## **Timesheets**

- **Purpose**: Record employee working hours and activities.
- **Key Features**:
  - Weekly and daily views for time tracking.
  - Export timesheet data for payroll.

## **Website**

- **Purpose**: Manage the company's website content.
- **Key Features**:
  - CMS for pages, blogs, and product catalogs.
  - SEO tools for optimization.

## Installation and Management

### Installing a Plugin

To install a plugin, use the following command syntax:

```bash
php artisan <plugin-name>:install
```

For example, to install the Blogs plugin:

```bash
php artisan blogs:install
```

During installation, the system will check for dependencies and prompt you if there are any conflicts or prerequisites:

```bash
This package products is already installed. What would you like to do? [Skip]:
  [0] Reseed
  [1] Skip
  [2] Show Seeders
```

Options:

- **Reseed**: Reinstall the plugin's seed data
- **Skip**: Continue without modifying an already installed dependency
- **Show Seeders**: Display the available data seeders for the plugin

The command name always uses the plugin's package name, which matches its directory under `plugins/webkul` (for example `php artisan time-off:install` or `php artisan inventories:install`).

Plugins can also be installed and uninstalled from the admin panel through the **Plugins** screen provided by the Plugin Manager plugin.

To install the ERP system itself (Filament, Filament Shield, and the base schema and seed data — core plugins are always active and need no separate install), use:

```bash
php artisan erp:install
```

### Uninstalling a Plugin

To remove a plugin, use the following command syntax:

```bash
php artisan <plugin-name>:uninstall
```

For example, to uninstall the Blogs plugin:

```bash
php artisan blogs:uninstall
```

## Module Dependencies

Some plugins require other plugin to function properly. The system will automatically inform you of these dependencies during the installation process and guide you through installing any required components.

## Customization

AureusERP is designed to be highly customizable, allowing you to:

- Install only the plugin you need
- Extend existing plugin with custom functionality
- Create custom dashboards and reports
- Define user roles and permissions
