import React, { useEffect } from 'react'
import './PFile.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fileRespond, getFilesForCheck } from '../../actions/FilesAction';
import axiosClient from '../../axios-client';
export default function PFile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { checkFile } = useSelector((state) => state.FileReducer || []);
    useEffect(() => {
        dispatch(getFilesForCheck(id));
        console.log(checkFile)
    }, [id])
    const downloadFile = async (fileId, name) => {
        console.log(name)
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
    const handleApprove = (id) => {
        const payload = {
            status: "approved"
        }
        dispatch(fileRespond(payload, id))
    };

    const handleReject = (id) => {
        const payload = {
            status: "rejected"
        }
        dispatch(fileRespond(payload, id))
    };
    return (
        <div className="file-list">
            {checkFile && checkFile.length > 0 ? (
                checkFile.map((file) => (
                    <div className="file-card" key={file.id}>
                        <div className="file-details">
                            <p><strong>File Name:</strong> {file.file_name}</p>
                            <p><strong>Status:</strong> {file.status}</p>
                            <p><strong>Created At:</strong> {file.created_at}</p>
                        </div>
                        <div className="file-actions">
                            <button
                                className="btn-approve"
                                onClick={() => handleApprove(file.id)}
                            >
                                Approve
                            </button>
                            <button
                                className="btn-reject"
                                onClick={() => handleReject(file.id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn-reject"
                                onClick={() => downloadFile(file.id, file.file_name)}
                            >
                                download
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No files found</p>
            )}
        </div>
    );
}
