import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    function handleLogout() {
        // @TODO logout feature
        navigate("/login")
    }

  return (
    <>
        <Card>
            <Card.Header>
                <h1>Dashboard</h1>
                {error && <Alert variant="danger">{error}</Alert>}
            </Card.Header>
            <Card.Body>
                
            </Card.Body>
        </Card>
        <div className="w100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Logout</Button>
        </div>
    </>
  )
}
