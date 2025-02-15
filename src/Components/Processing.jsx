
import React from "react";

function Processing() {
    return (
        <div style={{ zIndex: 999 }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
}

export default Processing;
