function Loading() {
  return (
    <div className="w-screen h-screen bg-so-black-8 flex items-center justify-center fixed top-0">
      <div className="text-center bg-gray-100 px-2 py-4 rounded-xl shadow-lg">
        <img
          className="w-[264px] mx-auto px-4"
          src="/logo-128x31.png"
          alt="Logo"
        />

        <p className="mt-4 text-gray-700">
          Please stay put, We are <br />
          <b className="font-semibold text-gray-900">Loading...</b>
        </p>

        {/* Tailwind spinner */}
        <div className="mt-4 flex justify-center">
          <div className="w-10 h-10 border-4 border-red-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
