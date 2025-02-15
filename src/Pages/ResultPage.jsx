// ResultPage.jsx - Displays the Transcription & Generated Voice
import { useNavigate, useLocation } from "react-router-dom";

function ResultPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { transcribedText, generatedAudioURL } = location.state || {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Generated Echo Result</h2>
                {transcribedText ? (
                    <p className="bg-gray-700 p-4 rounded text-lg mb-4">{transcribedText}</p>
                ) : (
                    <p className="text-red-500">No transcription available.</p>
                )}
                {generatedAudioURL ? (
                    <audio controls src={generatedAudioURL} className="w-full bg-gray-700 p-2 rounded-lg"></audio>
                ) : (
                    <p className="text-red-500 mt-2">No generated voice available.</p>
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
