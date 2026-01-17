import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LinkCountPerWeekChart from './LinkCountPerWeekChart';

const Dashboard = () => {
  const [urlsCreatedLast7Days, setUrlsCreatedLast7Days] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardAnalytics = async () => {
    try {
      const res = await axios.get(
        'https://miniurl-dfc8.onrender.com/analytics/dashboard'
      );

      setUrlsCreatedLast7Days(
        res.data.urlsCreatedLast7Days || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LinkCountPerWeekChart urlsCreatedLast7Days={urlsCreatedLast7Days}/>
        
      </div>
    </div>
  );
};

export default Dashboard;
