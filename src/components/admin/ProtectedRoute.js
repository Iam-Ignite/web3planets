import React, {useEffect} from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Admin from '../../pages/Admin';


export default async function ProtectedRoute({component: Component, ...rest }) {

      const navigate = useNavigate();


        const checkfunc = async () => {
            const checkAuth = await fetch('http://192.168.8.101:8000/auth', {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });

                return checkAuth.json();
        }
      const isAuthenticated = JSON.parse(localStorage.getItem("admin"));
      console.log(isAuthenticated, "checking");

      useEffect(() => {

        if(isAuthenticated === null || !checkfunc) {
                navigate('/login');
        }

      }, [isAuthenticated])
      


                    // Render the protected component if the user is authenticated
   return ( 
   <Admin />
   )

}
