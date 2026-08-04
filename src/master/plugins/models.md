# **Overview**

Models represent database entities and define relationships, fillable attributes, and other Eloquent ORM features. They serve as the primary way to interact with the database.

## **Key Features of Models in AureusERP**

- Define table structures using Eloquent ORM.
- Establish relationships such as `hasOne`, `hasMany`, `belongsTo`, and `belongsToMany`.
- Implement accessors and mutators to format data before saving or retrieving it.
- Use query scopes to filter data efficiently.
- Enable factories for generating test data.

### **Example: Defining a Model**

```php
<?php

namespace Webkul\Blog\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Webkul\Security\Models\User;

class Post extends Model
{
    use HasFactory;

    protected $table = 'blogs_posts';

    protected $fillable = ['title', 'content', 'author_id', 'published_at'];

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
```

Models live in the plugin's `src/Models` directory. Note that user relationships reference the `Webkul\Security\Models\User` model, and table names are prefixed with the plugin name (for example `blogs_posts`).

For more details on models, refer to [Models](../getting-started/models.md).
