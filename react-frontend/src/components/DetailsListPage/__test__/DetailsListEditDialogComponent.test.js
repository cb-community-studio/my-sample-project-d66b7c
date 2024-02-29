import React from "react";
import { render, screen } from "@testing-library/react";

import DetailsListEditDialogComponent from "../DetailsListEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders detailsList edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DetailsListEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("detailsList-edit-dialog-component")).toBeInTheDocument();
});
