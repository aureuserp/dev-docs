# **Overview**

Models represent database entities and define relationships, fillable attributes, and other Eloquent ORM features. They serve as the primary way to interact with the database.

## **Key Features of Models in Aureus ERP**

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

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'author_id', 'published_at'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
```

For more details on models, refer to [Models](../getting-started/models.md).
