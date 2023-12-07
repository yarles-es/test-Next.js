export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Shop Layout</h1>
      {children}
    </div>
  );
}
