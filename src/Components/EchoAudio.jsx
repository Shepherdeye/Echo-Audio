import { useEffect, useRef } from "react";

function EchoAudio({ audioURL, isLoading, wordTimings, setHighlightedWordIndex }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current || !wordTimings.length) return;

        const updateHighlight = () => {
            const currentTime = audioRef.current.currentTime * 1000; // Convert seconds to ms
            let newIndex = null;

            for (let i = 0; i < wordTimings.length; i++) {
                if (currentTime >= wordTimings[i].start && currentTime < wordTimings[i].end) {
                    newIndex = i;
                    break;
                }
            }

            console.log("Current Audio Time:", currentTime, "Highlighted Index:", newIndex); // Debugging
            setHighlightedWordIndex(newIndex);
        };

        audioRef.current.addEventListener("timeupdate", updateHighlight);
        return () => audioRef.current.removeEventListener("timeupdate", updateHighlight);
    }, [wordTimings]);

    if (isLoading) {
        return (
            <div className="mt-5 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!audioURL) return null;

    return (
        <div className="mt-5">
            <h3 className="text-lg font-bold">Generated Echo Audio:</h3>
            <audio ref={audioRef} controls src={audioURL} className="mt-2 w-full custom-audio-player"></audio>
        </div>
    );
}

export default EchoAudio;
