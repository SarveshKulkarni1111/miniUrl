import axios from 'axios';
import { useState } from 'react';

const InputForm = ({onUrlAdded }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        'http://localhost:3000/api/miniUrl',
        {
          longUrl: url
        }
      );

      console.log('Short URL created:', response.data);

      setUrl('');
      if (onUrlAdded) onUrlAdded();  // refresh table
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto mt-12 flex flex-col gap-2"
    >
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Enter your long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </form>
  );
};

export default InputForm;
