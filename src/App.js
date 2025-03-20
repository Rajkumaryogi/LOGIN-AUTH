// This is the main component of the frontend. It is the parent component of all other components.
import { useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import NotFound from './pages/NotFound';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }
  return (
    <div className="App">
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
    <Route path="/" element={<Navigate to = "/Login"/>} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
    <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
}

export default App;
