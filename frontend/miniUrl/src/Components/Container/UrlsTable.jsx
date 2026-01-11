import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const UrlsTable = ({ urls = [], onDelete }) => {
  const [qrUrl, setQrUrl] = useState(null);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 relative px-2 sm:px-4">
      <table className="w-full border border-gray-200 rounded-md">
        {/* Hide headers on mobile */}
        <thead className="hidden md:table-header-group bg-gray-100">
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
              <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                No URLs created yet
              </td>
            </tr>
          ) : (
            urls.map((url) => (
              <tr
                key={url.id}
                className="block md:table-row border-b md:border-t border-gray-200 text-sm"
              >
                {/* Original URL */}
                <td className="block md:table-cell px-4 py-2">
                  <span className="md:hidden text-xs text-gray-500">
                    Original URL:
                  </span>{' '}
                  <div className="break-all">{url.original_url}</div>
                </td>

                {/* Short URL */}
                <td className="block md:table-cell px-4 py-2 text-blue-600">
                  <span className="md:hidden text-xs text-gray-500">
                    Short URL:
                  </span>{' '}
                  <a
                    href={url.short_code}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline break-all"
                  >
                    {url.short_code}
                  </a>
                </td>

                {/* Redirect count */}
                <td className="block md:table-cell px-4 py-2 md:text-center">
                  <span className="md:hidden text-xs text-gray-500">
                    Redirects:
                  </span>{' '}
                  {url.redirect_count}
                </td>

                {/* Actions */}
                <td className="block md:table-cell px-4 py-2">
                  <span className="md:hidden text-xs text-gray-500">
                    Actions
                  </span>

                  <div className="flex flex-wrap md:flex-nowrap gap-2 mt-1 md:justify-center">
                    <button
                      onClick={() => handleCopy(url.short_code)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-xs sm:text-sm hover:bg-gray-100"
                    >
                      Copy
                    </button>

                    <button
                      onClick={() => setQrUrl(url.short_code)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-xs sm:text-sm hover:bg-gray-100"
                    >
                      QR
                    </button>

                    <button
                      onClick={() => onDelete(url.id)}
                      className="border border-red-400 text-red-500 rounded-md px-3 py-1 text-xs sm:text-sm hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* QR Popup */}
      {qrUrl && (
        <div className="fixed bottom-4 right-4 sm:absolute sm:top-10 sm:right-10 bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold">QR Code</h2>
            <button
              onClick={() => setQrUrl(null)}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          <QRCodeCanvas value={qrUrl} size={160} />
        </div>
      )}
    </div>
  );
};

export default UrlsTable;
