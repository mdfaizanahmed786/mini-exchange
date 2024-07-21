import Sidebar from "../components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
