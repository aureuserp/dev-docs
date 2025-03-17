# Overview

The `database` directory in the plugin structure is used to manage the plugin's migrations, factories, seeders, and settings. It provides a clear separation for managing database-specific functionalities. Below is a detailed overview of its structure and usage.

## Directory Structure

```
+-- plugins
|   +-- blogs
|   |   +-- database
|   |   |   +-- factories  # Factory classes for generating test data
|   |   |   +-- migrations # Plugin-specific database migrations
|   |   |   +-- seeders    # Plugin-specific database seeders
```

## Factories

Factories in Laravel are used to create fake data for testing or seeding the database. Below, we discuss creating a factory for a `Post` model under the `Webkul\Blogs` namespace.

### Example: `Post` Model

1. **Create the Model**

   Ensure you have the `Post` model created in the `Webkul\Blogs\Models` namespace.

```php
<?php

namespace Webkul\Blogs\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Webkul\Blogs\Database\Factories\PostFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'author_id',
        'published_at',
    ];

    /**
     * Define the factory associated with the model.
     */
    protected static function newFactory()
    {
        return PostFactory::new();
    }
}
```

2. **Create the Factory**

The factory file should be placed in `plugins/blogs/database/factories`.

```php
<?php

namespace Webkul\Blogs\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Webkul\Blogs\Models\Post;

class PostFactory extends Factory
{
    /**
    * The name of the model that this factory is associated with.
    *
    * @var string
    */
    protected $model = Post::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraphs(3, true),
            'author_id' => $this->faker->randomNumber(),
            'published_at' => $this->faker->optional()->dateTime(),
        ];
    }
}
```

3. **Usage of the Factory**

You can use the factory in seeding, testing, or generating data programmatically:

```php
use Webkul\Blogs\Models\Post;

// Creating a single Post
$post = Post::factory()->create();

// Creating multiple Posts
$posts = Post::factory(10)->create();
```

## Migrations

The `migrations` directory holds all plugin-specific database migrations. These are used to define the database structure for the plugin.

For more information, refer to the [Migrations](../getting-started/migrations.md) documentation.

## Seeders

The `seeders` directory is used to populate the database with initial data for the plugin.

For more information, refer to the [Seeders](../getting-started/seeders.md) documentation.

## Settings

The `settings` functionality allows you to store plugin-specific configurations.

For more details, refer to the [Settings](../getting-started/settings.md) documentation.

This documentation covers the `database` directory structure, focusing on factories and their implementation for the `Post` model. It ensures clarity and provides a practical example for developers to follow.
