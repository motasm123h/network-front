import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPeopleNotGroup, invitationsSend, search as se } from '../../actions/GroupRequest';
import './GroupsInvite.scss'
export default function GroupsInvite() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [content, setConsent] = useState("");
    const [check, setCheck] = useState(false);
    const { NOTGO, search } = useSelector((state) => state.groupReducer || [])
    const [localGroups, setLocalGroups] = useState(NOTGO);
    useEffect(() => {
        dispatch(getPeopleNotGroup(id))
    }, [id]);

    const handleSendInvitation = async (userId) => {
        const payload = {
            receiver_id: userId,
            group_id: id,
        }
        dispatch(invitationsSend(payload))
    };
    const handelChange = (e) => {
        setConsent(e.target.value)
    }
    const handleSearch = async () => {
        if (!content || content.trim() === "") {
            console.error("Content is required!");
            return;
        }

        const payload = {
            content: content.trim(),
        };
        dispatch(se(payload, id));
        setCheck(true);
        setConsent("")
    };

    useEffect(() => {
        if (check == true) {

            setLocalGroups(search);
        }
        else {
            setLocalGroups(NOTGO);
        }
    }, [check, search,]);
    return (
        <div className="all-filled">
            <div className="search-btn">
                <div>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        required
                        name="content"
                        value={content}
                        onChange={handelChange}
                    />
                    <button
                        className="invite-button"
                        onClick={() => handleSearch()}
                    >
                        Search
                    </button>
                </div>
                <button
                    className="invite-button"
                    onClick={() => setCheck(false)}
                >
                    Back
                </button>
            </div>
            <div className="container">

                <>

                    {
                        localGroups && localGroups.length > 0 ? (
                            localGroups.map((notgo, index) => (
                                <div key={index} className="group-card">
                                    <h3 className="group-name">{notgo.name}</h3>
                                    <h4 className="group-email">{notgo.email}</h4>
                                    <button
                                        className="invite-button"
                                        onClick={() => handleSendInvitation(notgo.id)}
                                    >
                                        Send Invitation
                                    </button>
                                </div>
                            ))
                        ) : (
                            <h1 className="no-people">No people are found</h1>
                        )
                    }
                </>
            </div>
        </div>

    )
}
