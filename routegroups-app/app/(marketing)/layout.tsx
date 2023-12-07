export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <h1>marketing Layout</h1>
      {children}
    </div>
  )
}

