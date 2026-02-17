#!/bin/bash

# Configuration
REGION="ap-southeast-1"
ACCOUNT_ID="451636241157"
STACK_NAME="payroll-stack"

echo "Building and Pushing Docker images to AWS ECR..."

# Login to ECR
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Backend
echo "Processing Backend..."
docker build -t payroll-backend ./backend
docker tag payroll-backend:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/payroll-backend:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/payroll-backend:latest

# Frontend
echo "Processing Frontend..."
docker build -t payroll-frontend ./frontend
docker tag payroll-frontend:latest $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/payroll-frontend:latest
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/payroll-frontend:latest

echo "Images pushed successfully. You can now deploy the CloudFormation stack."
echo "Stack name: $STACK_NAME"
