import { useEffect, useState } from "react";
import api from "../../api";
import StatCard from "./StatCard";
import TopLinksTable from "./TopLinksTable";
import LinkCountPerWeekChart from "./LinkCountPerWeekChart";
import Toast from "../Toast/errorToast";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  
  const showError = (msg) => setToast({ message: msg, type: "error" });


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics/dashboard");
        setData(res.data);
      } catch (err) {
        console.error(err);
        showError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
    {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-semibold text-gray-900">
        Analytics Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          label="Average Redirect Time"
          value={data.averageRedirectTimeMs}
          unit="ms"
        />

        <StatCard
          label="Average Clicks per Link"
          value={data.averageClicksPerLink}
        />
      </div>

      {/* Chart + Top Links */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LinkCountPerWeekChart
        urlsCreatedLast7Days={data.urlsCreatedLast7Days}
      />

      <TopLinksTable links={data.topLinks} />
    </div>
    </div>
    </>
  );
};

export default Dashboard;
