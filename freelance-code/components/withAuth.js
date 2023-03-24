import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem("token") : null;
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} token={typeof localStorage !== 'undefined' ? localStorage.getItem("token") : null} />;
  };

  return Wrapper;
};

export default withAuth;