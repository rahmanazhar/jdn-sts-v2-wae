import OpenAI from 'openai';

class MesoliticaService {
    constructor() {
        this.client = new OpenAI({
            baseURL: 'https://api.mesolitica.com',
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndlYXJlZWR0QGdtYWlsLmNvbSIsInV1aWQiOiIwNmRmYmY3My1mMjIzLTQ1MDgtYTY5OC1kMTExMWM2YTI4YjEifQ.Iz5z2MaI9SI7w8KaNzBEzTZ3HizmZT8jNHBecCh9Mdc',
            dangerouslyAllowBrowser: true,
        });
    }

    async transcribeAudioStream(audioBlob) {
        try {
            // Create a new File object from the blob
            const audioFile = new File([audioBlob], 'audio.webm', {
                type: 'audio/webm;codecs=opus',
                lastModified: new Date().getTime()
            });

            // Create form data
            const formData = new FormData();
            formData.append('file', audioFile);
            formData.append('model', 'base');
            formData.append('language', 'ms');

            // Use fetch API for more control over the request
            const response = await fetch('https://api.mesolitica.com/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.client.apiKey}`,
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`API error: ${response.status} - ${errorData}`);
            }

            const data = await response.json();

            console.log('Transcription result:', data);
            return data;
        } catch (error) {
            console.error('Transcription error:', error);
            throw error;
        }
    }
}

export default new MesoliticaService();
