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

        // ... existing code ...
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

export async function generateWorkoutPlan(userProfile: any, userFeedback?: string, currentPlan?: any): Promise<any> {
    try {
        console.log('📤 Sending workout generation request to GROQ API...');

        let prompt = `
            Create a personalized 1-week workout plan for a user with the following profile:
            - Name: ${userProfile.name}
            - Goal: ${userProfile.goal || 'General Fitness'}
            - Experience Level: ${userProfile.experience || 'Beginner'}
            - Days available: ${userProfile.daysAvailable || 'Mon, Wed, Fri'}
            - Equipment: ${userProfile.equipment || 'Standard Gym'}
        `;

        if (userFeedback && currentPlan) {
            prompt += `
            
            The user currently has this plan:
            ${JSON.stringify(currentPlan)}
            
            They want to EDIT this plan with the following feedback:
            "${userFeedback}"
            
            Please modify the plan according to the feedback while keeping the rest of the structure similar where appropriate.
            `;
        }

        prompt += `
            Return ONLY a valid JSON object with the following structure (no markdown, no extra text):
            {
                "schedule": [
                    {
                        "day": "Monday",
                        "focus": "Legs & Core",
                        "exercises": [
                            { "name": "Squats", "sets": "3", "reps": "12", "notes": "Keep straight back" }
                        ]
                    }
                ]
            }
        `;

        const completion = await openai.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert fitness coach. You generate structured JSON workout plans.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content || '{}';
        return JSON.parse(content);

    } catch (error: any) {
        console.error('❌ Workout Generation Error:', error);
        throw new Error(`Failed to generate workout plan: ${error.message}`);
    }
}
