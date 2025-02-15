import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioInput from "../Components/AudioInput";

describe("AudioInput Component", () => {
    it("renders correctly", () => {
        render(<AudioInput onAudioSelected={() => { }} />);
        expect(screen.getByText("Select or Record Audio")).toBeInTheDocument();
    });
});