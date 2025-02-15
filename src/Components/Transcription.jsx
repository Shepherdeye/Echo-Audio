import React from "react";

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

        const audioElement = audioRef.current;
        audioElement.addEventListener("timeupdate", updateHighlight);
        return () => {
            if (audioElement) {
                audioElement.removeEventListener("timeupdate", updateHighlight);
            }
        };
    }, [audioRef, wordTimings]);

    return (
        <div data-testid="transcription-container" className="p-4 bg-gray-800 rounded-lg text-white text-lg leading-loose">
            {text.split(" ").map((word, index) => (
                <span
                    key={index}
                    className={`mx-1 transition-all duration-200 ${index === highlightedWordIndex ? "bg-yellow-400 text-black px-1 rounded" : ""}`}
                >
                    {`${word} `}
                </span>
            ))}
        </div>
    );
}

export default Transcription;
