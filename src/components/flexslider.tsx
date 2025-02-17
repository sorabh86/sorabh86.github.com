import /* React, */ { useEffect, useState } from 'react'

import Slide1 from "../assets/banner/slide-1.jpg"
import Slide2 from "../assets/banner/slide-2.jpg"
import Slide3 from "../assets/banner/slide-3.jpg"
import Slide4 from "../assets/banner/slide-4.jpg"
import Slide5 from "../assets/banner/slide-5.jpg"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface Props { }

function Flexslider(props: Props) {
  const { } = props
  const slideArr = [Slide1, Slide2, Slide3, Slide4, Slide5];
  // const slideArr = ["/banner/slide-1.jpg", "/banner/slide-2.jpg", "/banner/slide-3.jpg", "/banner/slide-4.jpg", "/banner/slide-5.jpg"];
  const [hoverIndex, setHoverIndex] = useState<number|null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1298);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to show the next image
  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideArr.length);
  };

  // Function to show the previous image
  const showPreviousImage = () => {
    console.log(currentImageIndex);
    
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slideArr.length - 1 : prevIndex - 1
    );
  };

  function handleOver(index:number) {
    setHoverIndex(index);
  }
  function handleOut() {
    setHoverIndex(null);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1298);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='sos-flexslider bg-dark text-light p-5 md:px-0 lg:px-5'>
      <div className="flexslider">
        <ul className="slides">
          {slideArr.map((item, index) => (
            <li className={`transition-opacity duration-500 ease-in-out${hoverIndex === index ? ' active' : ''}`}
            {...!isLargeScreen && {
              style:{
                display:(currentImageIndex === index ? 'block' : 'none'),
                opacity:(currentImageIndex === index ? '1': '0')
              }
            }}
              key={index}
              {...(isLargeScreen && {
                onMouseOver: () => handleOver(index),
                onMouseOut: handleOut,
              })}
            >
              <img src={item} alt={'Slide ' + index} />
            </li>
          ))}
        </ul>
        {!isLargeScreen && (
          <ul className="flex-control-nav flex-direction-nav">
            <li>
              <a className="flex-prev cursor-pointer" onClick={showPreviousImage}><FontAwesomeIcon icon={faChevronLeft} /></a>
            </li>
            <li>
              <a className="flex-next cursor-pointer" onClick={showNextImage}><FontAwesomeIcon icon={faChevronRight} /></a>
            </li>
          </ul>
        )}
      </div>
      
    </div>
  )
}

export default Flexslider
