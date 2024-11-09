"use client"
import useRepairshoprFile from '@/hooks/useAddRepairshoprFile';
import React, { useState } from 'react';

interface FileUpload {
    url: string;
    filename: string;
}

const Testing = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const { addRepairTicketFile } = useRepairshoprFile()
    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file');
            return;
        }

        setUploading(true);
     
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const apiResponse = await fetch(`http://localhost:8000/api/v1/hhp/files`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const apiResponseData = await apiResponse.json();
            console.log('API Response:', apiResponseData);
            const payload = {
                "files": [
                    {
                        "url": apiResponseData?.fileAddress,
                        "filename": selectedFile?.name
                    }
                ]
            }
            await addRepairTicketFile(87307104, payload)
            if (apiResponseData.error) {
                setError(apiResponseData.error);
            } else {
                console.log('File uploaded successfully');
            }
        } catch (error) {
            setError('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload File'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Testing;