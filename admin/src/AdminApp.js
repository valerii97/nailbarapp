import "./AdminApp.css";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminContent } from "./components/AdminContent";

const AdminApp = () => {
  return (
    <div className="App">
      <AdminHeader />
      <AdminSidebar />
      <AdminContent />
    </div>
  );
};

export default AdminApp;
