function Transcription({ text, highlightedWordIndex, wordTimings }) {
    if (!text) return null;

    const words = text.split(" ").map((word, index) => ({
        text: word,
        isHighlighted: wordTimings[index] && index === highlightedWordIndex,
    }));

    return (
        <div className="mt-5">
            <h3 className="text-lg font-bold">Transcribed Text:</h3>
            <p className="mt-2 bg-gray-800 p-3 rounded-lg text-white text-right" style={{ unicodeBidi: "plaintext" }}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={`mr-1 ${word.isHighlighted ? "bg-yellow-500 p-2 text-black font-bold px-1" : ""}`}
                    >
                        {word.text} {" "}
                    </span>
                ))}
            </p>
        </div>
    );
}

export default Transcription;
