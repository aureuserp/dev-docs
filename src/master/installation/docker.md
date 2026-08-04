# Docker

## Introduction

[Docker](https://www.docker.com/) is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. AureusERP ships as a single-container production image, so a plain `docker run` is all it takes — Docker Compose is only used for local development via Laravel Sail.

### Database and Storage Persistence

It is recommended to attach named volumes for the database data directory and the application storage directory. This ensures that your data persists even in the case of container failure or termination — even if you destroy the container, your data won't be lost unless you remove the volumes explicitly.

## Docker Setup for AureusERP

You can run AureusERP using the pre-configured production image from Docker Hub. It is a single-container, production-ready image that bundles the application, Nginx, PHP-FPM, MySQL, and Supervisor — everything needed to run the ERP with one `docker run`. AureusERP is fully installed at build time (migrations, seeders, roles & permissions, admin user), so the container boots ready to use.

The image sources live in the `docker/production/` directory of the repository, and you can also build it yourself from there:

```bash
docker build -t aureuserp:latest docker/production
```

::: tip Local development
The production image is meant for running AureusERP. For local development, use Laravel Sail via the `docker-compose.yml` at the repository root.
:::

### **Step 1: Pull the Docker Image**

Begin by pulling the AureusERP Docker image with the following command:

```bash
docker pull webkul/aureuserp:latest
```

### **Step 2: Run the Container**

Once the image is pulled, start a new container using the following command:

```bash
docker run -d --name aureuserp -p 80:80 \
  -v aureus-mysql:/var/lib/mysql \
  -v aureus-storage:/var/www/aureuserp/storage \
  webkul/aureuserp:latest
```

#### Explanation of the Command

- `-d`: Runs the container in detached mode.
- `--name aureuserp`: Names the container "aureuserp" for easy reference.
- `-p 80:80`: Maps port 80 on the host to port 80 in the container (for web access). To use a different host port, change it, e.g. `-p 8080:80`.
- `-v aureus-mysql:/var/lib/mysql`: Persists the database files in a named volume.
- `-v aureus-storage:/var/www/aureuserp/storage`: Persists uploads, logs, and app state.
- `webkul/aureuserp:latest`: Specifies the latest AureusERP Docker image.

::: warning Persistence
Without the named volumes the container is ephemeral — all data is lost on `docker rm`. Use named volumes (not bind mounts), as an empty bind mount would shadow the pre-installed data. Never expose the MySQL port 3306 publicly.
:::

::: tip Local testing over plain HTTP
The image defaults to `APP_ENV=production`, which forces every generated URL to `https` — correct for a live site behind TLS. For local testing over plain HTTP, run with `-e APP_ENV=local -e APP_URL=http://localhost`. The image has no built-in TLS — terminate HTTPS at a reverse proxy in front of the container.
:::

You can override application and database settings at runtime with environment variables such as `APP_URL`, `APP_NAME`, `APP_TIMEZONE`, `APP_LOCALE`, `APP_CURRENCY`, and `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`. Setting `DB_HOST` to a non-local address switches the container to an external MySQL server and keeps the internal MySQL off. See `docker/production/README.md` in the repository for the full reference.

### **Step 3: Verify the Running Container**

To check if your container is running, use the command:

```bash
docker ps
```

You should see `aureuserp` in the list of active containers.

### **Step 4: Access AureusERP**

Open your browser and navigate to:

```plaintext
http://localhost
```

Or use your server's IP address to access the application.

### **Step 5: Login**

The application is pre-installed, so no setup wizard runs — go to your browser and log in using the following credentials:

**Admin Panel Login:**

- **URL:** `http://localhost/admin`
- **Email:** `admin@example.com`
- **Password:** `password`

::: warning
Change the admin password immediately after the first login. You can also bake custom credentials into a self-built image with the `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` build arguments.
:::

### **Step 6: Access the Database (Optional)**

To connect to the internal MySQL database, use:

```bash
docker exec -it aureuserp mysql -u aureus -p aureus
```

When prompted, enter the password `aureus`. The internal database name, username, and password are all `aureus` — they are baked into the image at build time. The `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` environment variables only apply when connecting to an external database server.

::: info
This works only in internal-database mode. If you started the container with `DB_HOST` pointing to an external server, the internal MySQL is not running — connect to your external server instead.
:::

If you need to stop the container, run:

```bash
docker stop aureuserp
```

To restart it, use:

```bash
docker start aureuserp
```

## Getting Support

If you encounter any issues or have questions, please contact us at `support@aureuserp.com` or raise a ticket at AureusERP Support.

Your AureusERP container is now up and running! 🚀
