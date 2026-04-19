# 🌿 The Atelier: AI-Powered Eco-EdTech Platform

A full-stack, AI-driven educational platform designed to generate personalized study plans and dynamic quizzes while promoting digital sustainability through a gamified, real-time leaderboard.

**[🚀 View Live Demo](https://eco-edtech-frontend.vercel.app/)** *(<- Replace the # with your actual Vercel URL!)*

## ✨ Key Features

* **🧠 Dynamic AI Assessments:** Leverages Google's Gemini AI to generate customized multiple-choice quizzes based on user-selected topics.
* **📚 Personalized Study Plans:** Analyzes quiz performance to instantly generate targeted, markdown-formatted study guides.
* **🏆 Real-Time Eco-Leaderboard:** Gamifies learning by awarding "Eco-Points" for completed sessions, synced globally in under a second using Firebase Firestore.
* **🔋 Low-Bandwidth Mode:** An eco-friendly toggle that instructs the AI to generate text-heavy, low-resource study materials to save energy and data.
* **🔐 Secure Authentication:** Full user login and registration system powered by Firebase Auth.
* **💾 Course Library:** Automatically saves generated study plans to a personal dashboard for future review.
* **🌙 Dark Mode UI:** A sleek, responsive, and energy-efficient user interface built with React and Tailwind CSS.

## 🛠️ Technology Stack

**Frontend**
* **React.js** (Single Page Application)
* **Tailwind CSS** (Styling & Layout)
* **React Markdown** (Formatting AI responses)
* **Deployed on:** Vercel

**Backend**
* **Python 3 & FastAPI** (Asynchronous API routing)
* **Uvicorn** (ASGI Web Server)
* **Deployed on:** Render

**Artificial Intelligence**
* **Google Gemini API** (via `google-genai` SDK)

**Database & Cloud Services**
* **Firebase Authentication** (Identity management)
* **Firebase Firestore** (Real-time NoSQL database)

## 🚀 Running the Project Locally

### Prerequisites
* Node.js and npm installed
* Python 3 installed
* A Google Gemini API Key
* A Firebase Project with Authentication and Firestore enabled

### 1. Clone the Repository
```
git clone [https://github.com/YOUR_USERNAME/eco-edtech-platform.git](https://github.com/YOUR_USERNAME/eco-edtech-platform.git)
cd eco-edtech-platform
```

### 2. Backend Setup
```
# Install Python dependencies
pip install -r requirements.txt

# Create a .env file in the root directory and add your API key:
# GEMINI_API_KEY="your_actual_api_key_here"

# Start the FastAPI server
uvicorn main:app --reload
```
## The API will be available at http://localhost:8000

### 3. Frontend Setup
```
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the React development server
npm start
```

## The app will be available at http://localhost:3000

### 📁 Project Structure
/ - Root directory containing the FastAPI backend (main.py) and Python environment requirements.

/frontend - Contains the React application, Tailwind configuration, and Firebase client SDK setup.

### 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

