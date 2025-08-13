import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      navigate('/login');
      return;
    }
    setLoggedInUser(user);
    fetchProducts();
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully');
    navigate('/login');
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('https://auth-backend-navy.vercel.app/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          handleLogOut();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const result = await response.json();
      setProducts(result || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header>
        <h1>Welcome, {loggedInUser || 'Guest'}!</h1>
        <button onClick={handleLogOut} className="logout-btn">
          Logout
        </button>
      </header>

      <main>
        <h2>Available Products</h2>
        
        {isLoading ? (
          <div className="loading">Loading products...</div>
        ) : error ? (
          <div className="error">
            {error}
            <button onClick={fetchProducts}>Retry</button>
          </div>
        ) : products.length === 0 ? (
          <div>No products available</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id || product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;