import { useEffect, useState } from "react";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const fetchData = async (axiosParams) => {
    setStatus("pending");
    try {
      const response = await axios.request(axiosParams);
      setResponse(response);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (axiosParams !== undefined) {
      fetchData(axiosParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    response,
    status,
    error,
    fetchData,
  };
};

export default useAxios;
