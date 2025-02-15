function Transcription({ text, highlightedWordIndex, wordTimings }) {
    const words = text.split(" ");

    return (
        <div className="mt-5 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-3">Transcription:</h3>
            <p className="text-lg">
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={`px-1 ${index === highlightedWordIndex ? "bg-yellow-400 text-black font-bold" : ""
                            }`}
                    >
                        {word}{" "}
                    </span>
                ))}
            </p>
        </div>
    );
}

export default Transcription;
