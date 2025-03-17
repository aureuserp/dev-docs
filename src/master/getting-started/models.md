# Models

In Aureus ERP, Laravel models represent database tables and handle the business logic of an application. FilamentPHP extends Laravel's model system by integrating seamlessly with Filament resources, forms, tables, and actions.

## Key Features of Laravel Models in FilamentPHP:

1. **Eloquent ORM**: Laravel models use Eloquent, an Object-Relational Mapper, to interact with database records as objects.
2. **Soft Deletes**: Some models use the `SoftDeletes` trait to enable soft deletion instead of permanent deletion.
3. **Relationships**: Models define relationships like `BelongsTo`, `HasMany`, and `BelongsToMany` to manage associations.
4. **Accessors & Mutators**: Models provide custom accessors (e.g., `getImageUrlAttribute`) to format data.
5. **Factories**: Laravel provides model factories to generate dummy data for testing.

## Model Directory Structure in Aureus ERP

Aureus ERP follows a modular structure where each module (plugin) has its own models. The `Post` model resides in the **Blog Module**, and its directory structure is:

```
+-- plugins
|   +-- webkul
|   |   +-- blogs
|   |   |   +-- database
|   |   |   |   +-- factories
|   |   |   |   +-- migrations
|   |   |   |   +-- seeders
|   |   |   |   +-- settings
|   |   |   +-- resources
|   |   |   +-- src
|   |   |   |   +-- Models
|   |   |   |   |   +-- Post.php
|   |   |   |   |   +-- Category.php
|   |   |   |   |   +-- Tag.php
```

Each module contains models inside the `Models` directory, migrations inside `blogs/database/migrations`.

## Post Model (`plugins/webkul/blogs/src/Models/Post.php`)

The `Post` model represents blog posts in the system and interacts with the `blogs_posts` database table.

### Key Attributes

```php
protected $fillable = [
    'title',
    'sub_title',
    'content',
    'slug',
    'image',
    'author_name',
    'is_published',
    'published_at',
    'visits',
    'meta_title',
    'meta_keywords',
    'meta_description',
    'category_id',
    'author_id',
    'creator_id',
    'last_editor_id',
];
```

These attributes can be mass assigned when creating or updating a post.

### Casts

```php
protected $casts = [
    'is_published' => 'boolean',
    'published_at' => 'datetime',
];
```

Casting ensures that `is_published` is treated as a boolean and `published_at` as a datetime object.

### Relationships

```php
public function tags(): BelongsToMany
{
    return $this->belongsToMany(Tag::class, 'blogs_post_tags', 'post_id', 'tag_id');
}

public function category(): BelongsTo
{
    return $this->belongsTo(Category::class);
}

public function author(): BelongsTo
{
    return $this->belongsTo(User::class);
}

public function creator(): BelongsTo
{
    return $this->belongsTo(User::class);
}

public function lastEditor(): BelongsTo
{
    return $this->belongsTo(User::class);
}
```

These relationships define how posts interact with other entities like categories, users (authors, creators, editors), and tags.

### Accessors

```php
public function getImageUrlAttribute()
{
    if (! $this->image) {
        return null;
    }

    return Storage::url($this->image);
}
```

This accessor formats the image path to return a full URL.

```php
public function getReadingTimeAttribute()
{
    $wordCount = str_word_count(strip_tags($this->content));
    $minutes = ceil($wordCount / 200);
    return $minutes . ' min read';
}
```

This accessor calculates the estimated reading time of the post.

### Soft Deletes

```php
use Illuminate\Database\Eloquent\SoftDeletes;
```

This allows posts to be "soft deleted" without being permanently removed from the database.

### Factory

```php
protected static function newFactory(): PostFactory
{
    return PostFactory::new();
}
```

This method links the model to its factory for generating dummy data.
