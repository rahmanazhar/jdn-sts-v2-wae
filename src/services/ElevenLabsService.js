import { ElevenLabsClient } from "elevenlabs";

const ELEVENLABS_API_KEY = 'sk_f34a70fc2e48b53b126d4a6a853808a706f87f177f1b9572';

if (!ELEVENLABS_API_KEY) {
    throw new Error("Missing ELEVENLABS_API_KEY in environment variables");
}

const client = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});

class ElevenLabsService {
    static async createAudioStreamFromText(text) {
        const audioStream = await client.generate({
            voice_id: "djUbJhnXETnX31p3rgun",
            model_id: "eleven_multilingual_v2",
            stability: 1,
            similarity_boost: 1,
            text,
        });

        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }

        return Buffer.concat(chunks);
    }
}

export default ElevenLabsService;
