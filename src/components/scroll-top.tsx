import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to check scroll position
  const toggleVisibility = () => {
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop
    setIsVisible(scrollY > 300);
  };

  // Scroll to top function
  const scrollToTop = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Attach scroll listener
  useEffect(() => {
    document.body.addEventListener("scroll", toggleVisibility);

    return () => {
      document.body.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-full shadow-sm transition-transform duration-500 ease-in-out transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
