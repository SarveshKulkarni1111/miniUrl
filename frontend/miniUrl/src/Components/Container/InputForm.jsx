import axios from "axios";
import { useState } from "react";

const InputForm = ({ onUrlAdded }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://miniurl-dfc8.onrender.com/api/miniUrl",
        {
          longUrl: url,
        }
      );

      console.log("Short URL created:", response.data);

      setUrl("");
      if (onUrlAdded) onUrlAdded(); // refresh table
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-12 flex flex-col gap-2 px-4"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="url"
          placeholder="Enter your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-5 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
};

export default InputForm;
