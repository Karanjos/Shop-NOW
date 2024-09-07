import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Shop~NOW Admin",
  description: "Shop~NOW Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <AdminNav />
      {children}
    </div>
  );
};
export default AdminLayout;
