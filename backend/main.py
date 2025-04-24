import fastapi
import anthropic
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

# Load environment variables
load_dotenv()

app = fastapi.FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/generate")
def generate(request: PromptRequest):
    # Get API key from environment variable
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        logging.error("ANTHROPIC_API_KEY environment variable is not set")
        return {
            "code": "",
            "explanation": "Error: ANTHROPIC_API_KEY environment variable is not set"
        }

    try:
        logging.info(f"Starting code generation for prompt: {request.prompt[:100]}...")
        client = anthropic.Anthropic(api_key=api_key)
        
        # Create a system message to guide Claude's response format
        system_message = """You are an expert mobile app developer. When given a prompt, respond with a well-formatted response that includes:

1. A code implementation in the requested language/framework, formatted in markdown code blocks with proper syntax highlighting
2. A clear explanation of the code with markdown formatting for better readability
3. Two to three thoughtful questions about potential improvements, asking for permission before suggesting them

Format your response as follows:

```language
// Your code here
// Use proper syntax highlighting based on the language
// Include comments for clarity
```

**Explanation:**
- Use markdown formatting for better readability
- Break down the code into logical sections
- Explain key concepts and design decisions
- Use bullet points or numbered lists where appropriate

**Would you like me to suggest some improvements to enhance your app?** Here are a few ideas:
1. [First improvement suggestion]
2. [Second improvement suggestion]
3. [Third improvement suggestion]

Please let me know if you'd like me to implement any of these improvements!"""
        
        logging.info("Sending request to Claude API...")
        start_time = datetime.now()
        
        response = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            temperature=0.7,
            system=system_message,
            messages=[
                {
                    "role": "user",
                    "content": request.prompt
                }
            ]
        )
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        logging.info(f"Received response from Claude API in {duration:.2f} seconds")
        
        # Parse the response to separate code and explanation
        response_text = response.content[0].text
        logging.info("Processing response...")
        
        code_section = ""
        explanation_section = ""
        
        if "```" in response_text:
            # Extract code block
            code_start = response_text.find("```")
            code_end = response_text.find("```", code_start + 3)
            if code_start != -1 and code_end != -1:
                code_section = response_text[code_start:code_end + 3].strip()
                logging.info("Code section extracted successfully")
            
            # Extract explanation
            explanation_start = response_text.find("**Explanation:**")
            if explanation_start != -1:
                explanation_section = response_text[explanation_start:].strip()
                logging.info("Explanation section extracted successfully")
        else:
            logging.warning("No code block found in response")
            code_section = ""
            explanation_section = response_text
        
        logging.info("Generation completed successfully")
        return {
            "code": code_section,
            "explanation": explanation_section
        }
    except Exception as e:
        logging.error(f"Error in generate endpoint: {str(e)}", exc_info=True)
        return {
            "code": "",
            "explanation": f"Error generating response: {str(e)}"
        }