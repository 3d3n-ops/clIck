'use server'

interface GenerateResponse {
  code: string;
  explanation: string;
}

export async function generateCode(prompt: string): Promise<GenerateResponse> {
  try {
    const response = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating code:', error);
    throw new Error('Failed to generate code. Please try again.');
  }
}
