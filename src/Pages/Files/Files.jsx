import './Files.scss'
import React, { useEffect } from 'react'
import UploadFile from '../../components/Files/UploadFile/UploadFile'
import DisplayFiles from '../../components/Files/DisplayFiles/DisplayFiles'
import { useDispatch } from 'react-redux'
import { getfiles } from '../../actions/FilesAction'
import { useParams } from 'react-router-dom'
export default function Files() {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getfiles(id));
    }, [])
    return (
        <div>
            <UploadFile />
            <DisplayFiles />
        </div>
    )
}
