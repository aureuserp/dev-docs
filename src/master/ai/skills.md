# 🧠 AureusERP Agent Skills

Enhance your AureusERP development workflow with AI-powered agent skills designed specifically for AureusERP projects.

These skills provide domain-specific, reusable intelligence for AI agents such as Claude Code, Cursor, Windsurf, and other AI-powered development tools.

## What is `aureuserp/agent-skills`?

`aureuserp/agent-skills` is a collection of specialized AI skills that improve how AI tools understand and work within an AureusERP codebase.

::: info Why Use Agent Skills?
These skills give AI agents deeper awareness of AureusERP's plugin architecture, API conventions, and testing workflows — resulting in more accurate code generation and smarter development assistance.
:::

## Benefits for Developers

Agent skills help with:

- 🏗️ **Plugin Architecture Awareness** – Follow AureusERP's package and module conventions
- 🌐 **REST API Development** – Build plugin APIs with proper route, controller, and resource patterns
- 🧪 **Structured Testing Workflows** – Generate Pest tests with proper assertions and architecture patterns
- 🎯 **Smarter Code Suggestions** – Context-aware development guidance
- 🚀 **Faster Development** – Reduce repetitive implementation work

## Setup Instructions

### Install All Skills

Install all available skills into your AI agent:

::: code-group

```bash [Install All Skills]
npx skills add aureuserp/agent-skills
```

:::

### Install for a Specific Agent

::: code-group

```bash [Claude Code]
npx skills add aureuserp/agent-skills -a claude-code
```

```bash [Cursor]
npx skills add aureuserp/agent-skills -a cursor
```

:::

### Install a Specific Skill

::: code-group

```bash [Plugin Builder]
npx skills add aureuserp/agent-skills --skill "aureuserp-plugin-builder"
```

```bash [API Builder]
npx skills add aureuserp/agent-skills --skill "aureuserp-api-builder"
```

```bash [Test Case Builder]
npx skills add aureuserp/agent-skills --skill "aureuserp-test-case-builder"
```

:::

## Available Skills

We currently provide the following specialized AI skills:

### 📦 Plugin Builder

**Skill**: `aureuserp-plugin-builder`

**Purpose**: Builds and refactors AureusERP plugins with project-standard patterns.

This skill covers:

- Service provider and plugin registration
- Admin/customer panel wiring
- ACL and policy integration
- Settings, dashboard pages, widgets, and table views
- Translation structure and install/uninstall lifecycle

Run the following command to install the specified skill:

```bash
npx skills add aureuserp/agent-skills --skill "aureuserp-plugin-builder"
```

### 🌐 API Builder

**Skill**: `aureuserp-api-builder`

**Purpose**: Builds and refactors plugin REST APIs following AureusERP conventions.

This skill covers:

- Route conventions and auth middleware
- Controller patterns with Scribe attributes
- FormRequest rules derived from Filament analysis
- API resources with soft-delete restore and force-delete flows
- Optional plugin dependency guards

Run the following command to install the specified skill:

```bash
npx skills add aureuserp/agent-skills --skill "aureuserp-api-builder"
```

### 🧪 Test Case Builder

**Skill**: `aureuserp-test-case-builder`

**Purpose**: Builds and refactors Pest API feature tests for AureusERP plugins.

This skill covers:

- Factory-first setup and payload generation
- Permission and auth bootstrap helpers
- Stable JSON assertions
- Plugin install/bootstrap-safe test strategy

Run the following command to install the specified skill:

```bash
npx skills add aureuserp/agent-skills --skill "aureuserp-test-case-builder"
```

## Supported AI Tools

These skills are compatible with:

- Claude Code
- Cursor IDE
- Windsurf
- Any AI agent supporting the `skills` CLI

::: tip Getting Started
For full AI assistance in AureusERP projects, install all skills. If you work in a specific area (like API development or testing), install only the relevant skill.
:::

## Best Practices

### Skill Management

- Install only the skills relevant to your workflow
- Keep skills updated alongside AureusERP upgrades
- Use clear prompts to trigger the correct skill activation

::: warning Important
Ensure the skills are installed in the correct environment where your AI agent operates, otherwise activation may not work properly.
:::
