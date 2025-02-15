function ErrorMessage({ message, onClose }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 rounded-lg">
            <div className="bg-red-500 w-full h-full text-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <p className="text-lg font-semibold">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-3 px-4 py-2 bg-white text-red-500 rounded-lg font-bold hover:bg-gray-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default ErrorMessage;
