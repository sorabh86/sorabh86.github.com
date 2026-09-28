import { useState } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';


interface ImageItem {
  src:string
}
function Ourwork() {
  const images:ImageItem[] = [
    { src: "/work/1.jpg" },
    { src: "/work/2.jpg" },
    { src: "/work/3.jpg" },
    { src: "/work/4.jpg" }
  ]

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const openDialog = (image:ImageItem) => {
    setSelectedImage(image);
  };

  // Close dialog
  const closeDialog = () => {
    setSelectedImage(null);
  };


  return (
    <div className='our-work container m-auto rounded-t-full bg-white py-12 px-10'>
      <h2 className="sos-heading text-so-blue text-5xl bold font-black mb-10 text-center">My Work</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((item, index) => (
          <div key={index} onClick={() => openDialog(images[index])} className="overflow-hidden border-2  rounded-lg border-so-orange">
            <motion.div
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ opacity:0.8, scale: 1.05, transition:easeInOut }}
            // onClick={() => openDialog(image)}
            >
              <img className='w-full' alt={'Our Work Image ' + index} src={item.src} />
            </motion.div>
          </div>
        ))}

      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-so-black-8 p-10 box-border z-2"
            onClick={closeDialog}
            initial={{ left: -2000 }}
            animate={{ left: 1 }}
            exit={{ left: 2000 }}
          >
            <div className="bg-white rounded-2xl w-full h-full flex items-center justify-center p-4">
              <img className='max-h-full object-fill' src={selectedImage.src} alt="Selected Image" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Ourwork
