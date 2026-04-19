import os
import json
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="EdTech Platform API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini client
# The google-genai SDK uses the GEMINI_API_KEY env var by default if not passed explicitly
api_key = os.getenv("GEMINI_API_KEY")
print(f"DEBUG: My API key starts with -> {str(api_key)[:10]}") # ADD THIS LINE
if not api_key:
    # Just a warning or placeholder if it's not set
    pass

client = genai.Client()

class StudyPlanRequest(BaseModel):
    quiz_score: int
    topic: str
    low_bandwidth: bool = False

class StudyPlanResponse(BaseModel):
    study_plan: str

@app.post("/generate-study-plan", response_model=StudyPlanResponse)
async def generate_study_plan(request: StudyPlanRequest):
    try:
        # Construct the prompt based on user inputs
        prompt = (
            f"You are an expert tutor for an EdTech platform. "
            f"The user has scored {request.quiz_score}% on a recent quiz about '{request.topic}'. "
            f"Based on this score and topic, create a short, personalized study plan "
            f"to help them improve or reinforce their knowledge. Make it concise and practical."
        )

        if request.low_bandwidth:
            prompt += " The user is in low-bandwidth mode. Provide a text-heavy study plan and do not suggest high-resolution video links or heavy external assets."
        
        # Generate content using the new google-genai SDK
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        
        return StudyPlanResponse(study_plan=response.text)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate study plan: {str(e)}")

class QuizRequest(BaseModel):
    topic: str

@app.post("/generate-quiz")
async def generate_quiz(request: QuizRequest):
    try:
        prompt = (
            f"Generate exactly 5 multiple-choice questions about '{request.topic}'. "
            "Return the output STRICTLY as a raw JSON array. "
            "Each object in the array must have the following keys: "
            "'question_text' (string), 'options' (array of exactly 4 strings), "
            "and 'correct_answer' (integer index from 0 to 3 representing the correct option). "
            "Do not include any other text, markdown formatting, or explanations."
        )
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        
        raw_text = response.text.strip()
        # Clean up markdown code blocks if the model ignores the strict instruction
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        elif raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
            
        questions = json.loads(raw_text.strip())
        return {"questions": questions}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")
