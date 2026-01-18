import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import UrlsTable from './UrlsTable';

const Container = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchUrls = async () => {
    try {
      const response = await axios.get('https://miniurl-dfc8.onrender.com/api/miniUrl');
      setUrls(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.post(`https://miniurl-dfc8.onrender.com/api/${id}`);
      setUrls(prev => prev.filter(url => url.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <InputForm onUrlAdded={fetchUrls} />
      <main className="grow">
        <UrlsTable urls={urls} onDelete={handleDelete} />
      </main>
    </>
  );
};


export default Container;
