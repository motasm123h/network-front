import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteInvitations, invitationsRespond, receivedInvitations, sendInvitations } from '../../actions/GroupRequest';
import './Invitiation.scss';
export default function Invitiation() {

    const dispatch = useDispatch();
    const { INVITIATION, INVITIATIONSend } = useSelector((state) => state.groupReducer || [])
    const [type, setType] = useState(0);
    const [invitiation, setInvitiation] = useState([]);
    useEffect(() => {
        if (type == 0) {
            setInvitiation(INVITIATIONSend || []);

        } else {
            setInvitiation(INVITIATION || []);

        }
    }, [type, INVITIATION, INVITIATIONSend]);

    const handleSendInvitationAccept = async (id) => {
        const payload = {
            status: "accepted",
        }
        dispatch(invitationsRespond(payload, id))
    };
    const handleSendInvitationReject = async (id) => {
        const payload = {
            status: "rejected",
        }
        dispatch(invitationsRespond(payload, id))
    };
    const handleGetSendInvitation = async () => {
        dispatch(sendInvitations())
        setType(0);
    };
    const handleGetReciveInvitation = async () => {
        dispatch(receivedInvitations())
        setType(1);
    };
    const handledeleteInvitations = async (invID) => {
        dispatch(deleteInvitations(invID))
    };

    return (
        <div className="invitation-container">
            <button onClick={handleGetSendInvitation} className="send-inv">Invitations Sent</button>
            <button onClick={handleGetReciveInvitation} className="send-inv">Invitations Received</button>{invitiation && invitiation.length > 0 ? (
                <div className="invitation-list">
                    {invitiation.map((invite) => (
                        <div key={invite.id} className="invitation-card">
                            <h3>{invite.group?.name || 'Group Name Missing'}</h3>
                            {type === 0 ? (
                                <p>Send to: {invite.receiver?.name || 'Receiver Missing'}</p>
                            ) : (
                                <p>Invited by: {invite.sender?.name || 'Sender Missing'}</p>
                            )}
                            <div className="invitation-actions">
                                {type === 0 ? (
                                    <button
                                        className="reject-button"
                                        onClick={() => handledeleteInvitations(invite.id)}
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="accept-button"
                                            onClick={() => handleSendInvitationAccept(invite.id)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="reject-button"
                                            onClick={() => handleSendInvitationReject(invite.id)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No invitations found.</p>
            )}
        </div>
    );
}
