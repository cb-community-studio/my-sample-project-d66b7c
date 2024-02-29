import React from "react";
import { render, screen } from "@testing-library/react";

import DetailsListPage from "../DetailsListPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders detailsList page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DetailsListPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("detailsList-datatable")).toBeInTheDocument();
    expect(screen.getByRole("detailsList-add-button")).toBeInTheDocument();
});
