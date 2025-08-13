const handleSignup = async (e) => {
  e.preventDefault();
  const { name, email, password } = signupInfo;
  
  if (!name || !email || !password) {
    alert('Name, email and password are required');
    return;
  }

  try {
    const url = 'https://auth-backend-navy.vercel.app/auth/signup';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupInfo)
    });

    // First check if the response exists and is OK
    if (!response) {
      throw new Error('No response from server');
    }

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      const errorData = await response.text(); // Try to read as text first
      try {
        // If it might be JSON, try to parse
        const jsonError = JSON.parse(errorData);
        throw new Error(jsonError.message || 'Signup failed');
      } catch {
        throw new Error(errorData || 'Signup failed');
      }
    }

    // If we get here, response is OK
    const result = await response.json();
    
    if (result.success) {
      alert(result.message);
      window.location.href = '/login';
    } else {
      alert(result.error?.details?.[0]?.message || result.message || 'Signup failed');
    }
  } catch (err) {
    console.error('Signup Error:', err);
    alert(err.message || 'Error occurred. Please try again');
  }
};