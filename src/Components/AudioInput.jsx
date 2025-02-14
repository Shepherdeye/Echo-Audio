import { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import { MdFiberManualRecord } from "react-icons/md";
import { FaStop } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { RxResume } from "react-icons/rx";
import { VscDebugRestart } from "react-icons/vsc";


function AudioInput({ onAudioSelected }) {
    const [recording, setRecording] = useState(false);
    const [paused, setPaused] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const recorderRef = useRef(null);
    const streamRef = useRef(null);

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
    };

    // ✅ Pause Recording
    const pauseRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.pauseRecording();
            setPaused(true);
        }
    };

    // ✅ Resume Recording
    const resumeRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.resumeRecording();
            setPaused(false);
        }
    };

    // ✅ Stop & Save Recording
    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                const blob = recorderRef.current.getBlob();
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
                onAudioSelected(blob); // Pass audio to parent component
            });
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }

        setRecording(false);
        setPaused(false);
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
        <div className="text-center">
            <h3 className="text-lg font-bold mb-3">Select or Record Audio</h3>
            <input type="file" accept="audio/*" onChange={handleFileUpload} className="mb-3 p-2 bg-gray-800 text-white rounded-lg" />

            {!recording ? (
                <button className="px-6 py-3 bg-green-500 text-white rounded-lg" onClick={startRecording}>
                    <MdFiberManualRecord />

                </button>
            ) : (
                <>
                    {!paused ? (
                        <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg mx-2" onClick={pauseRecording}>
                            <FaPause />
                        </button>
                    ) : (
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg mx-2" onClick={resumeRecording}>
                            <RxResume />
                        </button>
                    )}
                    <button className="px-6 py-3 bg-red-500 text-white rounded-lg mx-2" onClick={stopRecording}>
                        <FaStop />
                    </button>
                    <button className="px-6 py-3 bg-gray-500 text-white rounded-lg mx-2" onClick={restartRecording}>
                        <VscDebugRestart />
                    </button>
                </>
            )}

            {audioURL && (
                <div className="mt-5">
                    <h3 className="text-lg font-bold">Audio Preview:</h3>
                    <audio controls src={audioURL} className="mt-2 w-full"></audio>
                </div>
            )}
        </div>
    );
}

export default AudioInput;
