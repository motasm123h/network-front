import React, { useEffect, useState } from 'react';
import './DisplayPeopleGr.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupsPeople } from '../../actions/GroupRequest';


import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
export default function DisplayPeopleGr() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { people } = useSelector((state) => state.groupReducer || [])
    const { data } = useSelector((state) => state.authReducer.authData || [])
    useEffect(() => {
        dispatch(getGroupsPeople(id));
    }, [id]);
    const handledeleteGroup = (groupId) => {
        dispatch(leaveGroup(groupId));
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
    return (
        <div className="begain">
            <div>
                <Link to={`/groupsInvite/${id}`} className="nn">
                    Add People
                </Link>
            </div>
            <div className="groups-grid">
                {
                    people && people.length > 0 ? (
                        people.map((peopl, index) => (
                            <div key={index} className="group-card">
                                <h3 className="group-name">{peopl.name}</h3>
                                <div className="btn-container">


                                    <button
                                        className="delete-button"
                                        onClick={() => handleReportPdf(peopl.id, 2)}
                                    >
                                        pdf report
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleReportCsv(peopl.id, 2)}
                                    >
                                        csv report
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No people are found</h1>
                    )
                }
            </div>
        </div>

    )
}
