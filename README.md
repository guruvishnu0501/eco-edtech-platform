## 🎯 Challenge Vertical & Persona
**Chosen Vertical:** Physical Event Experience
**Target Persona:** An attendee at a physical conference, workshop, or educational bootcamp who needs dynamic, real-time reinforcement of the physical sessions they attend, while minimizing physical waste (printed materials).

## 🧠 Approach and Logic
The core problem at physical events is the reliance on wasteful printed handouts or generic digital recaps that don't match the attendee's specific learning gaps. My approach solves this by using **Agentic AI (Google Gemini)** to create a smart, dynamic "Event Assistant" that makes logical decisions based on the attendee's context.

When an attendee walks out of a live session and inputs the topic, the AI logic determines the optimal path:
1. **Context Gathering:** It generates a lightweight, dynamic quiz to assess what the attendee actually retained from the physical presentation.
2. **Targeted Generation:** Instead of the user taking home heavy printed packets, the AI generates a highly targeted, text-based (Markdown) digital takeaway tailored to their weak points.
3. **Eco-Optimization:** By utilizing a "Low-Bandwidth Mode," the system actively minimizes payload size. This solves a critical, real-world usability problem: it ensures the app works flawlessly even on notoriously congested physical event Wi-Fi networks.

## ⚙️ How the Solution Works
1. **Frontend (React):** Captures attendee context (session topic) while they are navigating the event floor.
2. **Backend Engine (FastAPI):** Orchestrates the logic, formatting the event context into structured prompts for the AI.
3. **Google Services Integration:** The backend securely calls the **Google Gemini API** (`google-genai`), instructing the model to generate structured, educational JSON data (knowledge checks) or Markdown (session recaps).
4. **Data Layer (Firebase):** The system tracks attendee progress and awards "Eco-points" on an event-wide leaderboard for engaging with digital, low-bandwidth materials rather than physical waste.

## 📝 Assumptions Made
* **Event Connectivity:** Assumes the physical event venue will have heavily congested Wi-Fi, making the strict adherence to low-bandwidth, text-based generation a necessity.
* **AI Formatting:** Assumes the Gemini AI will consistently return structured JSON for quizzes; error-handling is implemented to manage malformed responses during live event usage.
* **Scope:** Assumes the tool is used immediately following physical sessions to reinforce live learning, rather than as a standalone pre-study tool.

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

