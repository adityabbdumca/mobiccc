import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ token }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/files/upload', formData, {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded! Code: ' + response.data.code);
        } catch (error) {
            alert('Upload failed: ' + error.response.data);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadFile;
