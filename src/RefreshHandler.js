import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('jwtToken')) {
            setIsAuthenticated(true);
            console.log('jwtToken exists');
            if( location.pathname === '/' ||
                location.pathname === '/login' || 
               location.pathname === '/signup'
               ){
                Navigate('/home', {replace: false});
            }
        }

    }, [location, Navigate, setIsAuthenticated]);
  return (
    null
  )
}

export default RefreshHandler
