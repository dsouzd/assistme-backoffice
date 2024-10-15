// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { Form, Button, Container, Alert, Spinner, Card } from 'react-bootstrap';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await login(username, password);
      setUser(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
      setUser(null); // Ensure user state is cleared on failure
      localStorage.removeItem('user'); // Clear any existing user data
    }
    setLoading(false);
  };

  return (
    <div className="login-background">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '15px', backgroundColor: '#ffffffcc' }}>
          <Card.Body>
            {/* Logo */}
            <div className="text-center mb-4">
            </div>
            <h2 className="mb-4 text-center" style={{ color: '#a01441' }}>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow-sm"
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading} className="w-100" style={{ backgroundColor: '#a01441', borderColor: '#a01441' }}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
