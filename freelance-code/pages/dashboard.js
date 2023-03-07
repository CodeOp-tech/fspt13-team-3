import withAuth from '../components/withAuth';

const DashboardPage= () => {
  return (
    <div>
      <h1>This is a protected page</h1>
      <p>Only logged-in users can see this</p>
    </div>
  );
};

export default withAuth(DashboardPage);