import React from "react";
import { render, screen } from "@testing-library/react";

import DetailsListCreateDialogComponent from "../DetailsListCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders detailsList create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DetailsListCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("detailsList-create-dialog-component")).toBeInTheDocument();
});
