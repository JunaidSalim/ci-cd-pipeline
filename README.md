# Task Management App

This application consists of a _frontend built with React_ and a _backend built with Flask_. The backend is using _Mariadb_ instance for storing data. It allows users to _manage tasks_, _create new tasks_, and _remove existing tasks_.

This project features a complete **DevOps pipeline** with **Infrastructure as Code (Terraform)** and **automated CI/CD (GitHub Actions)** for seamless deployment to AWS.

![app-flow-diagram](app-flow-diagram.png)

## Features

- 🎯 **Task Management**: Full-featured task CRUD operations
- 🐳 **Dockerized**: Complete containerization with Docker Compose
- ☁️ **AWS Deployment**: Automated deployment to AWS EC2
- 🏗️ **Infrastructure as Code**: Terraform configuration for AWS resources
- 🚀 **CI/CD Pipeline**: GitHub Actions workflow for automated builds and deployments
- 📦 **Container Registry**: AWS ECR for Docker image management

## Prerequisites

### Local Development
- Node.js & npm - for frontend
- Python 3 - for backend
- Mariadb - for storing created tasks
- Docker & Docker Compose - for containerized deployment

### AWS Deployment
- AWS Account with appropriate permissions
- Terraform >= 1.0
- AWS CLI configured
- GitHub repository with the following secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `EC2_SSH_KEY`
  - `DB_PASSWORD`
  - `DB_ROOT_PASSWORD`
  - `DB_NAME`
- GitHub variables:
  - `PROJECT_NAME`
  - `AWS_REGION`

## Installation and Usage

### Local Development

#### Frontend
- Configure environment variables in _.env_ file
- Install dependencies required in package.json file 

    ```sh
    npm install
    ```
- Launch the application on port 3000 using

    ```sh
    npm start
    ```
- Other basic commands are same as for the normal react project

#### Backend
- Configure environment variables in _.env_ file
- Install following required dependencies 

    ```sh
    pip install flask flask_sqlalchemy pymysql python-dotenv flask-cors
    ```
- Launch the application on port 5000 using

    ```sh
    python main.py
    ```

#### Database
- Install _Mariadb_ database
- Create a _database_ and _user_ for the application
- Create all initially required tables and data in created database using _init.sql_ file in _backend/init.db/_ folder

#### Database Client
- Use any database client such as _phpmyadmin_ to easily interact with database

### Docker Deployment

#### Local Docker Compose
```sh
docker-compose up -d
```

#### Production Docker Compose (on AWS EC2)
```sh
docker-compose -f docker-compose.prod.yml up -d
```

## Infrastructure Setup (Terraform)

The `terraform/` directory contains complete Infrastructure as Code for AWS deployment:

### What Gets Provisioned
- **EC2 Instance**: t3.micro Ubuntu server with Docker pre-installed
- **ECR Repositories**: Container registries for frontend and backend images
- **Security Groups**: Configured for HTTP, HTTPS, SSH, and application ports (3000, 5000)
- **IAM Roles**: EC2 instance profile with ECR pull permissions
- **SSH Key Pair**: Auto-generated for secure EC2 access

### Deploy Infrastructure

1. Navigate to terraform directory:
   ```sh
   cd terraform
   ```

2. Initialize Terraform:
   ```sh
   terraform init
   ```

3. Review the planned changes:
   ```sh
   terraform plan
   ```

4. Apply the infrastructure:
   ```sh
   terraform apply
   ```

5. Save the outputs (SSH key, EC2 IP, ECR URLs):
   ```sh
   terraform output -json > outputs.json
   ```

### Terraform Files
- `provider.tf` - AWS provider configuration
- `variables.tf` - Input variables for customization
- `ec2.tf` - EC2 instance and SSH key configuration
- `ecr.tf` - ECR repositories for Docker images
- `security.tf` - Security groups and network rules
- `iam.tf` - IAM roles and policies for EC2
- `outputs.tf` - Output values (IP, SSH key, ECR URLs)
- `user_data.sh` - EC2 initialization script (installs Docker, AWS CLI)

## CI/CD Pipeline (GitHub Actions)

The `.github/workflows/deploy.yml` file implements a complete CI/CD pipeline:

### Workflow Triggers
- Automatically runs on push to `main` branch

### Pipeline Stages

#### 1. Build and Push
- Checks out code
- Configures AWS credentials
- Logs into Amazon ECR
- Builds Docker images for frontend and backend
- Pushes images to ECR

#### 2. Deploy
- Retrieves EC2 instance public IP
- Copies `docker-compose.prod.yml` to EC2 via SCP
- SSH into EC2 and:
  - Ensures Docker is installed
  - Logs into ECR
  - Creates `.env` file with secrets
  - Pulls latest images
  - Deploys application using Docker Compose

### Setting Up CI/CD

1. Fork/clone this repository
2. Add required secrets in GitHub Settings → Secrets and variables → Actions
3. Add required variables (PROJECT_NAME, AWS_REGION)
4. Push to `main` branch to trigger deployment

## Architecture

```
┌─────────────────┐      ┌──────────────────┐
│  GitHub Actions │─────▶│   AWS ECR        │
│   (CI/CD)       │      │  (Image Registry)│
└─────────────────┘      └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   AWS EC2        │
                         │  (Application)   │
                         │                  │
                         │  ┌────────────┐  │
                         │  │  Frontend  │  │
                         │  │  (React)   │  │
                         │  └────────────┘  │
                         │  ┌────────────┐  │
                         │  │  Backend   │  │
                         │  │  (Flask)   │  │
                         │  └────────────┘  │
                         │  ┌────────────┐  │
                         │  │  MariaDB   │  │
                         │  └────────────┘  │
                         └──────────────────┘
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── backend/
│   ├── Dockerfile             # Backend container image
│   └── main.py               # Flask application
├── frontend/
│   ├── Dockerfile            # Frontend container image
│   ├── package.json
│   └── src/                  # React application
├── terraform/
│   ├── ec2.tf               # EC2 instance configuration
│   ├── ecr.tf               # ECR repositories
│   ├── iam.tf               # IAM roles and policies
│   ├── security.tf          # Security groups
│   ├── provider.tf          # AWS provider setup
│   ├── variables.tf         # Input variables
│   ├── outputs.tf           # Output values
│   └── user_data.sh         # EC2 initialization script
├── docker-compose.yml        # Local development compose
├── docker-compose.prod.yml   # Production compose
└── README.md
```

## Environment Variables

### Frontend
- `REACT_APP_BACKEND_URL` - Backend API URL

### Backend
- `DB_HOST` - Database host
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with Docker
5. Submit a pull request

## License

This project is open source and available under the MIT License.
