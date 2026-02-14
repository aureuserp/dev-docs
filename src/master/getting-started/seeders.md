# Introduction

This document provides an overview of how seeders work in Laravel FilamentPHP for the **Aureus ERP** system. It explains how to create and register seeders within the plugin while maintaining a well-structured directory hierarchy.

## Understanding Seeders in Laravel

Seeders in Laravel allow pre-populating the database with test or initial production data. They are useful for setting up default configurations, roles, permissions, and system settings.

### Key Concepts

1. **Seeder Classes**: Extend Laravel’s `Seeder` class to define seeding logic.
2. **DatabaseSeeder**: The main seeder class that calls other seeders.
3. **Registering Seeders**: Defined within the `DatabaseSeeder` and referenced in the package service provider.

## Directory Structure for Seeders

For better organization, seeders are stored in the `plugins/aureus/blogs/src/Database/Seeders/` directory as follows for each plugins :

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- database
|   |   |   |   +-- factories
|   |   |   |   +-- migrations
|   |   |   |   +-- seeders
|   |   |   |   |   +-- PostSeeder.php
|   |   |   |   |   +-- PostCategorySeeder.php
|   |   |   |   +-- settings
|   |   |   +-- resources
|   |   |   +-- src
```

## Creating a Seeder

To create a seeder, use the following command:

```sh
php artisan make:seeder PostSeeder
```

This will generate a new seeder file inside the Laravel default `Seeders` directory, you have to move the seeder into the give directory structure as shown above and also you have to update the namespace accordingly.

Example PostSeeder:

```php
<?php

namespace Webkul\Blogs\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Aureus\Blog\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Seed the database with sample posts.
     */
    public function run(): void
    {
        DB::table('blogs_posts')->delete();

        DB::table('blogs_posts')->insert([
            [
                'title'         => 'Sample Post',
                'sub_title'     => 'Introduction to Aureus ERP',
                'content'       => 'This is a sample blog post for Aureus ERP.',
                'slug'          => 'sample-post',
                'author_name'   => 'John Doe',
                'is_published'  => true,
                'published_at'  => now(),
                'category_id'   => 1,
                'author_id'     => 1,
                'creator_id'    => 1,
                'last_editor_id'=> 1,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]
        ]);
    }
}
```

## Registering the Seeder in `DatabaseSeeder`

The main `DatabaseSeeder` is responsible for calling all individual seeders:

```php
<?php

namespace Webkul\Blogs\Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            //
            PostSeeder::class,
        ]);
    }
}
```

## Registering the Seeder in `BlogServiceProvider.php

To make Laravel recognize the Blog module’s seeder, register it inside the `BlogServiceProvider.php` file:

```php
<?php

namespace Webkul\Blog;

use Webkul\PluginManager\Package;
use Webkul\PluginManager\PackageServiceProvider;

class BlogServiceProvider extends PackageServiceProvider
{
    public static string $name = 'blogs';

    public static string $viewNamespace = 'blogs';

    public function configureCustomPackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations()
            ->hasMigrations([])
            ->runsMigrations()
            ->hasSeeder('Webkul\\Blog\\Database\\Seeders\\DatabaseSeeder') // Registering the Seeder
            ->hasDependencies([
                'products',
            ])
            ->hasInstallCommand(function ($command) {})
            ->hasUninstallCommand(function ($command) {});
    }
}
```

With this, Laravel automatically executes `DatabaseSeeder.php` whenever the **Blog module is installed**.

## Running the Seeder Manually

Once everything is registered, you can seed the blog module manually using:

```bash
php artisan db:seed --class="Webkul\Blog\Database\Seeders\DatabaseSeeder"
```

Or, if you only want to seed blog posts:

```bash
php artisan db:seed --class="Webkul\Blog\Database\Seeders\BlogSeeder"
```
