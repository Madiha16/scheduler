/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";
import Appointment from "components/Appointment"

/*
  A test that renders a React Component
*/
it("renders without crashing", () => {
  render(<Application />);
});

// To skip a test, use xit or test.skip

// Use the describe function to group the Appointment component tests

// Change the watch mode to p and type in Appointment to only run the Appointment.test.js file after each update

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("does something it is supposed to do", () => {
    // ...
  });

  it("does something else it is supposed to do", () => {
    // ...
  });
});