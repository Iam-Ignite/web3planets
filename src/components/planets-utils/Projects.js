import React from 'react'

function Projects({ details }) {
  return (
    <>
      <div className='text-[#67748E] flex flex-col justify-start  w-100'>

        <div className="flex justify-between items-start p-2 w-[100%] bg--700 mb-1 ">
          <img src={details.img_url} alt='img-logo' className='rounded w-28 h-28' />
          <button className=' cursor-pointer p-[7px] rounded-md w-20 bg-gradient-to-tl border border-white from-purple-700 to-pink-500 hover:shadow-soft-2xl hover:scale-102 text-sm text-white'>Vote</button>
        </div>

        <div className="flex  gap-2 text-white  flex-nowrap items-start  py-2  pr-6 w-100 overflow-x-auto">

            <div className="text-xs flex items-center gap-[2px] flex-none">
                <div className="">CA:</div> 
                <div className="bg--700 shadow-sm border flex text-center rounded-md py-1 text-xs px-3">
                    <img className='h-5' src="/1027.png" alt="" />
                    0xdac17...
                </div>
            </div>
            <div className="text-xs flex items-center gap-[2px] flex-none">
                <div className="">Votes:</div> 
                <div className="bg--700 shadow-sm border flex items-center text-center rounded-md py-1 text-xs px-3">
                  <img className='h-5' src="/avatar.svg" alt="" />
                  1290
                </div>
            </div>
            <div className="text-xs flex items-center gap-[2px] flex-none">
                <div className="">Market Cap:</div> 
                <div className="bg-puple-700 shadow-sm border flex items-center text-center rounded-md py-1 text-xs px-3">
                  <div className="">$</div>
                  1290
                </div>
            </div>

            <div className="text-xs flex items-center gap-[2px] flex-none">
                <div className="">Audit:</div> 
                <div className="bg-puple-700 shadow-sm border flex items-center text-center rounded-md py-1 text-xs px-3">
                  <div className="">$</div>
                  1290
                </div>
            </div>

        </div>

        <h3 className='font-bold text-[#fff] mt-4'>Overview</h3>
        <div className="bg-purple-700 shadow-sm p-4 text-white rounded-[10px] font-thin overflow-y-auto h-[200px]">
          {details.tokenDescription}
        </div>

      </div>
    </>
  )
}

export default Projects