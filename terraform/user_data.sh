#!/bin/bash
while fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do
  echo "Waiting for other software managers to finish..."
  sleep 5
done

sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg lsb-release unzip

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin awscli

sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

mkdir -p /home/ubuntu/app
chown ubuntu:ubuntu /home/ubuntu/app