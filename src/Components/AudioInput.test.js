import { render, screen } from "@testing-library/react";
import AudioInput from "./AudioInput"; // Ensure path is correct
import React from "react";

test("renders the record button", () => {
    render(<AudioInput onAudioSelected={() => { }} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
});
