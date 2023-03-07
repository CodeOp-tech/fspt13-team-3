import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
