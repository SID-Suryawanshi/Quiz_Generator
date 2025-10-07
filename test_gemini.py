# test_gemini.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

try:
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in .env file")

    genai.configure(api_key=api_key)

    print("Successfully configured API key.")
    print("-" * 20)
    print("Available Models:")

    # This will list every model your key has access to
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)

    print("-" * 20)
    print("Testing generation with 'gemini-1.5-flash-latest'...")

    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    response = model.generate_content("Hello, world!")
    print("SUCCESS! Model generated a response.")

except Exception as e:
    print(f"\n--- AN ERROR OCCURRED ---")
    print(e)