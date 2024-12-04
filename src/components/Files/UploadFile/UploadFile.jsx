import React, { useState } from 'react';
import './UploadFile.scss';
import { useDispatch } from 'react-redux';
import { addFile } from './../../../actions/FilesAction';
import { useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function UploadFile() {
    const [selectedFile, setSelectedFile] = useState({ file: null });
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleFileChange = (event) => {
        setSelectedFile({ ...selectedFile, file: event.target.files[0] });
    };

    const handleUpload = () => {
        if (selectedFile.file) {
            const formData = new FormData();
            formData.append("file", selectedFile.file);
            dispatch(addFile(formData, id));
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <div className="upload-container">
            <input type="file" onChange={handleFileChange} className="file-input" />
            <Tippy content="this for upload file">
                <button onClick={handleUpload} className="upload-button">Upload</button>
            </Tippy>
        </div>
    );
}
