import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faQuoteLeft,
  faQuoteRight,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  feedback: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    feedback:
      "Sorabh's expertise and approachable nature made working with him a seamless experience. His professionalism ensured projects were completed efficiently, and his contributions were instrumental in their success.",
    rating: 5,
    image: "/sorabh-profile.jpg",
  },
  {
    name: "Sarah Smith",
    feedback:
      "With a business background in online presence, I rely on Sorabh for the technical expertise essential to my work. Unlike many developers, he focuses on providing practical solutions rather than just pointing out limitations. His insights and problem-solving approach make him a highly reliable and valuable partner.",
    rating: 4.5,
    image: "/sorabh-profile.jpg",
  },
  {
    name: "Michael Brown",
    feedback:
      "Having worked with Sorabh on multiple web and application development projects, I can confidently say his expertise is invaluable. Whether it's full-stack development, troubleshooting complex code, or optimizing performance, he consistently delivers effective solutions rather than just identifying issues. His technical skills and problem-solving mindset make him a dependable and trusted partner.",
    rating: 5,
    image: "/sorabh-profile.jpg",
  },
];

const ClientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          ⭐ Client Testimonials
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-lg relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 mx-auto rounded-full border-2 border-gray-300 mb-4"
              />
              <p className="text-lg text-gray-700 italic">
                <FontAwesomeIcon
                  className="relative top-[-10px]"
                  icon={faQuoteLeft}
                />
                {testimonials[currentIndex].feedback}
                <FontAwesomeIcon
                  className="relative top-[-10px]"
                  icon={faQuoteRight}
                />
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mt-4">
                - {testimonials[currentIndex].name}
              </h3>

              {/* Star Ratings */}
              <div className="flex justify-center mt-3 text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={
                      i + 1 <= testimonials[currentIndex].rating
                        ? faStar
                        : faStarHalfAlt
                    }
                    className="text-xl"
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevTestimonial}
              className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;