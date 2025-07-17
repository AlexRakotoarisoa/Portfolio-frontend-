import React from 'react';

const InterfaceImage = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">

        <div className='relative h-[85vh] w-[90%] md:w-[1000px] md:h-[580px] rounded-[20px] overflow-hidden'>
            <div className='w-[100%] h-[60px] md:h-[80px]  bg-[#ffffff] flex justify-between items-center px-[20px]'>
                <h2 className="text-[16px] font-[12px] ">Aperçu des interfaces</h2>
                <div><button onClick={onClose} className="text-[25px] font-[10px]">&times;</button></div>
            </div> 

                <div className="w-[100%] h-[100%] bg-[#1D262B] overflow-scroll scrollbar-hide pb-[75px] md:pb-0">
                    <div className='flex flex-col overflow-y-scroll py-[15px] px-[10px] gap-y-4 h-auto py-10 md:h-[85%] md:flex-row  md:overflow-x-scroll md:items-center md:overflow-y-hidden md:w-auto md:py-0 md:gap-10 md:px-[50px]'>
                    {images.map((src, i) => (
                        <img
                        key={i}
                        src={src}
                        alt={`Interface ${i + 1}`}
                        className='md:w-[900px] md:h-[400px] rounded-[6px] '        
                        />
                    ))}
                      </div>
                </div>
            <div className='md:hidden absolute bottom-[-10px] w-[100%] h-[40px] bg-[#1D262B]'>
            </div> 
      </div>
    </div>
  );
};

export default InterfaceImage;
