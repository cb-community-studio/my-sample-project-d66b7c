import React from "react";
import { render, screen } from "@testing-library/react";

import ScdCTPage from "../ScdCTPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scdCT page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScdCTPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scdCT-datatable")).toBeInTheDocument();
    expect(screen.getByRole("scdCT-add-button")).toBeInTheDocument();
});
