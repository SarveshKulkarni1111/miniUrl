import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api"; // axios instance with interceptor

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    api
      .get("/user/profile") // protected backend route
      .then((res) => setUser(res.data))
      .catch(() => logout());
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Profile</h2>

      {user ? (
        <pre className="rounded bg-gray-100 p-3 text-sm">
          {JSON.stringify(user, null, 2)}
        </pre>
      ) : (
        <p>Loading...</p>
      )}

      <button
        onClick={logout}
        className="mt-4 w-full rounded bg-red-500 py-2 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
