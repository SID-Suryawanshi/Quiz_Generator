# AI-Powered Quiz Generator 🧠

![Python](https://img.shields.io/badge/Python-3.11+-blue?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111.0-green?style=for-the-badge&logo=fastapi)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)

An interactive quiz generator powered by Google's Gemini AI. This full-stack project features a robust Python backend built with FastAPI that communicates with the Gemini API to create custom quizzes on any subject. The user-friendly frontend allows users to receive a unique, AI-generated quiz in real-time.



## ✨ Features

- **Dynamic Quiz Generation**: Creates unique quizzes on any topic using the Google Gemini AI.
- **Customizable Quizzes**: Allows users to specify the topic, number of questions, and difficulty level.
- **Interactive Frontend**: A clean and simple single-page application built with vanilla HTML, CSS, and JavaScript.
- **RESTful API**: A high-performance backend powered by FastAPI.
- **Interactive Scoring**: Users can answer questions and receive their score instantly.

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, Uvicorn
- **AI Model**: Google Gemini API (`google-generativeai`)
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Dependencies**: `python-dotenv` for managing environment variables.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Python 3.7+
- A Google Gemini API Key. You can get one from [Google AI Studio](https://makersuite.google.com/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SID-Suryawanshi/Quiz_Generator.git](https://github.com/SID-Suryawanshi/Quiz_Generator.git)
    cd Quiz_Generator
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your environment variables:**
    - Create a new file in the root directory named `.env`.
    - Add your Google Gemini API key to this file:
      ```
      GOOGLE_API_KEY="YOUR_API_KEY_HERE"
      ```

### Running the Application

1.  **Start the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```

2.  **Open your browser** and navigate to `http://127.0.0.1:8000`. You should see the quiz generator interface.

## 💡 Usage

1.  Enter the **Topic** you want a quiz on.
2.  Select the **Number of Questions** (1-10).
3.  Choose a **Difficulty** level from the dropdown.
4.  Click the **"Generate Quiz"** button.
5.  Answer the questions and click **"Submit Answers"** to see your score.

## 📄 API Endpoint

The project exposes one main API endpoint for creating quizzes.

| Method | Endpoint         | Description                                        |
|--------|------------------|----------------------------------------------------|
| `POST` | `/create-quiz/`  | Generates a new quiz based on the request body.    |

You can interact with the API directly via the auto-generated documentation at `http://127.0.0.1:8000/docs`.
