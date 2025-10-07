# main.py (Corrected and Complete)

import os
import json
from enum import Enum
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from dotenv import load_dotenv  # Make sure this import is here
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# --- Configuration ---

# 1. Load environment variables from your .env file
load_dotenv()

# 2. Add the debugging print statement
api_key = os.getenv("GOOGLE_API_KEY")
# print(f"DEBUG: Loaded API Key from .env: {api_key}")

# 3. Configure the Gemini API with your key
# This section was missing from the code you pasted.
try:
    if not api_key:
        print("ERROR: GOOGLE_API_KEY not found in .env file.")
    genai.configure(api_key=api_key)
except Exception as e:
    print(f"ERROR: Could not configure Gemini API: {e}")


# --- Pydantic Models (These are correct) ---
class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class QuizRequest(BaseModel):
    topic: str = Field(..., example="The Solar System")
    num_questions: int = Field(5, gt=0, lt=11)
    difficulty: Difficulty = Field(Difficulty.MEDIUM)

class Question(BaseModel):
    question_text: str
    options: list[str]
    correct_answer: str

class QuizResponse(BaseModel):
    quiz: list[Question]


# --- FastAPI Application ---
app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_index():
    return FileResponse('index.html')

@app.post("/create-quiz/", response_model=QuizResponse, tags=["Quiz"])
async def create_quiz(request: QuizRequest):
    prompt = f"""
    You are an expert quiz creator. Your task is to generate a multiple-choice quiz.
    Topic: {request.topic}
    Number of Questions: {request.num_questions}
    Difficulty: {request.difficulty}
    Please generate the quiz in a valid JSON format with a "quiz" key containing a list of objects.
    Each object must have "question_text", "options" (a list of 4 strings), and "correct_answer".
    Do not include any other text or markdown formatting.
    """
    try:
        model = genai.GenerativeModel('gemini-flash-latest')
        response = model.generate_content(prompt)
        cleaned_response = response.text.strip().replace("```json", "").replace("```", "")
        quiz_data = json.loads(cleaned_response)
        if isinstance (quiz_data, list) :
            return {"quiz" : quiz_data}
        else:
            return quiz_data
    except Exception as e:
        # This will now give a more detailed error in your terminal
        print(f"ERROR during quiz generation: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred with the AI model: {str(e)}")