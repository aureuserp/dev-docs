# Upgrade Guide

This guide will help you upgrade your **Aureus ERP** installation to the latest version safely and efficiently.

> **Important:** Always perform upgrades on a **staging or test environment** before updating your production instance.

---

## Upgrade Methods

You can upgrade Aureus ERP using one of the following methods:

* [Upgrade via GitHub (Recommended for Developers)](#_2-upgrade-via-github)
* [Upgrade via Website Download (Recommended for Manual Installation)](#_3-upgrade-via-website-download)

---

## 1. Backup Your Project

Before you begin, make sure to **back up** both your **database** and **project files**.

### Database Backup

```bash
# Example (MySQL)
mysqldump -u root -p aureus_db > backup_aureus_$(date +%F).sql
```

### Project Files Backup

Copy your entire Aureus ERP directory as a backup:

```bash
cp -r aureuserp aureuserp_backup_$(date +%F)
```

---

## 2. Upgrade via GitHub

If you cloned the project using Git, follow these steps.

### Step 1: Navigate to the Project Directory

```bash
cd /path/to/aureuserp
```

### Step 2: Pull the Latest Code

Pull the latest updates from the main repository:

```bash
git pull origin master
```

If you have local modifications that conflict with the update, temporarily stash them:

```bash
git stash
git pull origin master
git stash pop
```

**GitHub Repository:** [https://github.com/aureuserp/aureuserp](https://github.com/aureuserp/aureuserp)

---

## 3. Upgrade via Website Download

If you installed Aureus ERP manually (without Git), you can download the latest version from the official website.

### Step 1: Download Latest Package

Visit the official download page:
[https://aureuserp.com/download/](https://aureuserp.com/download/)

### Step 2: Extract and Replace Files

1. Extract the downloaded ZIP package.
2. Replace your existing Aureus ERP files, **except**:

   * `.env`
   * `storage/`
   * `vendor/` (will be regenerated)
   * `public/storage` symlink

### Step 3: Continue with the Dependency Update Steps Below

---

## 4. Update Dependencies

Once you have the latest code, update the Composer dependencies:

```bash
composer install --no-dev --optimize-autoloader
```

If you’re using Filament, update it as well:

```bash
composer update filament/filament --with-dependencies
```

**Note:** Aureus ERP includes a post-autoload script that automatically runs `php artisan filament:upgrade` to handle Filament v4 upgrades and compatibility changes.

---

## 5. Verify `.env` Configuration

Check your `.env` file and confirm that all configurations are correct:

| Key           | Description                        |
| ------------- | ---------------------------------- |
| `APP_URL`     | The application URL                |
| `APP_KEY`     | Laravel application encryption key |
| `DB_DATABASE` | Database name                      |
| `DB_USERNAME` | Database user                      |
| `DB_PASSWORD` | Database password                  |

If `.env` is missing, create it from the example file:

```bash
cp .env.example .env
php artisan key:generate
```

Ensure your `.env` file has a valid `APP_KEY`, or you’ll see `Illuminate\Encryption\MissingAppKeyException`.

---

## 6. Clear Cache and Optimize

Clean and rebuild all Laravel caches to ensure new configurations are applied:

```bash
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

---

## 7. Run Database Migrations

Apply new database schema updates introduced in the latest version:

```bash
php artisan migrate
```

> **Caution:** If you have custom tables or modules, review migration files before applying them.

---

## 8. Update Storage and Symlink Public Assets

Ensure your storage is properly linked:

```bash
php artisan storage:link
```

If you maintain a backup of your storage directory, restore it:

```bash
cp -r storage-backup/app/public storage/app/public
```

---

## 9. Test Your Application

After the upgrade, thoroughly test the application:

```bash
php artisan serve
```

Then visit your app in a browser:

```
http://127.0.0.1:8000
```

Verify:

* User authentication
* Dashboard & reports
* Custom modules or integrations
* File uploads and logs

---

## 10. Troubleshooting

If you encounter issues, try the following commands:

```bash
php artisan config:clear
composer dump-autoload
php artisan optimize
```

Then check the Laravel log file for detailed error messages:

```bash
storage/logs/laravel.log
```

### Common Issues

| Issue                    | Cause                       | Solution                                               |
| ------------------------ | --------------------------- | ------------------------------------------------------ |
| `MissingAppKeyException` | Missing `APP_KEY` in `.env` | Run `php artisan key:generate`                         |
| `Class not found` errors | Outdated dependencies       | Run `composer install`                                 |
| Debugbar slow load       | Debugbar assets conflict    | Disable Laravel Debugbar in `.env` (`APP_DEBUG=false`) |

---

## 11. Restart Server or Services

If you’re running the app under XAMPP, Valet, or Apache:

* **XAMPP:** Restart Apache and MySQL from Control Panel.

* **Artisan:** Stop and restart the built-in server:

  ```bash
  php artisan serve
  ```

* **Queue Workers:** Restart them after upgrading:

  ```bash
  php artisan queue:restart
  ```

---

## Conclusion

You’ve successfully upgraded your **Aureus ERP** installation to the latest version.

Stay up to date with new releases, patches, and community updates:

* **GitHub Repository:** [https://github.com/aureuserp/aureuserp](https://github.com/aureuserp/aureuserp)
* **Official Website:** [https://aureuserp.com](https://aureuserp.com)
* **Download Page:** [https://aureuserp.com/download/](https://aureuserp.com/download/)
