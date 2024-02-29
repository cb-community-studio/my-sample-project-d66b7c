import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import ScdCTPage from "../components/ScdCTPage/ScdCTPage";
import SingleScdCTPage from "../components/ScdCTPage/SingleScdCTPage";
import DetailsListPage from "../components/DetailsListPage/DetailsListPage";
import SingleDetailsListPage from "../components/DetailsListPage/SingleDetailsListPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />
            {/* protected route https://www.robinwieruch.de/react-router-private-routes/ */}

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                    <Route path="/scdCT" exact element={<ScdCTPage />} />
                    <Route path="/scdCT/:singleScdCTId" exact element={<SingleScdCTPage />} />
                    <Route path="/detailsList" exact element={<DetailsListPage />} />
                    <Route path="/detailsList/:singleDetailsListId" exact element={<SingleDetailsListPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
