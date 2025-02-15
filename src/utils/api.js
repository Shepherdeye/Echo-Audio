import axios from "axios";

//Function to send recorded/uploaded audio to Kateb for transcription
export const sendToKateb = async (audioFile) => {
    if (!audioFile) {
        alert("No audio file selected!");
        return "";
    }

    const formData = new FormData();
    formData.append("file", audioFile, "audio.wav");

    try {
        const response = await axios.post(
            "https://echo-6sdzv54itq-uc.a.run.app/kateb",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        const words = response.data?.json?.words || [];
        const text = words.map(word => word.text).join(" ");

        return text; // Return transcribed text instead of modifying state

    } catch (error) {
        console.error("Error in Kateb:", error);
        // alert("Failed to transcribe audio. Try again!");
        return "";
    }
};

// Function to send text to Natiq for voice generation
export const sendToNatiq = async (text) => {
    if (!text.trim()) return { audioURL: null, wordTimings: [] };

    try {
        const response = await axios.post(
            "https://echo-6sdzv54itq-uc.a.run.app/natiq",
            { text },
            { headers: { "Content-Type": "application/json" } }
        );

        const audioData = response.data?.wave;
        const durations = response.data?.durations || [];

        if (!audioData) return { audioURL: null, wordTimings: [] };

        // Convert base64 to Blob URL
        const normalBase64 = audioData.replace(/-/g, "+").replace(/_/g, "/");
        const audioBlob = new Blob([Uint8Array.from(atob(normalBase64), c => c.charCodeAt(0))], { type: "audio/wav" });
        const audioURL = URL.createObjectURL(audioBlob);

        // Convert durations to milliseconds
        const wordTimings = durations.map(([word, start, end]) => ({
            text: word,
            start: start * 1000,
            end: end * 1000
        }));

        return { audioURL, wordTimings };
    } catch (error) {
        console.error("Error in Natiq:", error);
        // alert("Failed to generate speech. Try again!");
        return { audioURL: null, wordTimings: [] };
    }
};

// Function to apply echo effect (Repeat last word 3 times)
export const applyEchoEffect = (text) => {
    if (!text.trim()) return text;
    const words = text.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    return `${text} ${lastWord} ${lastWord} ${lastWord}`;
};
