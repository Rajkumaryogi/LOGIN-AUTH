import { useEffect, useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  } , []);

  const handleLogOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    } , 1000);
    alert('log Out successfully');
    // window.location.href = '/login';
  }

  const fetchProducts = async () => {
    // final base_url = process.env.
    try {
        const url = 'https://auth-backend-navy.vercel.app/product';
        const headers = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwtToken')
          }
        }
          const response = await fetch(url, headers);
         const result = await response.json();
          console.log(result);
          setProducts(result);
  }
  catch (err) {
    console.log('Error -> ', err);
  }
}
useEffect(()=> {
  fetchProducts()
},[])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <h2>Welcome to the Home page</h2>
      <h3>Available Products</h3>
      <div>
        {products && products.map((product) => (
          <div key={product.id}>
            <h4>{product.name} : {product.price}</h4>
            <p>{product.description}</p>
            {/* <p>{product.price}</p> */}
          </div>
        ))}
      </div>
      <button onClick={handleLogOut} type='submit'>Logout </button>
    </div>
  )
}

export default Home

