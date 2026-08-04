# Introduction

AureusERP employs a plugin-based architecture that treats each business functionality as a standalone module. This approach provides superior modularity, enabling developers to extend the system without modifying core functionality.

## Creating a New Plugin

### Plugin Directory Structure

Plugins live in the `plugins/` folder, grouped by vendor. Begin by creating a new directory under your vendor folder with your plugin's name using kebab-case:

```
plugins/
├── webkul/
│   ├── my-new-plugin/
```

The root `composer.json` uses the `wikimedia/composer-merge-plugin` package to merge every `plugins/*/*/composer.json`, so any plugin placed at this depth is picked up automatically.

### Setting Up the Basic Structure

Every plugin must adhere to the following structure (using the blog plugin as an example):

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- config
|   |   |   |   +-- filament-shield.php           # Filament Shield permission configuration
|   |   |   +-- database
|   |   |   |   +-- factories                     # Factory classes for generating test data
|   |   |   |   +-- migrations                    # Plugin-specific database migrations
|   |   |   |   +-- seeders                       # Plugin-specific database seeders (if needed)
|   |   |   |   +-- settings                      # Plugin-specific settings migrations (if needed)
|   |   |   +-- resources
|   |   |   |   +-- css                           # Source CSS assets
|   |   |   |   +-- dist                          # Compiled assets registered with Filament
|   |   |   |   +-- lang                          # Language translations
|   |   |   |   +-- views                         # Blade views for UI templates
|   |   |   +-- routes                            # Route files (if needed)
|   |   |   |   +-- web.php                       # Web routes
|   |   |   |   +-- api.php                       # API routes
|   |   |   +-- src
|   |   |   |   +-- Filament
|   |   |   |   |   +-- Admin                     # Admin panel resources, pages, clusters & widgets
|   |   |   |   |   +-- Customer                  # Customer panel resources, pages, clusters & widgets
|   |   |   |   +-- Models                        # Plugin-specific Eloquent models
|   |   |   |   +-- Policies                      # Authorization policies for plugin entities
|   |   |   |   +-- BlogPlugin.php                # Registers Filament-related stuff
|   |   |   |   +-- BlogServiceProvider.php       # Handles migrations, settings, install & uninstall
|   |   |   +-- tests                             # Unit and feature tests (if needed)
|   |   |   +-- .gitignore                        # Github related file.
|   |   |   +-- composer.json                     # Plugin's composer dependencies
|   |   |   +-- package.json                      # Package.json
|   |   |   +-- postcss.config.js                 # Postcss config
|   |   |   +-- tailwind.config.js                # Tailwind css config
```

::: tip
Plugins that serve only the admin panel (for example the `maintenance` plugin) skip the `Admin`/`Customer` split and place their components directly in `src/Filament/Resources`, `src/Filament/Clusters`, and `src/Filament/Widgets`.
:::

### Configuring composer.json

Create a `composer.json` file with the following structure:

```json
{
  "name": "webkul/blogs",
  "description": "Manage blogs",
  "authors": [
    {
      "name": "AureusERP",
      "email": "support@aureuserp.in"
    }
  ],
  "extra": {
    "laravel": {
      "providers": ["Webkul\\Blog\\BlogServiceProvider"],
      "aliases": {}
    }
  },
  "autoload": {
    "psr-4": {
      "Webkul\\Blog\\": "src/",
      "Webkul\\Blog\\Database\\Factories\\": "database/factories/",
      "Webkul\\Blog\\Database\\Seeders\\": "database/seeders/"
    }
  },
  "autoload-dev": {
    "psr-4": {
      "Webkul\\Blog\\Tests\\": "tests/"
    }
  }
}
```
