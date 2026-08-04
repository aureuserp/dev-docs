# Overview

The `database` directory in the plugin structure is used to manage the plugin's migrations, factories, seeders, and settings. It provides a clear separation for managing database-specific functionalities. Below is a detailed overview of its structure and usage.

## Directory Structure

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- database
|   |   |   |   +-- factories  # Factory classes for generating test data
|   |   |   |   +-- migrations # Plugin-specific database migrations
|   |   |   |   +-- seeders    # Plugin-specific database seeders
```

Remember that the factory and seeder namespaces must be mapped in the plugin's `composer.json`, as shown in the [Introduction](introduction.md):

```json
"autoload": {
    "psr-4": {
        "Webkul\\Blog\\": "src/",
        "Webkul\\Blog\\Database\\Factories\\": "database/factories/",
        "Webkul\\Blog\\Database\\Seeders\\": "database/seeders/"
    }
}
```

## Factories

Factories in Laravel are used to create fake data for testing or seeding the database. Below, we discuss creating a factory for a `Post` model under the `Webkul\Blog` namespace.

### Example: `Post` Model

1. **Create the Model**

   Ensure you have the `Post` model created in the `Webkul\Blog\Models` namespace.

```php
<?php

namespace Webkul\Blog\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Webkul\Blog\Database\Factories\PostFactory;

class Post extends Model
{
    use HasFactory;

    protected $table = 'blogs_posts';

    protected $fillable = [
        'title',
        'content',
        'author_id',
        'published_at',
    ];

    /**
     * Define the factory associated with the model.
     */
    protected static function newFactory(): PostFactory
    {
        return PostFactory::new();
    }
}
```

2. **Create the Factory**

The factory file should be placed in `plugins/webkul/blogs/database/factories`.

```php
<?php

namespace Webkul\Blog\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Webkul\Blog\Models\Post;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(6),
            'content' => fake()->paragraphs(3, true),
            'author_id' => fake()->randomNumber(),
            'published_at' => fake()->optional()->dateTime(),
        ];
    }
}
```

3. **Usage of the Factory**

You can use the factory in seeding, testing, or generating data programmatically:

```php
use Webkul\Blog\Models\Post;

// Creating a single Post
$post = Post::factory()->create();

// Creating multiple Posts
$posts = Post::factory(10)->create();
```

## Migrations

The `migrations` directory holds all plugin-specific database migrations. These are used to define the database structure for the plugin. Register each migration file in the [service provider](service-provider.md) using `hasMigrations()`.

For more information, refer to the [Migrations](../getting-started/migrations.md) documentation.

## Seeders

The `seeders` directory is used to populate the database with initial data for the plugin. Register your `DatabaseSeeder` class in the [service provider](service-provider.md) using `hasSeeder()` so it runs during plugin installation.

For more information, refer to the [Seeders](../getting-started/seeders.md) documentation.

## Settings

The `settings` directory holds settings migrations, which store plugin-specific configurations. Register them in the [service provider](service-provider.md) using `hasSettings()`.

For more details, refer to the [Settings](../getting-started/settings.md) documentation.

This documentation covers the `database` directory structure, focusing on factories and their implementation for the `Post` model. It ensures clarity and provides a practical example for developers to follow.
