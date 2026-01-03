import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MiniURL · Built by <span className="font-medium text-gray-700">Sarvesh</span>
      </div>
    </footer>
  );
};

export default Footer;
