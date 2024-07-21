import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/auth-provider';
import { useToast } from '@/components/ui/use-toast';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api`;

const useAxios = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { refreshToken } = useAuth();
  const { toast } = useToast();

  const fetchApi = useCallback(async ({ url, method, body = null, headers = null, isRefresh = false }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios({
        method,
        url,
        data: body,
        headers: headers ? {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          ...headers,
        } : {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      return res;
    } catch (err) {
      if (err?.response?.status === 401 && !isRefresh) {
        await refreshToken();
        return fetchApi({ url, method, body, headers, isRefresh: true });
      }
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: err.response?.data?.error || 'Please try again later.',
      });
      setError(err);
      return { error: err, data: null, status: err?.response?.status };
    } finally {
      setLoading(false);
    }
  }, [refreshToken, toast]);

  return { error, loading, fetchApi };
};

export default useAxios;
