import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Faq } from "../types/default-type";

interface IProp {
  faqData: Faq[]
}

const FAQs = ({faqData}:IProp) => {

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
