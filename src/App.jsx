import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Seminars from "./pages/user/Seminars";
import SeminarDetail from "./pages/user/SeminarDetail";
import Ticket from "./pages/user/Ticket";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddSeminar from "./pages/admin/AddSeminar";
import EditSeminar from "./pages/admin/EditSeminar";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import TicketList from "./components/TicketCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* User Pages  */}
        <Route element={<UserLayout />}>
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/seminars/:id" element={<SeminarDetail />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/ticket/:id" element={<Ticket />} />
        </Route>
        {/* Admin Pages  */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add" element={<AddSeminar />} />
          <Route path="edit/:id" element={<EditSeminar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
