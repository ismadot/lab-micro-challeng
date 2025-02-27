# Lab Micro Challenge - Fullstack App

Welcome to the **Lab Micro Challenge** fullstack application! This project provides a **backend** in Flask and a **frontend** in React (Vite). You can run it using **Docker** or set it up manually in your local environment.

📌 **Repository:** [GitHub - lab-micro-challeng](https://github.com/ismadot/lab-micro-challeng)

---

## 🚀 Quick Start
You can run this project in **two ways**:
1️⃣ **Using Docker** (Recommended) 🐳✅
2️⃣ **Running it manually (without Docker)** 🛠️💻

### 📌 **Prerequisites**
Before proceeding, make sure you have the following installed:
- **Docker & Docker Compose** (For option 1)
- **Python 3.9+ & Node.js 18+** (For option 2)

---

## 🐳 Option 1: Run with Docker (Recommended)
This method will spin up the **PostgreSQL database**, **Flask backend**, and **React frontend** automatically.

### 1️⃣ **Set Up Environment Variables**
Create a `.env` file in the **root directory** (`lab-micro-challeng/.env`) and add the following:

```ini
POSTGRES_HOST=db
POSTGRES_USER=example_user
POSTGRES_PASSWORD=example_password
POSTGRES_DB=example_database
```

### 2️⃣ **Build and Run the Containers**
Run the following command to build and start all services:
```sh
docker-compose up --build
```

💡 **The first run may take a few minutes!**

### 3️⃣ **Populate the Database** (Only if needed)
If the database is empty, it will be **automatically populated** with the data from `database_backup.sql`. If you need to manually trigger the population:
```sh
docker-compose exec backend python app.py --populate
```

### 4️⃣ **Access the Application**
- **Backend API** (Flask) → http://127.0.0.1:5002
- **Frontend App** (React) → http://127.0.0.1:5173

### 5️⃣ **Stop the Containers**
When you're done, stop everything with:
```sh
docker-compose down
```

---

## 🛠️ Option 2: Run Locally (Without Docker)
If you prefer running the app without Docker, follow these steps.

### 1️⃣ **Set Up PostgreSQL**
You need a **local PostgreSQL database** running.

- If you already have PostgreSQL installed, create the database:
  ```sh
  psql -U example_user -c "CREATE DATABASE example_database;"
  ```

### 2️⃣ **Set Up Environment Variables**
Create a `.env` file inside **backend/** (`lab-micro-challeng/backend/.env`) with:
```ini
DATABASE_URL=postgresql://example_user:example_password@localhost/example_database
```

### 3️⃣ **Run the Backend**
Navigate to the **backend** folder:
```sh
cd backend
```

📌 **Create a Virtual Environment** (Only needed once):
```sh
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate  # Windows
```

📌 **Install dependencies:**
```sh
pip install -r requirements.txt
```

📌 **Run the backend:**
```sh
python app.py
```

The Flask API will start at: **http://127.0.0.1:5002**

### 4️⃣ **Populate the Database** (Only if needed)
If the database is empty, you need to manually populate it:
```sh
python app.py --populate
```

### 5️⃣ **Run the Frontend**
Navigate to the **frontend** folder:
```sh
cd ../frontend
```

📌 **Install dependencies:**
```sh
npm install
```

📌 **Start the frontend app:**
```sh
npm run dev
```

The frontend will be available at: **http://127.0.0.1:5173**

---

## 🛠️ Development Workflow
### ✨ **Backend Development**
- **Run tests:**
  ```sh
  pytest
  ```
- **Linting & Formatting:**
  ```sh
  flake8
  black .
  ```

### ✨ **Frontend Development**
- **Run frontend in development mode:**
  ```sh
  npm run dev
  ```
- **Linting & Formatting:**
  ```sh
  npm run lint
  ```

---

## 📌 API Endpoints (Flask Backend)
### 📁 **Sets API**
- **Get all sets**: `GET /sets`
- **Get cards in a set**: `GET /sets/{set_id}/cards`

### 📁 **Cards API**
- **Get all cards**: `GET /cards`
- **Get card details**: `GET /cards/{card_id}`

---

## 🛑 Stopping the Application
### **With Docker:**
```sh
docker-compose down
```

### **Without Docker:**
1️⃣ **Stop the backend** → `CTRL+C`
2️⃣ **Stop the frontend** → `CTRL+C`
3️⃣ **Deactivate virtual environment** → `deactivate`

---

## 🎯 Contributors & License
This project is licensed under the **MIT License**.

👨‍💻 **Author:** [ismadot](https://github.com/ismadot)

---

🔥 Now you're ready to develop and test **Lab Micro Challenge**! 🚀 Happy coding! 🎉

