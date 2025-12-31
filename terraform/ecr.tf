resource "aws_ecr_repository" "ecr_frontend" {
  name = "${var.project_name}-frontend"
  image_tag_mutability = "MUTABLE"
  force_delete = true
}

resource "aws_ecr_repository" "ecr_backend" {
  name = "${var.project_name}-backend"
  image_tag_mutability = "MUTABLE"
  force_delete = true
}