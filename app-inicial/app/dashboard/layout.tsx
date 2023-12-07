export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2>sub Layout do Dashboard</h2>
      {children}
    </>
  );
}
