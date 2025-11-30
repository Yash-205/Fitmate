import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(userMessage: string): Promise<string> {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Cheapest model
            messages: [
                {
                    role: 'system',
                    content: `You are FitCoach AI, a helpful and knowledgeable fitness assistant for FitMate. 
You provide advice on workouts, nutrition, training programs, and general fitness questions. 
Be friendly, encouraging, and provide actionable advice. Keep responses concise but informative.
When relevant, mention FitMate's programs: Weight Loss ($79/month), Muscle Building ($129/month), 
and Athletic Performance ($199/month).`,
                },
                {
                    role: 'user',
                    content: userMessage,
                },
            ],
            temperature: 0.7,
            max_tokens: 300, // Keep responses concise
        });

        return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw new Error('Failed to get response from AI');
    }
}
