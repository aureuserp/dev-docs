# Core Plugin (System Plugin)

These plugin are essential components of the system and are installed by default:

| Module     | Description                                       |
| ---------- | ------------------------------------------------- |
| Analytics  | Business intelligence and reporting tools         |
| Chatter    | Internal communication and collaboration platform |
| Fields     | Customizable data structure management            |
| Partners   | Partner relationship management                   |
| Security   | Role-based access control and authentication      |
| Support    | Help desk and documentation                       |
| Table View | Customizable data presentation framework          |

## Installable Plugin

These plugin can be installed as needed to extend system functionality:

| Module       | Description                                  |
| ------------ | -------------------------------------------- |
| Blogs        | Manage blogs                                 |
| Accounts     | Financial accounting and reporting           |
| Contacts     | Contact management for customers and vendors |
| Employees    | Employees management                         |
| Inventory    | Inventory and warehouse management           |
| Invoices     | Invoice generation and management            |
| Payments     | Payment processing and tracking              |
| Products     | Product catalog and management               |
| Projects     | Project planning and management              |
| Purchases    | Procurement and purchase order management    |
| Recruitments | Applicant tracking and hiring                |
| Sales        | Sales pipeline and opportunity management    |
| Timeoffs     | Leave management and tracking                |
| Timesheet    | Employee work hour tracking                  |
| Website      | Website for customer                         |

## **Accounts**

- **Purpose**: Manages financial accounts, including ledgers, journals, and chart of accounts.
- **Key Features**:
  - Supports multi-currency transactions.
  - Integration with invoices and payments.
  - Comprehensive financial reporting and audit trails.

## **Analytics**

- **Purpose**: Provides data visualization and insights for better decision-making.
- **Key Features**:
  - Dashboards for performance metrics and KPIs.
  - Customizable charts and reports.
  - Supports real-time data analysis.

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

## **Timeoffs**

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

Aureus ERP is designed to be highly customizable, allowing you to:

- Install only the plugin you need
- Extend existing plugin with custom functionality
- Create custom dashboards and reports
- Define user roles and permissions
