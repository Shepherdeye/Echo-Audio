

import "./Processing.css"

function Processing() {
    return (
        <div className="absolute inset-0 flex min-h-[60vh] items-center justify-center bg-gray-800 bg-opacity-75 rounded-lg">
            <div className="loader">
                <div className="justify-content-center jimu-primary-loading"></div>
            </div>
        </div>
    );
}

export default Processing;
