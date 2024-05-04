import React, { useEffect, useState } from 'react';

const ImagePreview = ({ file }) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = () => {
        const selectedFile = file;
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    useEffect(() => {
        handleFileChange();
    }, [file]);

    return (
        previewUrl && <img src={previewUrl} alt="Preview" className='w-full h-full object-contain object-center' />
    );
};

export default ImagePreview;