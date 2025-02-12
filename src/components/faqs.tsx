import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FAQs = () => {
  const faqData = [
    {
      question: "What services do you offer?",
      answer: "We provide web development, UI/UX design, e-commerce solutions, and SEO optimization.",
    },
    {
      question: "How long does a website take to develop?",
      answer: "The timeline varies based on complexity, but a standard website typically takes 4-6 weeks.",
    },
    {
      question: "Do you offer support after project completion?",
      answer: "Yes! We provide ongoing support and maintenance to ensure your website stays updated and secure.",
    },
    {
      question: "Can I customize my website later?",
      answer: "Absolutely! We build scalable websites that allow easy modifications and feature additions.",
    },
    {
      question: "What are your pricing plans?",
      answer: "We have flexible pricing plans tailored to your needs. Check out our Pricing section for details.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number|null>(null);

  const toggleFAQ = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 mb-8">
          Find answers to common queries. Need more help? Contact us anytime!
        </p>

        <div className="">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white mb-4 p-5 rounded-lg shadow-md cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <FontAwesomeIcon
                  icon={openIndex === index ? faChevronUp : faChevronDown}
                  className="text-gray-600"
                />
              </div>
              {openIndex === index && <p className="text-gray-600 mt-3">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
