import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EchoAudio from "../Components/EchoAudio";

describe("EchoAudio Component", () => {
    it("renders without crashing", () => {
        render(<EchoAudio audioURL={"test-audio-url"} isLoading={false} />);
        expect(screen.getByText("Generated Echo Audio:")).toBeInTheDocument();
    });
});
