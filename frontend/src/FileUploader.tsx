import React, { useRef, useState } from 'react';

interface Props {
    label: string;
    onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<Props> = ({ label, onFileUpload }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileUpload(file);
        }
    };

    return (
        <div>
            <label>{label}</label>
            <button type="button" onClick={handleButtonClick}>
                Choose File
            </button>
            <span>{fileName}</span>
            <input type="file" ref={inputRef} onChange={handleFileChange} hidden />
        </div>
    );
};

export default FileUploader;