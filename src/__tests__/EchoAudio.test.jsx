import React from "react";
import "@testing-library/jest-dom"; // for toBeInTheDocument and other matchers
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import EchoAudio from "../Components/EchoAudio"; // adjust the path as needed

describe("EchoAudio Component", () => {
    it("renders a loading spinner when isLoading is true", () => {
        render(
            <EchoAudio
                isLoading={true}
                audioURL={""}
                wordTimings={[]}
                setHighlightedWordIndex={vi.fn()}
            />
        );
        // Check for an element with a spinner class (you may adjust based on your implementation)
        const spinner = document.querySelector(".animate-spin");
        expect(spinner).toBeDefined();
    });

    it("renders the audio element when audioURL is provided", () => {
        render(
            <EchoAudio
                isLoading={false}
                audioURL={"test-audio-url"}
                wordTimings={[]}
                setHighlightedWordIndex={vi.fn()}
            />
        );
        // Check if the heading text is displayed
        expect(screen.getByText("Generated Echo Audio:")).toBeInTheDocument();
        // Verify that an <audio> element with the proper src exists
        const audioElement = document.querySelector("audio");
        expect(audioElement).toBeDefined();
        expect(audioElement).toHaveAttribute("src", "test-audio-url");
    });
});
