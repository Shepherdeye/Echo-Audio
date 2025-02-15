import React from "react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Transcription from "../Components/Transcription"; // Adjust path if needed

describe("Transcription Component", () => {
    it("renders the transcription text", () => {
        const testText = "This is a test transcription";
        const dummyAudioRef = {
            current: {
                currentTime: 0,
                addEventListener: () => { },
                removeEventListener: () => { },
            },
        };

        render(
            <Transcription
                text={testText}
                wordTimings={[]}
                audioRef={dummyAudioRef}
            />
        );
        // Get the combined text from the container
        const container = screen.getByTestId("transcription-container");
        expect(container.textContent).toMatch(/test transcription/i);
    });
});
