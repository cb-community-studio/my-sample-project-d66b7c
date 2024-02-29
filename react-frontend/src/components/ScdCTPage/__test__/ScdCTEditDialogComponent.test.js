import React from "react";
import { render, screen } from "@testing-library/react";

import ScdCTEditDialogComponent from "../ScdCTEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scdCT edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScdCTEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scdCT-edit-dialog-component")).toBeInTheDocument();
});
