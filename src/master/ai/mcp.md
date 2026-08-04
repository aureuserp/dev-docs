# AureusERP MCP Plugin

This plugin adds MCP servers to AureusERP so AI clients (MCP Inspector, coding agents, ERP assistants) can use ERP tools securely.

## What this plugin provides

Two MCP servers are exposed:

### Dev Agent Server

| Transport | Endpoint / Command | Auth |
|---|---|---|
| **stdio** (artisan) | `php artisan mcp:dev` | None — local process |
| **HTTP** | `POST /mcp/dev` | OAuth Bearer token |

Use the stdio transport for local AI coding agents (Cursor, Claude Code, GitHub Copilot, etc.) via `.mcp.json`. Use the HTTP transport for remote or OAuth-authenticated clients.

Tools: documentation search, plugin introspection, route discovery, model inspection, Filament resource listing, API resource discovery.

### ERP Agent Server

| Transport | Endpoint | Auth |
|---|---|---|
| **HTTP** | `POST /mcp/erp` | OAuth Bearer token |

READ-ONLY business insights (34 tools across Sales, Purchases, Invoices, Accounting, Inventory, Projects). No stdio transport — this server requires authentication.

OAuth discovery + registration endpoints are also exposed (via `Mcp::oauthRoutes()`):

- `GET /.well-known/oauth-protected-resource/{path?}`
- `GET /.well-known/oauth-authorization-server/{path?}`
- `POST /oauth/register`

## Requirements

- PHP `^8.2`
- Laravel `^11`
- Filament `^4`
- `laravel/mcp` `^0.5`
- `laravel/passport` `^12`
- AureusERP plugin manager

## Install

First, require the package via Composer:

```bash
composer require aureuserp/mcp
```

You can then complete the installation in two ways:

### Option 1: Via Command Line

Run:

```bash
php artisan mcp:install
```

This command does the setup automatically:

- publishes CORS config (`config/cors.php`) if not already published
- publishes MCP OAuth authorization view (`mcp-views`)
- runs Passport API install scaffold (`install:api --passport`)
- ensures `config/auth.php` has MCP API guard/provider
- configures Passport authorization view from the MCP plugin service provider
- clears caches

### Option 2: Via Web Plugin Manager

Navigate to the Plugin Manager in your AureusERP admin panel and install the MCP plugin from there.

## Plugin install hook

If you install via plugin manager or composer, setup is auto-triggered from the plugin install command.

## Tool catalog

### Dev Agent server

Available via **stdio** (`php artisan mcp:dev`) and **HTTP** (`POST /mcp/dev`).

For developers and coding agents. Always call `search_docs` first before writing any plugin or feature code.

#### Tools (7)

- `search_docs` — Search the official AureusERP developer documentation at devdocs.aureuserp.com
- `list_plugins` — List all installed plugins with activation status
- `plugin_summary` — Get plugin details, dependency graph, and installation state
- `route_list` — List registered routes filtered by plugin, HTTP method, or URI prefix
- `filament_resource_list` — List Filament resources, pages, and widgets per panel
- `plugin_model_list` — Inspect Eloquent models: table, fillable, casts, relationships, soft deletes
- `api_resource_list` — Discover JSON API resource classes per plugin and version (V1, V2, …)

#### Resources (1)

- `DevGuideResource` (`erp://mcp/dev-guide`) — Developer guidance and quick commands for building AureusERP plugins

#### Prompts (1)

- `DevCodingPrompt` — Build a developer-oriented prompt payload for coding tasks targeting a specific plugin

---

### ERP Agent server

Available via **HTTP only** (`POST /mcp/erp`, requires OAuth). For business users and AI assistants querying ERP data. All tools are **READ-ONLY**.

#### Sales (5 tools)

- `sales_order_insights` — Recent orders, revenue, counts by period, top performers
- `sales_order_fulfillment_status` — Delivery status and overdue commitments
- `sales_pipeline_summary` — Leads and opportunities
- `sales_team_performance` — Team metrics
- `sales_quotation_conversion` — Quote to order rates

#### Purchases (4 tools)

- `purchase_orders_pending` — Pending POs
- `purchase_spend_summary` — Spending analysis
- `purchase_requisition_queue` — Pending requisitions
- `purchase_supplier_delivery_risk` — Delivery risks

#### Invoices (6 tools)

- `invoice_list` — All invoices
- `invoice_overdue_summary` — Overdue amounts
- `invoice_aging_buckets` — 0–7, 8–30, 31+ days
- `invoice_payment_followups` — Follow-up candidates
- `invoice_status_breakdown` — States & payment states
- `credit_notes_overview` — Customer credit notes and vendor refunds (counts, amounts, top partners)

#### Accounting (9 tools)

- `account_receivable_summary` — AR amounts
- `account_payable_summary` — AP amounts
- `account_move_state_breakdown` — Journal states
- `account_payment_state_breakdown` — Payment states
- `accounting_cashflow_snapshot` — Cash flow
- `accounting_tax_liability_snapshot` — Tax obligations
- `accounting_journal_entry_health` — Entry issues
- `accounting_unposted_entries` — Unposted entries
- `bank_statement_queue` — Pending reconciliation

#### Inventory (6 tools)

- `inventory_low_stock_alerts` — Low stock
- `inventory_out_of_stock_items` — Out of stock
- `inventory_replenishment_queue` — Reorder items
- `inventory_location_balance` — Stock by location
- `inventory_operation_backlog` — Pending ops
- `inventory_warehouse_kpis` — Warehouse metrics

#### Projects (4 tools)

- `project_status_overview` — Active projects
- `project_task_backlog` — Tasks by status
- `project_deadline_risk` — Overdue tasks
- `project_timesheet_summary` — Time logged

#### Prompts (5)

- `SalesSummaryPrompt` — Guide for sales queries
- `PurchaseSummaryPrompt` — Guide for purchase queries
- `InvoiceSummaryPrompt` — Guide for invoice queries
- `InventorySummaryPrompt` — Guide for inventory queries
- `ProjectSummaryPrompt` — Guide for project queries

## Security

All ERP Agent server tools are **READ-ONLY**. They only retrieve data — no create, update, or delete operations. This ensures AI assistants can query business data safely without making changes to the system.

## Example Usage

### Connecting via an MCP client

Both servers can be registered in any MCP-compatible editor or AI agent that supports `mcp.json` / `.mcp.json` configuration (VS Code, Cursor, Claude Code, Windsurf, etc.).

```jsonc
{
    "servers": {
        "aureus-dev-mcp-server": {
            "command": "php",
            "args": [
                "artisan",
                "mcp:dev"
            ]
        },
        "aureus-erp-mcp-server": {
            "url": "http://127.0.0.1:8000/mcp/erp",
            "type": "http"
        }
    }
}
```

> **File location** — place this in `.vscode/mcp.json` (VS Code / GitHub Copilot), `.cursor/mcp.json` (Cursor), `.mcp.json` (Claude Code / project root), or wherever your editor reads its MCP server config.

| Server | Key | Transport | Auth |
|---|---|---|---|
| Dev Agent | `aureus-dev-mcp-server` | stdio — spawned via `php artisan mcp:dev` | None — local process |
| ERP Agent | `aureus-erp-mcp-server` | HTTP — `POST /mcp/erp` | OAuth Bearer token |

The Dev server starts automatically as a subprocess — no OAuth setup required. The ERP server connects over HTTP using the URL of your running application; ensure it is authenticated via OAuth before use.

This is the same pattern used by [Laravel Boost](https://laravel.com/docs/12.x/boost) (`boost:mcp`).

### Using with AI Assistants via HTTP (ERP Agent)

Ask natural language questions:

```
- "How many orders did we get this week?"
- "What is our total accounts receivable?"
- "Which products are low on stock?"
- "Show me our active projects"
- "What are the overdue invoices?"
```

### Using with Coding Agents via stdio (Dev Agent)

```
- "How do I create a new plugin?"
- "What routes does the Sales plugin expose?"
- "What are the fillable fields on the Order model?"
- "List all Filament resources for the Inventory plugin"
- "What API resource classes exist for accounts?"
```

### Using MCP Inspector

```bash
# Test Dev Agent server (stdio)
php artisan mcp:inspector aureuserp-dev

# Test Dev Agent server (HTTP)
php artisan mcp:inspector mcp/dev

# Test ERP Agent server (HTTP)
php artisan mcp:inspector mcp/erp
```
