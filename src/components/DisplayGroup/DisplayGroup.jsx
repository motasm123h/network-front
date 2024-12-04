import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './DisplayGroup.scss';
import { getGroups, getMyGroup, joinGroup, leaveGroup } from '../../actions/GroupRequest';
import { Link } from 'react-router-dom';
export default function DisplayGroup(props) {

    const { groups, GO } = useSelector((state) => state.groupReducer || []);
    const [localGroups, setLocalGroups] = useState(groups);

    useEffect(() => {
        if (props.type == 1) {
            setLocalGroups(GO);
        }
        else {
            setLocalGroups(groups);
        }
    }, [props.type, GO, groups]);
    const dispatch = useDispatch();

    const handleJoinGroup = (groupId) => {
        dispatch(joinGroup(groupId));
        alert("ohaa you are joined");
    };

    const handledeleteGroup = (groupId) => {
        dispatch(leaveGroup(groupId));
    };

    useEffect(() => {
        dispatch(getMyGroup())
        dispatch(getGroups())
    }, [])
    return (
        <div className="groups-grid">
            {
                localGroups && localGroups.length > 0 ? (
                    localGroups.map((group, index) => (
                        <div key={index} className="group-card">
                            <div class="group-badge">GROUP</div>
                            <h3 className="group-name">{group.name}</h3>
                            {
                                props.type == 1 ? (
                                    <button
                                        className="join-button"
                                        onClick={() => handleJoinGroup(group.id)}
                                    >
                                        Join
                                    </button>
                                ) : (
                                    <div className="btn-go">
                                        <button
                                            className="delete-button"
                                            onClick={() => handledeleteGroup(group.id)}
                                        >
                                            Leave
                                        </button>
                                            <Link to={`/groups/${group.id}`} className="inf-button">
                                            Files
                                        </Link>
                                        {
                                            group.is_admin ?
                                                    <Link to={`/groupsPoeple/${group.id}`} className="inf-button">
                                                    People
                                                </Link> : ''
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <h1>No groups are found</h1>
                )
            }
        </div>
    )
}
