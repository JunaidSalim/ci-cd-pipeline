output "server_public_ip" {
  description = "Public IP of the EC2 Server"
  value       = aws_instance.ec2_web_server.public_ip
}

output "github_access_key_id" {
  description = "Access Key for GitHub Actions"
  value       = aws_iam_access_key.github-actions_access_key.id
  sensitive   = true
}

output "github_secret_access_key" {
  description = "Secret Key for GitHub Actions"
  value       = aws_iam_access_key.github-actions_access_key.secret
  sensitive   = true
}

output "ecr_frontend_url" {
  description = "URL for the Frontend ECR Repository"
  value       = aws_ecr_repository.ecr_frontend.repository_url
}

output "ecr_backend_url" {
  description = "URL for the Backend ECR Repository"
  value       = aws_ecr_repository.ecr_backend.repository_url
}

output "private_key_pem" {
  value     = tls_private_key.exam_key.private_key_pem
  sensitive = true
}