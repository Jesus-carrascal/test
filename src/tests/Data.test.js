import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Data from "../components/Data";

describe("Data component", () => {
  test("renders generations", async () => {
    render(<Data />);
    const generationItems = await screen.findAllByRole("listitem");
    expect(generationItems.length).toBeGreaterThan(0);
  });

  test("fetches pokemon data on form submit", async () => {
    render(<Data />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "pikachu" } });
    fireEvent.click(button);

    await waitFor(() => {
      const pokemonName = screen.getByText("pikachu");
      expect(pokemonName).toBeInTheDocument();
    });
  });
});