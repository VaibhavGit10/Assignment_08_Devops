# 🚀 Full CI/CD Pipeline for MERN App using Jenkins, Docker & Helm
# MERN CI/CD with Jenkins, Docker & Helm
> This project showcases a robust DevOps pipeline that automates the building, containerization, and Kubernetes deployment of a MERN stack application using Jenkins, Docker, Helm, and Minikube.
> 🚀 Automated build, containerization, and deployment of a MERN stack (MongoDB, Express, React, Node) app to Minikube using Jenkins and Helm.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Prerequisites](#prerequisites)
4. [Setup & Configuration](#setup--configuration)
5. [Jenkins Pipeline](#jenkins-pipeline)
6. [Helm Chart Deployment](#helm-chart-deployment)
7. [Verifying Deployment](#verifying-deployment)
8. [Screenshots](#screenshots)
9. [Troubleshooting](#troubleshooting)
10. [Additional Tips](#additional-tips)
11. [License](#license)

---

## 📝 Project Overview

This project demonstrates a full CI/CD pipeline for a **MERN** application:

- **Backend** (Node/Express + MongoDB)
- **Frontend** (React)

Using:

- **Jenkins** (automate: build → push Docker images → deploy via Helm)
- **Docker** (containerization)
- **Helm** (templated Kubernetes manifests)
- **Minikube** (local Kubernetes cluster)

---

## 📁 Repository Structure

```
├── backend/                # Node/Express API
│   └── Dockerfile
│   └── index.js
│   └── controllers/…
│   └── models/…
├── frontend/               # React SPA
│   └── Dockerfile
│   └── src/…
│   └── public/…
├── helm-chart/mern-chart/  # Helm chart
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── backend-deployment.yaml
│       ├── frontend-deployment.yaml
│       └── service.yaml
├── jenkins/                # Jenkinsfiles & scripts
│   └── Jenkinsfile
├── k8s/                    # Raw Kubernetes manifests (optional)
├── README.md               # ← You are here
└── LICENSE
```

---

## ✅ Prerequisites

- **Local machine** with:

  - Docker & Docker daemon
  - Minikube & kubectl
  - Helm 3.x
  - Jenkins (with Docker and Helm on agent)

- **Jenkins credentials** (configured under “Manage Jenkins → Credentials”):

  - **DOCKERHUB_CREDS** (username/password)
  - **K8S_MINIKUBE** (flattened kubeconfig as “Secret file”)

---

## ⚙️ Setup & Configuration

1. **Clone the repo**

   ```bash
   git clone https://github.com/YourUser/Assignment_08_Devops.git
   cd Assignment_08_Devops
   ```

2. **Prepare Minikube**

   ```bash
   minikube start --driver=docker
   ```

3. **Generate a flattened kubeconfig** (so Jenkins can use it):

   ```bash
   kubectl config view --flatten --minify > jenkins-kubeconfig
   ```

   Upload this `jenkins-kubeconfig` to Jenkins as `K8S_MINIKUBE` (Secret file).

4. **Configure Jenkins**

   - Install **Docker Pipeline** and **Kubernetes CLI** plugins
   - Add DockerHub creds (`DOCKERHUB_CREDS`)
   - Add your `jenkins-kubeconfig` as `K8S_MINIKUBE`

---

## 🛠️ Jenkins Pipeline

The `jenkins/Jenkinsfile` defines:

1. **Build & Push Backend**
2. **Build & Push Frontend**
3. **Deploy via Helm**

**Trigger** your pipeline by pushing to `main`, or manually in Jenkins:

```groovy
pipeline {
  agent any
  environment {
    IMAGE_TAG = "v${BUILD_NUMBER}"
  }
  stages {
    stage('Build & Push Backend Image') { … }
    stage('Build & Push Frontend Image') { … }
    stage('Deploy to Minikube using Helm') { … }
  }
  post { … }
}
```

---

## 📦 Helm Chart Deployment

The chart lives under `helm-chart/mern-chart`.

- **Values** are in `values.yaml`:

  ```yaml
  backend:
    replicaCount: 2
    image:
      repository: your-dockerhub-user/mern-backend
      tag: latest

  frontend:
    replicaCount: 2
    image:
      repository: your-dockerhub-user/mern-frontend
      tag: latest
  ```

- **Deploy** manually:

  ```bash
  cd helm-chart/mern-chart
  helm upgrade --install mern-release .     --set backend.image.repository=your-dockerhub-user/mern-backend     --set backend.image.tag=v1     --set frontend.image.repository=your-dockerhub-user/mern-frontend     --set frontend.image.tag=v1
  ```

---

## 🔍 Verifying Deployment

1. **List Helm releases**
   ```bash
   helm ls
   ```
2. **Check Pods / Services**
   ```bash
   kubectl get pods,svc
   ```
3. **Access Frontend**
   - Get NodePort:
     ```bash
     kubectl get svc frontend-service
     ```
   - Open in browser:     `http://$(minikube ip):<NodePort>`

---

## 🖼️ Screenshots

<img width="1365" height="626" alt="Img_01" src="https://github.com/user-attachments/assets/b08304b1-d144-416f-a968-67f2f405552d" />
<img width="1365" height="626" alt="Img_02" src="https://github.com/user-attachments/assets/81620871-a5ac-4a20-a625-e428df740782" />
<img width="1365" height="624" alt="Img_03" src="https://github.com/user-attachments/assets/1f5af903-41dd-42d3-8dff-6891cab59152" />
<img width="1365" height="589" alt="Img_04" src="https://github.com/user-attachments/assets/c64b3f8f-0275-4655-be65-afff0e8396a9" />
<img width="1365" height="306" alt="Img_05" src="https://github.com/user-attachments/assets/56e4a7fa-567a-49be-9fbb-d6bff1c4dbc4" />
<img width="1365" height="516" alt="Img_06" src="https://github.com/user-attachments/assets/c4a8d115-a4ca-4f9e-9356-9eeb998e05f8" />
<img width="1236" height="505" alt="Img_07" src="https://github.com/user-attachments/assets/3b399ff0-e384-47d1-bee5-dffc7cc3923d" />
<img width="1362" height="624" alt="Img_08_Successfull_Jenkins_Pipeline" src="https://github.com/user-attachments/assets/b4dcae5b-629f-4a96-a31b-a8e5e984fe94" />
<img width="1365" height="195" alt="Img_09_Helm_List" src="https://github.com/user-attachments/assets/b3298f75-db46-46eb-ab20-764021bc5be7" />
<img width="1365" height="454" alt="Img_09_Pods" src="https://github.com/user-attachments/assets/1c4a3de6-7739-475f-a8a6-347b443f9d80" />

```

---

## 🧯 Troubleshooting

- **“no route to host”** when `kubectl get pods` → ensure `minikube start` is running and `KUBECONFIG` points to the right file.
- **Permission denied** on `.minikube/*` → fix file ownership so Jenkins user can read.
- **Helm chart errors** → double-check your `values.yaml` keys match your templates’ `.Values.*` paths.

---

## 💡 Additional Tips

- Always tag Docker images with `v${BUILD_NUMBER}` or a commit SHA to avoid stale deployments.
- Make sure Helm chart versioning matches your release strategy.
- Enable RBAC properly if deploying to real K8s clusters.
- Clean up old releases with `helm uninstall mern-release` during testing.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
