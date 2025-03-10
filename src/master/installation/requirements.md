# Requirements

## Server Configuration

- **Server**: Apache 2 or NGINX
- **RAM**: 4GB or higher
- **Node.js & NPM**: Latest stable versions
- **PHP**: 8.2 or higher
- **Laravel**: 11.x
- **FilamentPHP**: 3.x
- **Composer**: Latest version
- **Database**: MySQL 8.0+ or SQLite
- **Browser**: A modern browser (Chrome, Firefox, Edge)

## PHP Extensions

Ensure the following extensions are installed and enabled. You can check using the **`phpinfo()`** page or the **`php -m`** command.

- **php-intl**: Required for internationalization support.
- **php-gd**: Required for image processing and manipulation.
- **OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON**: Essential extensions for Laravel and FilamentPHP.

## PHP Configuration

Modify your **`php.ini`** file with the following settings:

- **memory_limit**: Set to **`4G`** or higher for optimal performance.
- **max_execution_time**: Adjust to **`360`** seconds or higher to allow long-running scripts.
- **date.timezone**: Set to your specific timezone (e.g., **`Asia/Kolkata`**).

```ini
memory_limit = 4G
max_execution_time = 360
date.timezone = Asia/Kolkata  ; Change this to your timezone.
```

::: tip Remember to restart your web server
After modifying the PHP configuration, restart Apache or NGINX to apply changes.
:::

## Supported Database Servers

The application supports the following database servers:

- **MySQL**: Version 8.0+ is recommended for optimal performance.
- **SQLite**: Alternative lightweight database option.

### Database Collation

The recommended collation is **`utf8mb4_unicode_ci`**, ensuring proper Unicode and multilingual support.
