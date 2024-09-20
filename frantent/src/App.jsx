import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import UploadFile from './components/UploadFile';
import FileList from './components/FileList';

const App = () => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (token) => {
        setToken(token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
        <div>
            <h1>File Upload App</h1>
            {!isLoggedIn ? (
                <>
                    <Login setToken={handleLogin} />
                    <Register />
                </>
            ) : (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <UploadFile token={token} />
                    <FileList token={token} />
                </>
            )}
        </div>
    );
};

export default App;
