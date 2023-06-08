import React, {useState, useEffect} from 'react';
import Home from '../components/admin/Home';
import Projects from '../components/admin/Projects';
import Addproject from '../components/admin/Addproject';
import Extra from '../components/admin/Extra';
import Nav from '../components/admin/Nav';
import Topnav from '../components/admin/Topnav';
import Moredetail from '../components/admin/Moredetail';

function Admin() {

    const [selected, setSelected] = useState("home");
    const [allProjects, SetAllProjects] = useState();
    const [stats, setStats] = useState();
    const [inComing, setIncoming] = useState();
    const [seeMore, setSeeMore] = useState()

    
    //test url : http://192.168.8.101:8000/
    // main url : 
    const getData = async () => {
      const allProjectsget = await fetch('http://192.168.8.101:8000/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const statsget = await fetch('http://192.168.8.101:8000/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

       const incomingget = await fetch('http://192.168.8.101:8000/incoming-projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      SetAllProjects( await allProjectsget.json());
      setStats(await statsget.json());
      setIncoming(await incomingget.json());
    }

    const getView = () => {
    switch (selected) {
      case "home":
        return <Home  
             inComing={inComing}
             stats={stats}
             setSeeMore={setSeeMore}
             />;
      case "projects":
        return <Projects  
         allProjects={allProjects}
         setSeeMore={setSeeMore}
        />;
      case "addproject":
        return <Addproject  />;
      case "extra":
        return <Extra />;
      case "moredetails":
        return <Moredetail
          seeMore={seeMore}
          />;
      default:
        return <h1>Hi there nothing</h1>;
    };
  }


  useEffect(() => {
   getData();
  }, [])
  


  return (
    <div className='  m-0 flex font-sans antialiased font-normal text-base leading-default bg-gray-50 text-slate-500  w-full h-[100dvh] gap-2'>
        <div className=" max-w-62.5 ease-nav-brand z-990  inset-y-0 my-4  ml-4 block w-1/4  flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent" >
            <Nav setSelected={setSelected} selected={selected} />
        </div>
        
        <div className={`col-span-2  ease-soft-in-out xl:ml-68.5 relative  max-h-screen rounded-xl transition-all duration-200 overflow-y-auto w-[70%] ${selected == "projects" && "justify-center items-center"}`}>
            <Topnav />
            {getView()}            

        </div>
        
    </div>
  )
}

export default Admin