const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="bg-blue-600">
        <ul>
          <li>Perfil</li>
          <li>Conta</li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default LayoutDashboard;
