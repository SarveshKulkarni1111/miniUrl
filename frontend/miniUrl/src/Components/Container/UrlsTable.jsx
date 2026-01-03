import React from 'react';

const UrlsTable = ({ urls = [] ,onDelete }) => {
  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert('Short URL copied!');
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-600">
            <th className="px-4 py-3">Original URL</th>
            <th className="px-4 py-3">Short URL</th>
            <th className="px-4 py-3 text-center">Redirects</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="px-4 py-6 text-center text-gray-500"
              >
                No URLs created yet
              </td>
            </tr>
          ) : (
            urls.map((url) => (
              <tr
                key={url.id}
                className="border-t border-gray-200 text-sm"
              >
                <td className="px-4 py-3 break-all">
                  {url.original_url}
                </td>

                <td className="px-4 py-3 text-blue-600 break-all">
                  <a
                    href={url.short_code}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {url.short_code}
                  </a>
                </td>

                <td className="px-4 py-3 text-center">
                  {url.redirect_count}
                </td>

                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleCopy(url.short_code)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => onDelete(url.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlsTable;
