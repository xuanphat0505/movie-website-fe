import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, { params });
        const result = response.data;
        if (isMounted) {
          // Nếu API có cấu trúc khác nhau, bạn có thể điều chỉnh ở đây.
          setData(result.data?.items || result.data);
          setLoading(false);
          setPagination(result.data?.params.pagination);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(params)]);

  return { data, loading, error, pagination };
};

export default useAxios;
