import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendToKateb, sendToNatiq, applyEchoEffect } from "../../utils/api";
import AudioInput from "../../Components/AudioInput";
import Processing from "../../Components/Processing";
import ErrorMessage from "../../Components/ErrorMessage"; // Import Error Component

function Echo() {
    const [audioFile, setAudioFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const [error, setError] = useState(null); // 🔴 Track errors

    const navigate = useNavigate();

    const handleGenerateEcho = async () => {
        if (!audioFile) {
            setError("No audio file selected!");
            return;
        }

        setLoading(true);
        setError(null); // Reset error when retrying

        try {
            const transcribedText = await sendToKateb(audioFile);
            if (!transcribedText) throw new Error("Transcription failed.");

            const echoedText = applyEchoEffect(transcribedText);

            setAudioLoading(true);
            const { audioURL, wordTimings } = await sendToNatiq(echoedText);

            navigate("/result", {
                state: { transcribedText, generatedAudioURL: audioURL, wordTimings },
            });
        } catch (error) {
            setError(error.message || "Something went wrong. Please try again.");
        }

        setLoading(false);
        setAudioLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-900 text-white p-6">
            <div className="relative w-full max-w-2xl">
                <AudioInput onAudioSelected={setAudioFile} />
                {loading && <Processing />}
                {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
            </div>

            {audioFile && (
                <button
                    onClick={handleGenerateEcho}
                    className="mt-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
                    disabled={loading || audioLoading}
                >
                    {loading ? "Processing..." : "Generate Echo"}
                </button>
            )}
        </div>
    );
}

export default Echo;
