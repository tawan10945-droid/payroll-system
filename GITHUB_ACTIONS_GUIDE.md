# GitHub Actions CI/CD Guide

This guide explains how to configure and use the automated CI/CD pipeline for the Payroll Management System.

## Workflows

We have two main workflows:

1.  **CI (`ci.yml`)**: Triggered on every Push and Pull Request to `main`. It builds both the frontend and backend to ensure code quality.
2.  **CD (`deploy.yml`)**: Triggered on every Push to `main`. It builds Docker images and pushes them to AWS ECR.

## Setup Requirements

To enable the deployment (CD) workflow, you must add the following **Secrets** to your GitHub repository (`Settings > Secrets and variables > Actions`):

| Secret Name | Description |
| :--- | :--- |
| `AWS_ACCESS_KEY_ID` | Your AWS Access Key |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Secret Key |
| `AWS_REGION` | Your AWS Region (e.g., `us-east-1`) |

## AWS ECR Repositories

Ensure you have created the following ECR repositories in your AWS account:

- `payroll-backend`
- `payroll-frontend`

You can create them using the AWS CLI:

```bash
aws ecr create-repository --repository-name payroll-backend
aws ecr create-repository --repository-name payroll-frontend
```

## How Deployment Works

The App Runner services in `aws-infrastructure.yaml` are configured with `AutoDeploymentsEnabled: true`. When a new image is pushed to the ECR repository with the `latest` tag, App Runner will automatically detect the change and redeploy the service.
