import { useState, useEffect } from "react";

function Transcription({ text, wordTimings, audioRef }) {
    const [highlightedWordIndex, setHighlightedWordIndex] = useState(null);

    useEffect(() => {
        if (!audioRef?.current || !wordTimings?.length) return;

        const updateHighlight = () => {
            const currentTime = audioRef.current.currentTime * 1000; // Convert to milliseconds
            const index = wordTimings.findIndex(
                ({ start, end }) => currentTime >= start && currentTime <= end
            );
            setHighlightedWordIndex(index !== -1 ? index : null);
        };

        //  Ensure the event listener is added only when `audioRef.current` is available
        const audioElement = audioRef.current;
        audioElement.addEventListener("timeupdate", updateHighlight);

        return () => {
            //  Check if `audioElement` still exists before removing listener
            if (audioElement) {
                audioElement.removeEventListener("timeupdate", updateHighlight);
            }
        };
    }, [audioRef, wordTimings]);

    return (
        <div className="p-1 bg-gray-500 rounded-lg text-white text-lg leading-loose mb-3 text-center">
            {text.split(" ").map((word, index) => (
                <span
                    key={index}
                    className={`mx-1 transition-all duration-200 ${index === highlightedWordIndex ? "bg-yellow-400 text-black p-2 rounded" : ""
                        }`}
                >
                    {word}{" "}
                </span>
            ))}
        </div>
    );
}

export default Transcription;
