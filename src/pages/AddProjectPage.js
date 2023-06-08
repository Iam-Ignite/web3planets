import React, { useState } from 'react'
import { Stars } from '../components/planets-utils/maincanvas'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'

export default function AddProjectPage() {
  const [formSwitch, setFormSwitch] = useState(0)
  const [counter, setCounter] = useState(1);

  /*
dateandtime : {type: Date, default: Date.now},
 tokenName: {type: String, required: true},
 tokenDescription: {type: String, required: true},
 unique: {type: String, required: true},
 extraDetails: {type: String},
 upcomingPlans: {type: String, required: true},
 launchPlans: {type: String},
 fun_Fact: {type: String},
 chain: {type: String, required: true},
 img_url: {type: String, required: true},
 planet_url: {type: String},
 subscription: {type: Boolean},
 votes: {type: Number},
 website: {type: String},
 tg: {type: String},
 Dapp: {type: String},
 twitter: {type: String},
 Contract_address: {type: String},
 audit: {type: String},
 clicks: {type: Number}  
   */

const [tokenDescription, setTokenDescription] = useState('');
const [unique, setUnique] = useState('');
const [extraDetails, setExtraDetails] = useState('');
const [upcomingPlans, setUpcomingPlans] = useState('');
const [launchPlans, setLaunchPlans] = useState('');
const [fun_Fact, setFun_Fact] = useState('');
const [chain, setChain] = useState('');
const [img_url, setImg_url] = useState('');
// const [planet_url, setPlanet_url] = useState('');
const [website, setWebsite] = useState('');
const [tg, setTg] = useState('');
const [dapp, setDapp] = useState('');
const [twitter, setTwitter] = useState('');
const [contract_address, setContract_address] = useState('');
const [audit, setAudit] = useState('');
  const [tokenName, setTokenName] = useState();

  const increment = () => setCounter(counter + 1 );
  const decrement = () => setCounter(counter - 1 );

//filter files
  const fileFilter = (file) => {
    // Reject a file 
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
        return true;
    } else {
        return false;
    }
  };

    const handleFileChange = (e) => {
    //setSelectedFile(e.target.files[0]);
    console.log("in here", e.target.name, e.target.value)
  // setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  /*
   if(e.target.files[0]) {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
   } else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   }
*/
  };

  const submitData = async () => {
    const formData = { tokenDescription, tokenName,unique, extraDetails,upcomingPlans,launchPlans,fun_Fact, chain, img_url, website,tg,dapp, twitter,contract_address,audit}

    const upload = await fetch('http://192.168.8.101:8000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    console.log(formData, "upload");
  }


  return (
    <div className='h-screen relative'>
      <Canvas
        {...{
          camera: { position: [50, 200, 50] },
        }}
        className="canvas-contain"
        id='canvasHold'
      //onClick={ handleClick }
      //onWheel={handleWheel}
      >
        <Stars />


      </Canvas>
      <div className=" flex justify-center flex-col  items-center gap-6 absolute top-0 md:w-full h-[100dvh]" style={{ height: "100vh" }}>
      <div className="absolute text-lg top-16 bg-gradient-to-tl border-b border-white from-purple-700 to-pink-500 px-8 py-2 rounded-md font-medium text-white  right-10">{counter}/5</div>
        {/* <h1 className='text-white font-bold text-3xl md:text-4xl'>ALL-STARS INTRODUCES YOU TO THE ALL-STARSVERSE</h1> */}
        <div className={`md:w-2/5 grid md:grid-cols-1 p-5 py-14 md:px-16 gap-8 rounded-md ${formSwitch === 0 ? "grid" : "hidden"}`}>
          <div className="bg-[00ff00]">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WHAT IS YOUR PROJECTS NAME</label>
            <input className='bg-transparent  border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter project name here' 
             name="tokenName" 
             defaultValue={tokenName}
             onChange={(e) => setTokenName(e.target.value)}
             />
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WHAT CHAIN IS YOUR PROJECT ON</label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter chain Address' 
             name='chain'
             defaultValue={chain}
             onChange={(e) => setChain(e.target.value)}
            />
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">TELL US A BIT ABOUT YOUR PROJECT</label>
            <textarea name="tokenDescription" defaultValue={tokenDescription} onChange={(e) => setTokenDescription(e.target.value)} id="" className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' placeholder='' cols="10" rows="3"></textarea>
          </div>
          <div className="flex gap-6 justify-end">
            <Link to="/"
              className='bg-transparent border-white border px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Back</Link>
            <button onClick={()  => {
              increment()
            setFormSwitch(1)}
              }
              className=' bg-gradient-to-tl border border-white from-purple-700 to-pink-500 px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Next 🚀</button>
          </div>

        </div>

        <div className={` md:w-2/5 grid md:grid-cols-1 p-5 py-14 md:px-16 gap-8 rounded-md ${formSwitch === 1 ? "grid" : "hidden"}`}>

          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WHAT MAKES IT DIFFERENT/UNIQUE? </label>
            <textarea name="unique" defaultValue={unique} onChange={(e) => setUnique(e.target.value)} id="" className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' placeholder='' cols="10" rows="3"></textarea>
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WHAT HAS HAPPENED SO FAR? </label>
            <textarea name="extraDetails" defaultValue={extraDetails} onChange={(e) => setExtraDetails(e.target.value)} id="" className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' placeholder='' cols="10" rows="3"></textarea>
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WHAT’S ARE THE UPCOMING PLANS?</label>
            <textarea name="upcomingPlans" defaultValue={upcomingPlans} onChange={(e) => setUpcomingPlans(e.target.value)} id="" className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' placeholder='' cols="10" rows="3"></textarea>
          </div>
          <div className="flex gap-6 justify-end">
            <button onClick={() => {
              decrement()
              setFormSwitch(0)}}
              className='bg-transparent border-white border px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Back</button>
            <button onClick={() =>{ setFormSwitch(2)
            increment()
            }}
              className=' bg-gradient-to-tl border border-white from-purple-700 to-pink-500 px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Next 🚀</button>
          </div>

        </div>


        <div className={` md:w-2/5 grid md:grid-cols-1 p-5 py-14 md:px-16 gap-8 rounded-md ${formSwitch === 2 ? "grid" : "hidden"}`}>

          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WHAT WAS/WILL BE READY UPON LAUNCH? </label>
            <textarea name="launchPlans" defaultValue={launchPlans} onChange={(e) => setLaunchPlans(e.target.value)} id="" className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' placeholder='' cols="10" rows="3"></textarea>
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">FUN FACT </label>
            <textarea name="fun_Fact" defaultValue={fun_Fact} onChange={(e) => setFun_Fact(e.target.value)} id="" className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' placeholder='' cols="10" rows="3"></textarea>
          </div>
           <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">WEBSITE: </label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter site Address' 
             name='website'
             defaultValue={website}
             onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="flex gap-6 justify-end">
            <button onClick={() => {
              decrement()
              setFormSwitch(1)}}
              className='bg-transparent border-white border px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Back</button>
            <button onClick={() =>{
              increment()
               setFormSwitch(3)}}
              className=' bg-gradient-to-tl border border-white from-purple-700 to-pink-500 px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Next 🚀</button>
          </div>

        </div>




        <div className={` md:w-2/5 grid md:grid-cols-1 p-5 py-14 md:px-16 gap-8 rounded-md ${formSwitch === 3 ? "grid" : "hidden"}`}>

      
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">TG: </label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter tg link' 
             name='tg'
             defaultValue={tg}
             onChange={(e) => setTg(e.target.value)}
            />
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">TWITTER</label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter twitter link' 
             name='twitter'
             defaultValue={twitter}
             onChange={(e) => setTwitter(e.target.value)}
            />
          </div>

          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">DApp </label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter dapp' 
             name='Dapp'
             defaultValue={dapp}
             onChange={(e) => setDapp(e.target.value)}
            />
          </div>
          <div className="flex gap-6 justify-end">
            <button onClick={() => {
              decrement()
             setFormSwitch(2)}}
              className='bg-transparent border-white border px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Back</button>
            <button onClick={() => {setFormSwitch(4)
            increment()
            }}
              className=' bg-gradient-to-tl border border-white from-purple-700 to-pink-500 px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Next 🚀</button>
          </div>

        </div>



        <div className={` md:w-2/5 grid md:grid-cols-1 p-5 py-14 md:px-16 gap-8 rounded-md ${formSwitch === 4 ? "grid" : "hidden"}`}>

          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">CONTRACT</label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter contract' 
             name='Contract_address'
             defaultValue={contract_address}
             onChange={(e) => setContract_address(e.target.value)}
            />
          </div>
          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">AUDIT</label>
            <input className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="text" placeholder='Enter audit' 
             name='audit'
             defaultValue={audit}
             onChange={(e) => setAudit(e.target.value)}
            />
          </div>

          <div className="">
            <label className='font-medium text-white text-lg md:text-xl' htmlFor="">Project Logo</label>
            <input onChange={(e) => setImg_url(e.target.value)} className='bg-transparent border outline-none rounded-md w-full  p-2 text-white px-4 mt-3' type="file" placeholder='Enter audit' 
             name='img_url'
             defaultValue={img_url}
            />
          </div>

          <div className="flex gap-6 justify-end">
            <button onClick={() => {
              decrement()
              setFormSwitch(3)}}
              className='bg-transparent border-white border px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' >Back</button>
            <button
              className=' bg-gradient-to-tl border border-white from-purple-700 to-pink-500 px-8 py-2 rounded-md font-medium text-white text-lg md:text-xl ' onClick={submitData} >Submit 🚀</button>
          </div>

        </div>

      </div>
    </div>
  )
}
