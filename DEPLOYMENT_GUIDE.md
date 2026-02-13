# AWS Deployment Guide

This guide describes how to deploy the Payroll Management System to AWS using the provided CloudFormation template and deployment scripts.

## Prerequisites

1.  **AWS Account**: An active AWS account.
2.  **AWS CLI**: Installed and configured. [Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
3.  **Docker**: Installed and running.
4.  **MySQL Client**: (Optional) For manual database verification.

## Step 1: Initialize ECR Repositories

Create repositories for your Docker images.

```bash
aws ecr create-repository --repository-name payroll-backend
aws ecr create-repository --repository-name payroll-frontend
```

## Step 2: Build and Push Docker Images

Run the following commands to build and push your images (replace `<region>` and `<account-id>` with yours).

```bash
# Login to ECR
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com

# Backend
docker build -t payroll-backend ./backend
docker tag payroll-backend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/payroll-backend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/payroll-backend:latest

# Frontend
docker build -t payroll-frontend ./frontend
docker tag payroll-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/payroll-frontend:latest
docker push <account-id>.dkr.ecr.<region>.amazonaws.com/payroll-frontend:latest
```

## Step 3: Deploy Infrastructure

Use the provided `aws-infrastructure.yaml` to create the stack.

```bash
aws cloudformation create-stack \
  --stack-name payroll-stack \
  --template-body file://aws-infrastructure.yaml \
  --parameters \
    ParameterKey=DBPassword,ParameterValue=YourSecurePassword123 \
    ParameterKey=BackendImageUri,ParameterValue=<account-id>.dkr.ecr.<region>.amazonaws.com/payroll-backend:latest \
    ParameterKey=FrontendImageUri,ParameterValue=<account-id>.dkr.ecr.<region>.amazonaws.com/payroll-frontend:latest \
  --capabilities CAPABILITY_IAM
```

## Step 4: Initialize Database

Once the RDS instance is running, connect to it and run `database/schema.sql`.

```bash
mysql -h <rds-endpoint> -u admin -p payroll_db < database/schema.sql
```

## Step 5: Connect Frontend to Backend

To make the application fully functional in a public environment, you must point the frontend to your Backend Service URL.

1.  **Get Backend URL**: After Step 3, copy the `BackendUrl` from the CloudFormation outputs.
2.  **Update Configuration**: 
    If you are using the Nginx proxy, update `frontend/nginx.conf` before building the frontend image:
    
    ```nginx
    # Change this line in frontend/nginx.conf
    proxy_pass <YOUR_BACKEND_URL>/api/;
    ```
    
    *Alternatively*, if your Angular app calls the API directly, update `frontend/src/environments/environment.prod.ts`.

3.  **Rebuild and Push Frontend**:
    ```bash
    docker build -t payroll-frontend ./frontend
    docker tag payroll-frontend:latest <account-id>.dkr.ecr.<region>.amazonaws.com/payroll-frontend:latest
    docker push <account-id>.dkr.ecr.<region>.amazonaws.com/payroll-frontend:latest
    ```

## Step 6: Final Verification

Access the `FrontendUrl` from the CloudFormation outputs in your browser. The application is now **Publicly Accessible**!
