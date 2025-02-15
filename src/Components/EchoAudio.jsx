import React from "react";
import { useEffect, useRef } from "react";

function EchoAudio({ audioURL, isLoading, wordTimings, setHighlightedWordIndex }) {
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (!audioElement) return;

        const handleTimeUpdate = () => {
            const currentTime = audioElement.currentTime * 1000; // Convert seconds to ms

            // Find which word should be highlighted
            const currentWordIndex = wordTimings.findIndex(
                ({ start, end }) => currentTime >= start && currentTime <= end
            );

            console.log("Current Audio Time:", currentTime);
            console.log("Highlighted Word Index:", currentWordIndex);

            setHighlightedWordIndex(currentWordIndex !== -1 ? currentWordIndex : null);
        };

        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        return () => {
            audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [wordTimings]);

    return (
        <div className="mt-5">
            <h3 className="text-lg font-bold">Generated Echo Audio:</h3>
            {isLoading ? (
                <div className="flex justify-center items-center mt-1">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <audio ref={audioRef} controls src={audioURL} className="mt-2 w-full"></audio>
            )}
        </div>
    );
}

export default EchoAudio;
