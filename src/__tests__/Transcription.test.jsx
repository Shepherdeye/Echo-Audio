import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Transcription from "../Components/Transcription";

describe("Transcription Component", () => {
    it("renders transcribed text", () => {
        const testText = "Hello world";
        render(<Transcription text={testText} highlightedWordIndex={null} wordTimings={[]} />);
        expect(screen.getByText(testText)).toBeInTheDocument();
    });
});