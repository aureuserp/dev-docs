# Overview

The `resources` directory in the `BlogPlugin` is used to manage UI assets, language translations, CSS, and JavaScript files. This ensures that the plugin remains modular and can easily integrate with the main application.

## Directory Structure

```
+-- plugins
|   +-- blogs
|   |   +-- resources
|   |   |   +-- views  # Blade views for UI templates
|   |   |   +-- lang   # Language translations
```

### **Views**

- The `views` directory contains Blade template files for the plugin.
- These files are used to render the UI for the `BlogPlugin` without modifying the core Laravel application.

### **Language Translations**

- The `lang` directory holds language files to support multilingual functionality.
- Each language file should be structured inside its own locale-based subdirectory (e.g., `en`, `fr`, `es`).

## Registering View and Language Namespace

In `BlogServiceProvider`, we define the namespace for views and language files so they can be referenced easily.

### Example: `BlogServiceProvider.php`

```php
<?php

namespace Webkul\Blog;

use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Webkul\Support\Console\Commands\InstallCommand;
use Webkul\Support\Console\Commands\UninstallCommand;
use Webkul\Support\Package;
use Webkul\Support\PackageServiceProvider;

class BlogServiceProvider extends PackageServiceProvider
{
    /**
     * Plugin name identifier.
     */
    public static string $name = 'blogs';

    /**
     * View namespace for the plugin.
     */
    public static string $viewNamespace = 'blogs';

    //
}
```

### **Using Views in Blade Templates**

Once the views are registered, you can reference them using the `blogs::` namespace:

```blade
@include('blogs::layouts.master')
```

### **Using Language Translations**

To retrieve a translated string from the `lang` directory:

```php
__('blogs::messages.welcome')
```

Where `messages.php` (inside `resources/lang/en`) contains:

```php
return [
    'welcome' => 'Welcome to the Blog Plugin!',
];
```

## Managing CSS and JavaScript Files

Filament provides a way to load custom assets (CSS and JavaScript) into the panel.

### Example: Registering Assets

Modify `BlogServiceProvider.php` to include assets:

```php
public function packageBooted(): void
{
    FilamentAsset::register([
        Css::make('blogs', __DIR__.'/../resources/dist/blogs.css'),
    ], 'blogs');
}
```
