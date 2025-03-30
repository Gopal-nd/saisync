import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get('/api/auth/validate', { withCredentials: true });
        if (response.data.isValid) {
          setRole(response.data.role);
        } else {
          router.push('/sign-in');
        }
      } catch (error) {
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [router]);

  return { loading, role };
};

export default useAuth;
