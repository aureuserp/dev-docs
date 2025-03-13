# Overview

Custom Fields is a powerful feature in Aureus ERP that allows you to dynamically add additional attributes to your resources. This functionality is accessible through **Settings > Custom Fields** and enables you to enhance forms, tables, and infolists with custom attributes tailored to your specific business needs.

## Key Benefits

- Dynamically add or remove fields from any compatible resource
- Customize forms with additional inputs specific to your business needs
- Apply validation rules to ensure data integrity
- Control field display in tables and infolists
- Extend resources without database modifications

## Prerequisites

To use Custom Fields with a resource, you need to:

1. Apply the `HasCustomFields` trait to your resource class:

   ```php
   use Webkul\Field\Filament\Traits\HasCustomFields;

   class YourResource extends Resource
   {
       use HasCustomFields;

       // Resource configuration...
   }
   ```

2. Apply the `HasCustomFields` trait to your model:

   ```php
   use Webkul\Field\Traits\HasCustomFields;

   class YourModel extends Model
   {
       use HasCustomFields;

       // Model configuration...
   }
   ```

## Creating Custom Fields

Navigate to **Settings > Custom Fields** to create and manage custom fields:

### Field Properties

| Property            | Description                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Name                | Human-readable field name                                                                                                       |
| Code                | Unique identifier for the field (must be unique)                                                                                |
| Type                | Field type (TextInput, TextArea, Select, Checkbox, Radio, Toggle, Checkbox List, DateTime Picker, Markdown Editor, Color, etc.) |
| Input Type          | Data type (text, email, password, integer, telephone, etc.)                                                                     |
| Sort Order          | Position of the field in the form                                                                                               |
| Resource            | The resource where the field will be added                                                                                      |
| Validations         | Rules to validate input data                                                                                                    |
| Additional Settings | Optional configurations (autocapitalize, autocomplete, autofocus, hint, icon, color, etc.)                                      |
| Table Settings      | Toggle the visibility of custom fields in resource tables.                                                                      |
| Infolist Settings   | Configure how custom fields appear in resource infolists.                                                                       |

## Implementation

### In Your Resource Files

Use the methods provided by the `HasCustomFields` trait to incorporate custom fields into your resource:

```php
use Filament\Forms;
use Webkul\Field\Filament\Traits\HasCustomFields;

class YourResource extends Resource
{
    use HasCustomFields;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Your standard form fields
                Forms\Components\Tabs\Tab::make(__('Additional Information'))
                    ->schema(static::mergeCustomFormFields([
                        // You can add standard fields here as well
                        Forms\Components\Group::make()
                            ->schema([
                                Forms\Components\Select::make('user_id')
                                    ->label(__('Buyer'))
                                    ->relationship('user', 'name')
                                    ->searchable()
                                    ->preload()
                            ]),
                    ]))
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns(static::mergeCustomTableColumns([
                // Your standard table columns
            ]))
            ->filters(static::mergeCustomTableFilters([
                Tables\Filters\QueryBuilder::make()
                    ->constraints(collect(static::mergeCustomTableQueryBuilderConstraints([
                        // Your standard table filters query builder constraints.
                    ]))->filter()->values()->all()),
            ]))
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema(static::mergeCustomInfolistEntries([
                // Your standard infolist entries
            ]));
    }
}
```

# Available Methods

The `HasCustomFields` trait provides a comprehensive set of methods to seamlessly integrate custom fields throughout Filament's component architecture. These methods enable precise control over which custom fields appear in specific contexts and how they're integrated with your standard configuration.

## Form Integration Methods

### `mergeCustomFormFields(array $baseSchema, array $include = [], array $exclude = [])`

Combines your predefined form schema with dynamically configured custom fields.

```php
// Example: Merging custom fields into a specific tab
Forms\Components\Tabs\Tab::make('Client Details')
    ->schema(static::mergeCustomFormFields([
        Forms\Components\TextInput::make('client_name')
            ->required(),
        Forms\Components\TextInput::make('client_email')
            ->email()
            ->required(),
    ], ['contact_preference', 'industry_type'], ['internal_notes']))
    ->columns(2)
```

In this example:

- Base fields (`client_name` and `client_email`) are defined explicitly
- Only the custom fields with codes `contact_preference` and `industry_type` will be included
- The custom field with code `internal_notes` will be excluded, even if it exists for this resource

### `getCustomFormFields(array $include = [], array $exclude = [])`

Retrieves only the custom form fields without merging them with existing schema, useful when you need complete control over field placement.

```php
// Example: Placing custom fields in a specific section
Forms\Components\Section::make('Advanced Settings')
    ->schema(static::getCustomFormFields())
    ->columns(3)
    ->collapsed()
```

## Table Integration Methods

### `mergeCustomTableColumns(array $baseColumns, array $include = [], array $exclude = [])`

Combines standard table columns with dynamically generated columns from custom fields flagged for table display.

```php
// Example: Adding custom columns to standard listing
public static function table(Table $table): Table
{
    return $table
        ->columns(static::mergeCustomTableColumns([
            Tables\Columns\TextColumn::make('id')
                ->sortable(),
            Tables\Columns\TextColumn::make('name')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('created_at')
                ->dateTime()
                ->sortable(),
        ]))
        ->defaultSort('created_at', 'desc');
}
```

### `getCustomTableColumns(array $include = [], array $exclude = [])`

Returns only the columns generated from custom fields, giving you flexibility to position them precisely where needed.

```php
// Example: Creating a table with standard columns and a specific section for custom fields
return $table
    ->columns([
        Tables\Columns\TextColumn::make('id')->sortable(),
        Tables\Columns\TextColumn::make('name')->searchable(),
        ...
        // Group of custom columns with a descriptive heading
        Tables\Columns\Layout\Group::make()
            ->columns(static::getCustomTableColumns())
            ->heading('Custom Attributes')
    ]);
```

### `mergeCustomTableFilters(array $baseFilters, array $include = [], array $exclude = [])`

Enhances table filtering capabilities by combining standard filters with those generated from filterable custom fields.

```php
// Example: Adding custom field filters to standard filters
public static function table(Table $table): Table
{
    return $table
        ->columns([...])
        ->filters(static::mergeCustomTableFilters([
            Tables\Filters\SelectFilter::make('status')
                ->options(Status::class),
            Tables\Filters\Filter::make('created_at')
                ->form([
                    Forms\Components\DatePicker::make('created_from'),
                    Forms\Components\DatePicker::make('created_until'),
                ]),
        ]));
}
```

### `getCustomTableFilters(array $include = [], array $exclude = [])`

Retrieves only the filters generated from custom fields, useful for creating dedicated filter sections.

### `mergeCustomTableQueryBuilderConstraints(array $baseConstraints, array $include = [], array $exclude = [])`

Extends query builder constraints to include those derived from custom fields, enhancing advanced filtering capabilities.

### `getTableQueryBuilderConstraints(array $include = [], array $exclude = [])`

Returns only the query constraints derived from custom fields, providing granular control over query modification.

## Infolist Integration Methods

### `mergeCustomInfolistEntries(array $baseSchema, array $include = [], array $exclude = [])`

Combines standard infolist entries with those generated from custom fields configured for infolist display.

```php
// Example: Incorporating custom fields into a view page
public static function infolist(Infolist $infolist): Infolist
{
    return $infolist
        ->schema([
            Infolists\Components\Section::make('Basic Information')
                ->schema([
                    Infolists\Components\TextEntry::make('name'),
                    Infolists\Components\TextEntry::make('email'),
                    Infolists\Components\TextEntry::make('phone'),
                ]),

            Infolists\Components\Section::make('Additional Information')
                ->schema(static::mergeCustomInfolistEntries([
                    Infolists\Components\TextEntry::make('notes')
                        ->columnSpan(2),
                ]))
                ->columns(2),
        ]);
}
```

### `getCustomInfolistEntries(array $include = [], array $exclude = [])`

Returns only the infolist entries generated from custom fields, offering flexibility for precise placement.

## Model Integration

The model trait `HasCustomFields` implements a sophisticated system that seamlessly integrates custom fields with Laravel's model architecture:

### Automatic Field Loading

Custom fields are loaded at critical lifecycle events to ensure they're always available:

```php
protected static function bootHasCustomFields()
{
    static::retrieved(fn ($model) => $model->loadCustomFields());
    static::creating(fn ($model) => $model->loadCustomFields());
    static::updating(fn ($model) => $model->loadCustomFields());
}
```

This ensures that custom fields are available whether you're retrieving an existing record, creating a new one, or updating values.

### Fillable Management

The trait automatically adds custom field codes to the model's `$fillable` property, ensuring they can be mass-assigned through forms:

```php
protected function mergeFillable(array $attributes): void
{
    $this->fillable = array_unique(array_merge($this->fillable, $attributes));
}
```

### Intelligent Type Casting

The system analyzes each custom field's type and configures appropriate casting rules:

```php
match ($attribute->type) {
    'select'        => $this->casts[$attribute->code] = $attribute->is_multiselect ? 'array' : 'string',
    'checkbox'      => $this->casts[$attribute->code] = 'boolean',
    'toggle'        => $this->casts[$attribute->code] = 'boolean',
    'checkbox_list' => $this->casts[$attribute->code] = 'array',
    default         => $this->casts[$attribute->code] = 'string',
};
```

This ensures that data is properly formatted when retrieved from and saved to the database, maintaining integrity across data types.

## Advanced Usage Examples

### Contextual Field Display

Control which custom fields appear in different contexts:

```php
// Only show specific custom fields in a create form
public static function form(Form $form): Form
{
    return $form
        ->schema([
            // Standard fields...

            Forms\Components\Section::make('Custom Attributes')
                ->schema(
                    $form->getOperation() === 'create'
                        ? static::getCustomFormFields(['priority', 'source', 'category'])
                        : static::getCustomFormFields()
                )
                ->columns(2)
                ->collapsed($form->getOperation() !== 'create'),
        ]);
}
```

### Dynamic Field Groups

Group custom fields by their purpose or category:

```php
// Group custom fields by internal purpose
$contactFields = static::getCustomFormFields(['phone_type', 'alternate_email', 'preferred_contact_method']);
$businessFields = static::getCustomFormFields(['industry', 'company_size', 'annual_revenue']);

return $form->schema([
    Forms\Components\Section::make('Contact Information')
        ->schema(array_merge([
            // Standard contact fields
        ], $contactFields))
        ->columns(2),

    Forms\Components\Section::make('Business Information')
        ->schema(array_merge([
            // Standard business fields
        ], $businessFields))
        ->columns(2),
]);
```

## Best Practices

1. **Field Naming Conventions**: Establish a consistent naming pattern for custom field codes to maintain clarity (e.g., `client_preferred_language`, `invoice_reference_format`).

2. **Strategic Validation**: Apply appropriate validation rules to ensure data integrity while balancing user experience. Consider contextual validation needs (e.g., fields that are required only in certain scenarios).

3. **Logical Field Organization**: Use sort order to group related fields together, creating a natural flow through the form.

4. **Field Visibility Management**: Carefully consider which custom fields should appear in tables and infolists. Not all fields need to be visible in all contexts.

5. **Performance Considerations**: For resources with many custom fields, use the `include` and `exclude` parameters to load only necessary fields in specific contexts, optimizing performance.

6. **Thorough Testing**: Test custom fields with various data types and edge cases, particularly when using validation rules or when fields interact with each other.

7. **Documentation**: Maintain internal documentation of your custom field architecture to help team members understand the purpose and behavior of each field.

8. **Regular Auditing**: Periodically review unused or redundant custom fields to maintain system efficiency and user experience clarity.

By leveraging these sophisticated methods, Aureus ERP provides an enterprise-grade solution for extending your data model dynamically, allowing your system to evolve with your business requirements without requiring database schema modifications or developer intervention.
