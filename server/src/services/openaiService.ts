import OpenAI from 'openai';

// Validate API key exists
if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export async function getChatResponse(userMessage: string, history: { role: 'user' | 'assistant', content: string }[] = []): Promise<string> {
    try {
        console.log('📤 Sending request to GROQ API...');

        const messages = [
            {
                role: 'system',
                content: `You are FitCoach AI, a helpful and knowledgeable fitness assistant for FitMate. 
You provide advice on workouts, nutrition, training programs, and general fitness questions. 
Be friendly, encouraging, and provide actionable advice. Keep responses concise but informative.`
            },
            ...history.map(msg => ({
                role: msg.role,
                content: msg.content
            })),
            {
                role: 'user',
                content: userMessage,
            },
        ];

        const completion = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: messages as any,
            temperature: 0.7,
            max_tokens: 300,
        });
        console.log('✅ GROQ API Response received');

        return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error: any) {
        console.error('❌ GROQ API Error:', {
            message: error.message,
            status: error.status,
            type: error.type,
            error: error
        });
        throw new Error(`Failed to get response from AI: ${error.message}`);
    }
}
