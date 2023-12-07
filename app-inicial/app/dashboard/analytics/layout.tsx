const AnalyticLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2>sub Layout do Analytics , podendo ser um sub menu da navegação</h2>
      {children}
    </>
  );
};

export default AnalyticLayout;