import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGroup } from './../../actions/GroupRequest';
import './CreateGroup.scss';

export default function CreateGroup() {
    const [group, setGroup] = useState({ name: '' });
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (group.name.trim()) {
            dispatch(createGroup(group));  // Pass the object with the 'name' attribute
            setGroup({ name: '' });  // Clear input after submission
        } else {
            alert("Please enter a valid group name.");
        }
    };
    return (
        <div className="create-group-form">
            <h2>Create a New Group</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={group.name}
                    onChange={(e) => setGroup({ ...group, name: e.target.value })}
                    placeholder="Enter group name"
                />
                <button type="submit">Create Group</button>
            </form>
        </div>
    )
}
