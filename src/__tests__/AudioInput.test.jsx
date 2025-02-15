import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AudioInput from "../Components/AudioInput";

// Extend Vitest's expect with jest-dom matchers
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
expect.extend({ toBeInTheDocument });

describe("AudioInput Component", () => {
    it("renders the record button", () => {
        render(<AudioInput onAudioSelected={vi.fn()} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });
});
