import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Transcription from "../Components/Transcription";

function ResultPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { transcribedText, generatedAudioURL, wordTimings } = location.state || {};
    const audioRef = useRef(null);
    useEffect(() => {
        console.log("Received Data in ResultPage:", { transcribedText, generatedAudioURL, wordTimings });

        //  Redirect to /echo if no valid data is passed
        if (!transcribedText || !generatedAudioURL) {
            console.warn("No data found, redirecting to Echo page...");
            navigate("/echo", { replace: true });
        }
    }, [transcribedText, generatedAudioURL, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-4">Generated Echo Result</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">

                {transcribedText && (
                    <Transcription
                        text={transcribedText}
                        wordTimings={wordTimings}
                        audioRef={audioRef}
                    />
                )}

                {generatedAudioURL && (
                    <audio
                        ref={audioRef}
                        controls
                        src={generatedAudioURL}
                        className="w-full bg-gray-700 p-2 rounded-lg">
                    </audio>
                )}

                <button
                    onClick={() => navigate("/echo")}
                    className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
                >
                    Record / Upload Again
                </button>
            </div>
        </div>
    );
}

export default ResultPage;
