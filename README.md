# Mod20
\*\*# Coding Quiz CI/CD Monorepo

A full-stack coding quiz application with Cypress component tests and automated deployment via GitHub Actions and Render.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Repository Structure](#repository-structure)
5. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Clone & Install](#clone--install)
   * [Environment Variables](#environment-variables)
   * [Seeding the Database](#seeding-the-database)
   * [Running Locally](#running-locally)
6. [CI / CD Pipeline](#ci--cd-pipeline)

   * [Continuous Integration (CI)](#continuous-integration-ci)
   * [Continuous Deployment (CD)](#continuous-deployment-cd)
7. [Render Deployment](#render-deployment)
8. [API Endpoints](#api-endpoints)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

This repository contains a monorepo for a coding quiz application built with React (Vite) in the client folder and Node.js + Express + Mongoose in the server folder. We integrated a CI/CD pipeline using GitHub Actions to run Cypress component tests on Pull Requests to the `develop` branch and automatically deploy to Render when code is merged into `main`.

---

## Features

* **Cypress Component Tests**: Automatically run on every Pull Request to `develop`.
* **Automated Deployment**: On merge to `main`, deploys to Render.
* **Monorepo Structure**: Single repo containing both client and server code.
* **MongoDB Atlas**: Database hosted in Atlas, seeded automatically.
* **Catch-All Routing**: Serves React SPA for client-side navigation.

---

## Tech Stack

* **Frontend**: React 18, Vite, TypeScript, Cypress
* **Backend**: Node.js, Express, Mongoose, TypeScript
* **Database**: MongoDB Atlas
* **CI/CD**: GitHub Actions, Render

---

## Repository Structure

```
Mod20/
├─ Develop/                  # Monorepo root
│  ├─ client/                # React + Vite app
│  ├─ server/                # Express + Mongoose API
│  │  ├─ src/
│  │  │  ├─ config/          # DB connection
│  │  │  ├─ controllers/     # Route handlers
│  │  │  ├─ models/          # Mongoose schemas
│  │  │  ├─ routes/          # Express routers
│  │  │  └─ seeds/           # Seed scripts & JSON
│  ├─ cypress/               # Component tests
│  ├─ .github/workflows/     # CI & CD YAML files
│  └─ README.md
└─ README.md                 # This file
```

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v16+ and npm
* A MongoDB Atlas cluster (or local MongoDB)

### Clone & Install

```bash
# Clone the repo
git clone https://github.com/<your-username>/Mod20.git
cd Mod20/Develop

# Install dependencies for both server & client
npm run install
```

### Environment Variables

Create a `.env` file in `Develop/server/` or set via your shell/hosting:

```bash
MONGODB_URI="mongodb+srv://<user>:<pw>@<cluster-url>/coding-quiz?retryWrites=true&w=majority"
```

### Seeding the Database

```bash
cd server
npm run build
export MONGODB_URI="<your Atlas URI>"
npm run seed
```

### Running Locally

```bash
# Start client + server concurrently
npm run develop

# Or run separately
cd server && npm run watch
cd client && npm run dev
```

---

## CI / CD Pipeline

### Continuous Integration (CI)

* On **Pull Request** to `develop`, GitHub Actions runs:

  1. `npm ci`
  2. `npm test` – executes Cypress component tests
* Results are reported in the Checks tab.

### Continuous Deployment (CD)

* On **merge** to `main`, GitHub Actions triggers:

  1. Build command: `npm install && npm run build`
  2. Deploy hook calls Render via webhook
* Render builds and starts the service automatically.

---

## Render Deployment

1. **Root Directory** set to `Develop/` in Render settings.
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm run start`
4. **Environment Variable**: `MONGODB_URI` pointing at Atlas
5. **Auto-Deploy** enabled for branch `main`.

---

## API Endpoints

* **GET** `/api/questions/random`  → Returns a random quiz question as JSON.

---

## Contributing

1. Fork the repo
2. Create a branch (`feature/XYZ`)
3. Commit your changes
4. Open a Pull Request to `develop`

---

## License

This project is licensed under MIT – see the [LICENSE](LICENSE) file for details.
