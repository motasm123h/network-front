import axios from 'axios';
import * as FilesRequest from '../api/FilesRequest'

export const addFile = (formData, group_id) => async (dispatch) => {
    dispatch({ type: "CREATE_FILE_START" })
    try {
        // const { data } = await axios.post(`api/addFile/${group_id}`, formData, {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // });
        const { data } = await FilesRequest.addFile(formData, group_id);
        // console.log(data);
        dispatch({ type: "CREATE_FILE_SUCCESS", data: data.data })

    } catch (err) {
        console.log(err)
        dispatch({ type: "CREATE_FILE_FAIL", erorr: err })
    }
}

export const deleteFile = (file_id) => async (dispatch) => {
    dispatch({ type: "DELETE_FILE_START" })
    try {
        await FilesRequest.deleteFile(file_id);
        dispatch({ type: "DELETE_FILE_SUCCESS", data: file_id })

    } catch (err) {
        console.log(err)
        dispatch({ type: "DELETE_FILE_FAIL" })
    }
}
export const getFileBackUp = (file_id) => async (dispatch) => {
    dispatch({ type: "GET_BACKUP_FILE_START" })
    try {
        const { data } = await FilesRequest.getFileBackUp(file_id);
        dispatch({ type: "GET_BACKUP_FILE_SUCCESS", data: data.data })

    } catch (err) {
        console.log(err)
        dispatch({ type: "GET_BACKUP_FILE_FAIL" })
    }
}

export const getfiles = (group_id) => async (dispatch) => {
    dispatch({ type: "GET_FILE_START" })
    try {
        const { data } = await FilesRequest.getfiles(group_id)
        dispatch({ type: "GET_FILE_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: "GET_FILE_FAIL", data: err.message
        })
    }
}

// export const lockFile = (formdata) => async (dispatch) => {
//     dispatch({ type: "LOCK_FILE_START" })
//     try {
//         await FilesRequest.lockFile(formdata)
//         dispatch({ type: "LOCK_FILE_SUCCESS", data: formdata })
//     }
//     catch (err) {
//         console.log(err)
//         dispatch({ type: "LOCK_FILE_FAIL", data: err })
//     }
// }


export const lockFile = (formdata, id) => async (dispatch) => {
    dispatch({ type: "LOCK_FILE_START" });
    try {
        await FilesRequest.lockFile(formdata);
        dispatch({ type: "LOCK_FILE_SUCCESS", payload: { data: formdata, id: id } });
    } catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "An unexpected error occurred";
        console.log(errorMessage)
        dispatch({ type: "LOCK_FILE_FAIL", data: { message: errorMessage } });
    }
};

export const exportFileReportToPdf = (file_id, type_id) => async (dispatch) => {
    dispatch({ type: "EXPORT_FILE_PDF_START" })
    try {
        await FilesRequest.exportFileReportToPdf(file_id, type_id)
        dispatch({ type: "EXPORT_FILE_PDF_SUCCESS" })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "EXPORT_FILE_PDF_FAIL" })
    }
}
export const exportFileReportToCsv = (file_id, type_id) => async (dispatch) => {
    dispatch({ type: "EXPORT_FILE_PDF_START" })
    try {
        await FilesRequest.exportFileReportToCsv(file_id, type_id)
        dispatch({ type: "EXPORT_FILE_PDF_SUCCESS" })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "EXPORT_FILE_PDF_FAIL" })
    }
}

export const getFilesForCheck = (group_id) => async (dispatch) => {
    dispatch({ type: "GET_FILE_CHECK_START" })
    try {
        const { data } = await FilesRequest.getFilesForCheck(group_id)
        dispatch({ type: "GET_FILE_CHECK_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_FILE_CHECK_FAIL" })
    }
}
export const fileRespond = (fromData, file_id) => async (dispatch) => {
    dispatch({ type: "FILE_RESPOND_START" })
    try {
        await FilesRequest.fileRespond(fromData, file_id)
        dispatch({ type: "FILE_RESPOND_SUCCESS", data: file_id })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "FILE_RESPOND_FAIL" })
    }
}
export const checkout = (fromData, file_id) => async (dispatch) => {
    dispatch({ type: "FILE_CHECK_START" })
    try {
        const { data } = await FilesRequest.checkout(fromData, file_id)
        console.log(data)
        dispatch({ type: "FILE_CHECK_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "FILE_CHECK_FAIL" })
    }
}


export const unlockFile = (formdata) => async (dispatch) => {
    dispatch({ type: "UNLOCK_FILE_START" })
    try {
        await FilesRequest.unlockFile(formdata)
        dispatch({ type: "UNLOCK_FILE_SUCCESS", data: formdata })
    }
    catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "An unexpected error occurred";
        console.log(errorMessage)
        dispatch({ type: "UNLOCK_FILE_FAIL", data: { message: errorMessage } })
    }
}


export const makeBackUpFile = (fromdata, id) => async (dispatch) => {
    dispatch({ type: "UPDATE_FILE_START" })
    try {
        const { data } = await FilesRequest.makeBackUpFile(fromdata, id)
        dispatch({ type: "UPDATE_FILE_SUCCESS", payload: { data: data, id: id } })
    }
    catch (err) {
        const errorMessage =
            err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : "An unexpected error occurred";
        console.log(errorMessage)
        dispatch({ type: "UPDATE_FILE_FAIL", data: { message: errorMessage } })
    }
}