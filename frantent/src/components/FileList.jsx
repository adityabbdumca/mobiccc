import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = ({ token }) => {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('/api/files', {
                headers: {
                    'x-auth-token': token,
                },
            });
            setFiles(response.data);
        } catch (error) {
            alert('Failed to fetch files: ' + error.response.data);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [token]);

    return (
        <div>
            <h2>Your Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file._id}>
                        {file.filename} - <a href={`/api/files/download/${file._id}/${file.code}`} target="_blank" rel="noopener noreferrer">Download</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
