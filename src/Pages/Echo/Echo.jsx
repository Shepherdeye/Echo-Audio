import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendToKateb, sendToNatiq, applyEchoEffect } from "../../utils/api";
import AudioInput from "../../Components/AudioInput";
import Processing from "../../Components/Processing";

function Echo() {
    const [audioFile, setAudioFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioLoading, setAudioLoading] = useState(false);
    const navigate = useNavigate(); // ✅ Navigation to Result Page

    // ✅ Function to handle full process: Transcribe → Apply Echo → Generate Speech
    const handleGenerateEcho = async () => {
        if (!audioFile) {
            alert("No audio file selected!");
            return;
        }

        setLoading(true);

        try {
            // 1️⃣ Transcribe Audio with Kateb
            const transcribedText = await sendToKateb(audioFile);
            if (!transcribedText) throw new Error("Transcription failed.");

            // 2️⃣ Apply Echo Effect
            const echoedText = applyEchoEffect(transcribedText);

            // 3️⃣ Send to Natiq for Speech Generation
            setAudioLoading(true);
            const { audioURL } = await sendToNatiq(echoedText);

            // ✅ Navigate to Result Page with Transcription & Generated Audio
            navigate("/result", {
                state: { transcribedText, generatedAudioURL: audioURL },
            });
        } catch (error) {
            alert("Something went wrong. Please try again.");
        }

        setLoading(false);
        setAudioLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl text-center">
                <h2 className="text-2xl font-bold mb-4">Record or Upload Audio</h2>

                {/* Audio Input */}
                <AudioInput onAudioSelected={setAudioFile} />

                {/* Generate Button */}
                {audioFile && (
                    <button
                        onClick={handleGenerateEcho}
                        className="mt-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
                        disabled={loading || audioLoading}
                    >
                        {loading ? "Processing..." : "Generate Echo"}
                    </button>
                )}

                {/* Processing Indicator */}
                {loading && <Processing />}
            </div>
        </div>
    );
}

export default Echo;
