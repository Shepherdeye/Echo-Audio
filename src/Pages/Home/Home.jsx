function Home() {
    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold">Welcome to Echo</h1>
            <p className="mt-3 text-gray-300">Convert Arabic speech to text and replay it with an electronic voice.</p>
            <a href="/echo">
                <button className="pointer-event  mt-5 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                    Try Echo
                </button>
            </a>
        </div>
    );
}

export default Home;
