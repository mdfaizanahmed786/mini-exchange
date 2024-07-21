import Sidebar from "../components/SideBar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
