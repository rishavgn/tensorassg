import { useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      setLoading(false);

      const data = await res.json();

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data?.user));
        window.location.reload();
      } else {
        throw new Error(data?.message || data);
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
