import React, { useState } from "react";

interface Props {
  src:string;
  alt?:string;
  className?:string;
}

const LazyImage = ({ src, alt, className }:Props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`${className}`}>
      {loading && (
        <div className="inset-0 flex w-auto h-60 items-center justify-center bg-gray-200">
          <span className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default LazyImage;