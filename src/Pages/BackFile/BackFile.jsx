import React, { useEffect } from 'react'
import './BackFile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFileBackUp } from '../../actions/FilesAction';
import axiosClient from '../../axios-client';
export default function BackFile() {
    const { backupfile } = useSelector((state) => state.FileReducer || []);
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getFileBackUp(id))
    }, [id])
    console.log(backupfile);

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

    return (
        <>

            <div className="files-grid">
                {
                    backupfile.length > 0 ? (
                        <>
                            {
                                backupfile.map(file => (
                                    <div key={file.id} className="file-card">
                                        <div class="file-badge">FILE</div>
                                        <h5 className="file-name">FileName : <h6>{file.name}</h6></h5>
                                        <div className="card-btn">
                                            <div className='btn-container'>
                                                <div className="btn-change">
                                                    {/* <Tippy content="Download the file"> */}
                                                    {/* <button
                                                        className="download-button" onClick={() => downloadFile(file.id, file.name)}>Download</button> */}
                                                    {/* </Tippy> */}

                                                    <div className="up-btn">


                                                    </div>
                                                </div>
                                                <div className="btn-report">
                                                    <lable>Edit by:</lable>
                                                    <h5>{file.editor_name}</h5>

                                                </div>
                                                <div className="btn-report">
                                                    <lable>update at:</lable>
                                                    <h5>{file.updated_at}</h5>

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
