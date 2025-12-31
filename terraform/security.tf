data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
     name = "vpc-id"
     values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "security_group" {
  name = "${var.project_name}-security-group"
  vpc_id = data.aws_vpc.default.id
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  security_group_id = aws_security_group.security_group.id

  from_port = 22
  to_port = 22
  ip_protocol = "tcp"
  cidr_ipv4 = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_frontend" {
  security_group_id = aws_security_group.security_group.id

  from_port = 3000
  to_port = 3000
  ip_protocol = "tcp"
  cidr_ipv4 = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_backend" {
  security_group_id = aws_security_group.security_group.id

  from_port = 5000
  to_port = 5000
  ip_protocol = "tcp"
  cidr_ipv4 = "0.0.0.0/0"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.security_group.id

  from_port = 80
  to_port = 80
  ip_protocol = "tcp"
  cidr_ipv4 = "0.0.0.0/0"
}

resource "aws_vpc_security_group_egress_rule" "allow_all_outbound" {
  security_group_id = aws_security_group.security_group.id
  cidr_ipv4 = "0.0.0.0/0"
  ip_protocol = -1
}