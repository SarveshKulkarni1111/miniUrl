import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import UrlsTable from './UrlsTable';
import api from '../../api';
import Toast from "../Toast/errorToast";

const Container = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showError = (msg) => setToast({ message: msg, type: "error" });


  const fetchUrls = async () => {
    try {
      // const response = await axios.get('https://miniurl-dfc8.onrender.com/api/miniUrl');
      const response = await api.get('/api/miniUrl');
      setUrls(response.data.data);
    } catch (err) {
      console.log(err);
      showError(err.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      // await axios.post(`https://miniurl-dfc8.onrender.com/api/${id}`);
      await api.post(`/api/${id}`);
      setUrls(prev => prev.filter(url => url.id !== id));
    } catch (err) {
      console.error(err);
      showError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (id) => {
  // Optimistically update redirect_count
  setUrls((prev) =>
    prev.map((u) =>
      u.id === id ? { ...u, redirect_count: u.redirect_count + 1 } : u
    )
  );
};


  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <InputForm onUrlAdded={fetchUrls} />
      <main className="grow">
        <UrlsTable urls={urls} onDelete={handleDelete} onRedirect={handleRedirect} />
      </main>
    </>
  );
};


export default Container;
