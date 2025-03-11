# Docker

## Introduction

[Docker](https://www.docker.com/) is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. Docker can also be used for defining and running multi-container Docker applications using the Docker Compose tool.

With the help of Docker Compose, you can define containers to be built, their configuration, links, volumes, ports, etc., in a single file, and it gets launched by a single command. You can also add multiple servers and services just by adding them to the Docker Compose configuration file. This configuration file is in [YAML](https://en.wikipedia.org/wiki/YAML) format.

### Application Data and Database Volume Persistence

It is recommended to keep your application files and database data volume on the Docker host and mount them on the running container. This ensures that the application and database data persist even in the case of container failure or termination. This way, even if you destroy containers, your data won't be lost unless you remove them forcefully.

## Docker Setup for Aureus ERP

You can configure Aureus ERP using Docker with a pre-configured image from Docker Hub. This setup provides an isolated environment, managing system requirements such as Apache, MySQL, PHP, and Node.js.

### **Step 1: Pull the Docker Image**

Begin by pulling the Aureus ERP Docker image with the following command:

```bash
docker pull webkul/aureuserp:latest
```

### **Step 2: Run the Container**

Once the image is pulled, start a new container using the following command:

```bash
docker run -itd -p 80:80 -p 3306:3306 --name aureuserp webkul/aureuserp:latest
```

#### Explanation of the Command

- `-itd`: Runs the container in detached mode.
- `-p 80:80`: Maps port 80 on the host to port 80 in the container (for web access).
- `-p 3306:3306`: Maps port 3306 on the host to port 3306 in the container (for MySQL).
- `--name aureuserp`: Names the container "aureuserp" for easy reference.
- `webkul/aureuserp:latest`: Specifies the latest Aureus ERP Docker image.

### **Step 3: Verify the Running Container**

To check if your container is running, use the command:

```bash
docker ps
```

You should see `aureuserp` in the list of active containers.

### **Step 4: Access Aureus ERP**

Open your browser and navigate to:

```plaintext
http://localhost
```

Or use your server's IP address to access the application.

### **Step 5: Complete Installation & Login**

Once the setup process is finished, go to your browser and log in using the following credentials:

**Admin Panel Login:**

- **URL:** `http://localhost/`
- **Email:** `admin@example.com`
- **Password:** `admin123`

### **Step 6: Access the Database (Optional)**

To connect to MySQL inside the container, use:

```bash
docker exec -it aureuserp mysql -u root -p
```

If you need to stop the container, run:

```bash
docker stop aureuserp
```

To restart it, use:

```bash
docker start aureuserp
```

## Getting Support

If you encounter any issues or have questions, please contact us at `support@aureuserp.com` or raise a ticket at Aureus ERP Support.

Your Aureus ERP container is now up and running! 🚀
