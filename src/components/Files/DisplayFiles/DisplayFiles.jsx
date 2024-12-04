import React, { useEffect, useState } from 'react';
import './DisplayFiles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { lockFile, unlockFile, makeBackUpFile, checkout } from '../../../actions/FilesAction';
import axiosClient from '../../../axios-client';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function DisplayFiles() {
    const [selectedFile, setSelectedFile] = useState({ file: null });
    const dispatch = useDispatch();
    const { Files, ErrorMEsage, error } = useSelector((state) => state.FileReducer || []);
    const { data } = useSelector((state) => state.authReducer.authData);
    const { id } = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = (id) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            console.log(selectedFile);
            dispatch(makeBackUpFile(formData, id));
        } else {
            alert('Please select a file first.');
        }
    };

    const handleFileSelection = (fileId) => {
        setSelectedFiles(prevSelectedFiles => {
            if (prevSelectedFiles.includes(fileId)) {
                return prevSelectedFiles.filter(id => id !== fileId);
            } else {
                return [...prevSelectedFiles, fileId];
            }
        });
    };

    const downloadFile = async (fileId, name) => {
        let type = "";

        if (name[name.length - 4] == '.') {
            type = name?.toString().substring(name.length - 3, name.length)
        }
        else {
            type = name?.toString().substring(name.length - 4, name.length)
        }
        try {
            const response = await axiosClient({
                url: `DownloadFile/${fileId}`,
                method: 'GET',
                responseType: 'blob',
            }); console.log(response.data)

            const blob = new Blob([response.data], { type: `text/${type}` });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `file_report_${fileId}_.${type}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading CSV file:', error);
        }
    };


    const handleReportPdf = async (userId, type) => {
        try {
            const response = await axiosClient({
                url: `exportFileReportToPdf/${userId}/${type}`,
                method: 'GET',
                responseType: 'blob',
            });
            console.log(response.data)

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');


            link.href = URL.createObjectURL(blob);
            link.download = `file_report_${userId}_${type}.pdf`;
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }

    };
    const handleReportCsv = async (userId, type) => {

        try {
            const response = await axiosClient({
                url: `exportFileReportToCsv/${userId}/${type}`,
                method: 'GET',
                responseType: 'blob',
            }); console.log(response.data)

            const blob = new Blob([response.data], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `file_report_${userId}_${type}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading CSV file:', error);
        }
    };

    const handleLockFile = () => {
        const payload = { ids: selectedFiles };
        dispatch(lockFile(payload, data.id));
        setSelectedFiles([]);
    };
    const handleCheckOutFile = (id) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            console.log(selectedFile);
            dispatch(checkout(formData, id));
        } else {
            alert('Please select a file first.');
        }
    };

    const handleUnLockFile = () => {
        const payload = { ids: selectedFiles };
        dispatch(unlockFile(payload));
        setSelectedFiles([]);
    };

    const handleClick = () => {
        navigate(`/pendingFile/${id}`);
    }
    const BackFile = (id) => {
        navigate(`/BackFile/${id}`);
    }
    return (
        <>
            <div className="content-files">
                <Tippy Tippy content="this to lock the file for you">
                    <button className="btn-lock" onClick={handleLockFile}>Check In</button>
                </Tippy>
                <Tippy Tippy content="this to unlock the file so the other user can use it">
                    <button className="btn-unlock" onClick={handleClick}>Pending File</button>
                    {/* <Link to={`pendingFile/${id}`}>Pending File</Link> */}
                </Tippy>
            </div>
            <div className="files-grid">
                {
                    Files.length > 0 ? (
                        <>
                            {
                                Files.map(file => (
                                    <div key={file.id} className="file-card">
                                        <div class="file-badge">FILE</div>
                                        <h4 className="file-name">{file.file_name}</h4>
                                        <div className="card-btn">
                                            <div className='section'>
                                                <Tippy content="File mode to let you know if the file lock or not in lock">
                                                    <p>
                                                        Mood:{file.locked_by == null ? 'Not Locked' : 'Locked'}
                                                    </p>
                                                </Tippy>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFiles.includes(file.id)}
                                                    onChange={() => handleFileSelection(file.id)}
                                                />
                                            </div>
                                            <div className='btn-container'>
                                                <div className="btn-change">
                                                    <Tippy content="Download the file">
                                                        <button
                                                            disabled={true ? (file.status === 'pending' || (file.locked_by != data.id && file.locked_by != null)) : false}
                                                            className="download-button" onClick={() => downloadFile(file.id, file.file_name)}>Download</button>
                                                    </Tippy>

                                                    <div className="up-btn">
                                                        <Tippy content="Update the file">
                                                            <label className="update-button">
                                                                Select File
                                                                <input
                                                                    type="file"
                                                                    onChange={handleFileChange}
                                                                    style={{ display: "none" }}
                                                                />
                                                            </label>
                                                        </Tippy>
                                                        <button
                                                            className="update-button"
                                                            disabled={true ? (file.status === 'pending' || (file.locked_by != data.id && file.locked_by != null)) : (false && !selectedFile)}
                                                            onClick={() => handleCheckOutFile(file.id)}
                                                        >
                                                            CheckOut
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="btn-report">
                                                    <Tippy content="Get CSV file on which users make lock and unlock operation on the file">
                                                        <button
                                                            disabled={true ? (file.status === 'pending' || (file.locked_by != data.id && file.locked_by != null)) : false}
                                                            className="report-button" onClick={() => handleReportCsv(file.id, 1)}>Csv Report</button>
                                                    </Tippy>
                                                    <Tippy content="Get PDF file on which users make lock and unlock operation on the file">
                                                        <button
                                                            disabled={true ? (file.status === 'pending' || (file.locked_by != data.id && file.locked_by != null)) : false}
                                                            className="report-button" onClick={() => handleReportPdf(file.id, 1)}>Pdf Report</button>
                                                    </Tippy>
                                                    {/* <Link to={`/BackFile/${file.id}`}> */}
                                                    <Tippy content="See the BackUp of the file">
                                                        <button
                                                            disabled={true ? (file.status === 'pending' || (file.locked_by != data.id && file.locked_by != null)) : false}
                                                            className="report-button" onClick={() => BackFile(file.id)}>BackUP</button>
                                                    </Tippy>
                                                    {/* </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <h1>No files are found</h1>
                    )
                }
            </div>
        </>
    );
}
