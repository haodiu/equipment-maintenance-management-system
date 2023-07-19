#!/bin/bash
docker login registry-gitlab.geekup.io;
docker build -t registry-gitlab.geekup.io/gu_alia/alia-backend-gi:latest .;
docker push registry-gitlab.geekup.io/gu_alia/alia-backend-gi:latest;

ssh -T alia-gi << EOF
  cd alia/alia-backend-gi;
  git pull;
  docker pull registry-gitlab.geekup.io/gu_alia/alia-backend-gi:latest;
  docker pull registry-gitlab.geekup.io/gu_alia/alia-backend-gi/nginx:latest;
  docker compose -f docker-compose-staging.yml up -d --remove-orphans --force-recreate;
EOF
