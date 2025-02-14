import { useState } from "react";
import { sendToKateb, sendToNatiq, applyEchoEffect } from "../../utils/api";
import AudioInput from "../../Components/AudioInput";
import Transcription from "../../Components/Transcription";
import EchoAudio from "../../Components/EchoAudio";
import Processing from "../../Components/processing";

function Echo() {
    const [audioFile, setAudioFile] = useState(null);
    const [transcribedText, setTranscribedText] = useState("");
    const [generatedAudioURL, setGeneratedAudioURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const [highlightedWordIndex, setHighlightedWordIndex] = useState(null);
    const [wordTimings, setWordTimings] = useState([]);

    // ✅ Function to handle full process: Transcribe → Apply Echo → Generate Speech
    const handleGenerateEcho = async () => {
        if (!audioFile) {
            alert("No audio file selected!");
            return;
        }

        setLoading(true);
        setGeneratedAudioURL(null);

        try {
            // 1️⃣ Transcribe Audio with Kateb
            const transcribedText = await sendToKateb(audioFile);
            if (!transcribedText) throw new Error("Transcription failed.");

            setTranscribedText(transcribedText);

            // Apply Echo Effect
            const echoedText = applyEchoEffect(transcribedText);

            // Send to Natiq for Speech Generation
            setAudioLoading(true);
            const { audioURL, wordTimings } = await sendToNatiq(echoedText);
            setGeneratedAudioURL(audioURL);
            setWordTimings(wordTimings);
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }

        setLoading(false);
        setAudioLoading(false);
    };

    return (
        <div className="text-center mt-10">
            {loading && <Processing />}

            <AudioInput onAudioSelected={setAudioFile} />

            {transcribedText && (
                <Transcription
                    text={transcribedText}
                    highlightedWordIndex={highlightedWordIndex}
                    wordTimings={wordTimings}
                />
            )}

            {audioFile && (
                <button
                    onClick={handleGenerateEcho}
                    className="mt-3 px-6 py-3 bg-blue-500 text-white rounded-lg"
                    disabled={loading || audioLoading}
                >
                    {loading ? "Processing..." : "Generate Echo"}
                </button>
            )}

            <EchoAudio
                audioURL={generatedAudioURL}
                isLoading={audioLoading}
                wordTimings={wordTimings}
                setHighlightedWordIndex={setHighlightedWordIndex}
            />
        </div>
    );
}

export default Echo;
