import React from "react";
import { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import { MdFiberManualRecord } from "react-icons/md";
import { FaStop, FaPause, FaUpload } from "react-icons/fa";
import { RxResume } from "react-icons/rx";
import { VscDebugRestart } from "react-icons/vsc";

function AudioInput({ onAudioSelected }) {
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [audioURL, setAudioURL] = useState(null);
    const recorderRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);

    // ✅ Format Time (mm:ss)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // ✅ Start Recording
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const recorder = new RecordRTC(stream, {
            type: "audio",
            mimeType: "audio/wav",
            recorderType: RecordRTC.StereoAudioRecorder,
            numberOfAudioChannels: 1,
        });

        recorder.startRecording();
        recorderRef.current = recorder;
        setRecording(true);
        setPaused(false);
        setRecordTime(0); // Reset timer

        // ✅ Start Timer
        intervalRef.current = setInterval(() => {
            setRecordTime((prev) => prev + 1);
        }, 1000);
    };

    // ✅ Pause Recording (Timer Continues)
    const pauseRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.pauseRecording();
            setPaused(true);
            clearInterval(intervalRef.current); // Stop timer while paused
        }
    };

    // ✅ Resume Recording
    const resumeRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.resumeRecording();
            setPaused(false);

            // ✅ Resume Timer
            intervalRef.current = setInterval(() => {
                setRecordTime((prev) => prev + 1);
            }, 1000);
        }
    };

    // ✅ Stop & Save Recording
    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                const blob = recorderRef.current.getBlob();
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
                onAudioSelected(blob);
            });
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }

        setRecording(false);
        setPaused(false);
        clearInterval(intervalRef.current); // Stop timer
    };

    // ✅ Restart Recording
    const restartRecording = () => {
        stopRecording();
        setAudioURL(null);
        startRecording();
    };

    // ✅ Handle File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAudioURL(URL.createObjectURL(file));
            onAudioSelected(file);
        }
    };

    return (
        <div className="text-center bg-gray-800 p-5 rounded-xl shadow-lg  mx-auto">
            <h3 className="text-lg font-bold mb-3 text-white">Record or Upload Audio</h3>

            {/* 🎙️ Recording Timer */}
            {recording && (
                <div className="text-red-500 text-lg font-bold mb-2 animate-pulse">
                    Recording... {formatTime(recordTime)}
                </div>
            )}

            {/* 🎙️ Recording Controls */}
            <div className="flex justify-center gap-3">
                {!recording ? (
                    <button className="px-6 py-3 bg-green-500 text-white rounded-lg" onClick={startRecording}>
                        <MdFiberManualRecord size={24} />
                    </button>
                ) : (
                    <>
                        {!paused ? (
                            <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg" onClick={pauseRecording}>
                                <FaPause size={20} />
                            </button>
                        ) : (
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg" onClick={resumeRecording}>
                                <RxResume size={20} />
                            </button>
                        )}
                        <button className="px-6 py-3 bg-red-500 text-white rounded-lg" onClick={stopRecording}>
                            <FaStop size={20} />
                        </button>
                        <button className="px-6 py-3 bg-gray-500 text-white rounded-lg" onClick={restartRecording}>
                            <VscDebugRestart size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* 📂 File Upload (Disabled While Recording) */}
            {!recording && (
                <div className="mt-4">
                    <label className="block text-white font-bold mb-2">Upload an Audio File:</label>
                    <label className="flex items-center justify-center cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                        <FaUpload className="mr-2" /> Choose File
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={recording} // ✅ Prevent file upload while recording
                        />
                    </label>
                </div>
            )}

            {/* 🎵 Audio Preview */}
            {audioURL && (
                <div className="mt-5">
                    <h3 className="text-lg font-bold text-white">Audio Preview:</h3>
                    <audio controls src={audioURL} className="mt-2 w-full bg-gray-800 p-2 rounded-lg"></audio>
                </div>
            )}
        </div>
    );
}

export default AudioInput;
