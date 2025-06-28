const CardHeader = () => {
  return <h2></h2>;
};

const CardContent = () => {
  return <div></div>;
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return <article>{children}</article>;
};

export default { Card, CardHeader, CardContent };
