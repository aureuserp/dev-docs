# Introduction

Aureus ERP employs a plugin-based architecture that treats each business functionality as a standalone module. This approach provides superior modularity, enabling developers to extend the system without modifying core functionality.

## Creating a New Plugin

### Plugin Directory Structure

Begin by creating a new directory in the `plugins/` folder with your plugin's name using kebab-case:

```
plugins/
├── my-new-plugin/
```

### Setting Up the Basic Structure

Every plugin must adhere to the following structure (using a blog plugin as an example):

```
+-- plugins
|   +-- blogs
|   |   +-- database
|   |   |   +-- factories                     # Factory classes for generating test data
|   |   |   +-- migrations                    # Plugin-specific database migrations
|   |   |   +-- seeders                       # Plugin-specific database seeders
|   |   |   +-- settings                      # Plugin-specific database settings
|   |   +-- resources
|   |   |   +-- views                         # Blade views for UI templates
|   |   |   +-- lang                          # Language translations
|   |   +-- src
|   |   |   +-- Filament
|   |   |   |   +-- Clusters
|   |   |   |   +-- Resources
|   |   |   |   +-- Pages
|   |   |   +-- Livewire                      # Livewire components for UI interactivity
|   |   |   +-- Models                        # Plugin-specific Eloquent models
|   |   |   +-- Policies                      # Authorization policies for plugin entities
|   |   |   +-- Routes
|   |   |   |   +-- web.php                   # Web routes (if needed)
|   |   |   |   +-- api.php                   # API routes (if needed)
|   |   |   +-- Services                      # Business logic encapsulated in service classes
|   |   |   +-- BlogPlugin.php                # Registers Filament-related stuff
|   |   |   +-- BlogServiceProvider.php       # Handles migrations, settings, install & uninstall
|   |   +-- .gitignore                        # Github related file.
|   |   +-- config                            # Plugin-specific configuration files (if needed)
|   |   +-- package.json                      # Package.json
|   |   +-- postcss.config.js                 # Postcss config
|   |   +-- tailwind.config.js                # Tailwind css config
|   |   +-- tests                             # Unit and feature tests
|   |   +-- composer.json                     # Plugin's composer dependencies
```

### Configuring composer.json

Create a `composer.json` file with the following structure:

```json
{
  "name": "webkul/blogs",
  "description": "Blog posts management for Aureus ERP",
  "authors": [
    {
      "name": "Aureus ERP",
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
