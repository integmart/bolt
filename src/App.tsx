import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminHome } from "./screens/AdminHome";
import { ClientsPage } from "./screens/ClientsPage";
import { UsersPage } from "./screens/UsersPage";
import { LeftNavigationByAnima } from "./screens/AdminHome/sections/LeftNavigationByAnima";
import { AddClientPage } from "./screens/ClientsPage/AddClientPage";
import { EditClientPage } from "./screens/ClientsPage/EditClientPage";
import { AddUserPage } from "./screens/UsersPage/AddUserPage";
import { EditUserPage } from "./screens/UsersPage/EditUserPage";
import { FeatureFlagsPage, EditFeatureFlagPage } from "./screens/FeatureFlagsPage";

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <LeftNavigationByAnima />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/add" element={<AddClientPage />} />
          <Route path="/clients/edit/:id" element={<EditClientPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
          <Route path="/feature-flags" element={<FeatureFlagsPage />} />
          <Route path="/feature-flags/:id" element={<EditFeatureFlagPage />} />
        </Routes>
      </div>
    </Router>
  );
}