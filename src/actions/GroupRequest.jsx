import * as GroupRequest from '../api/GroupRequest'

export const createGroup = (formData) => async (dispatch) => {
    dispatch({ type: "CREATE_GROUP_START" })
    try {
        const { data } = await GroupRequest.createGroup(formData);
        console.log(data.data);
        dispatch({ type: "CREATE_GROUP_SUCCESS", data: data.data })

    } catch (err) {
        console.log(err)
        dispatch({ type: "CREATE_GROUP_FAIL", erorr: err })
    }
}

export const leaveGroup = (group_id) => async (dispatch) => {
    dispatch({ type: "LEAVE_GROUP_START" })
    try {
        await GroupRequest.leaveGroup(group_id);
        dispatch({ type: "LEAVE_GROUP_SUCCESS", data: group_id })

    } catch (err) {
        console.log(err)
        dispatch({ type: "LEAVE_GROUP_FAIL" })
    }
}

export const joinGroup = (group_id) => async (dispatch) => {
    dispatch({ type: "JOIN_GROUP_START" })
    try {
        await GroupRequest.joinGroup(group_id)
        dispatch({ type: "JOIN_GROUP_SUCCESS", data: group_id })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "JOIN_GROUP_FAIL" })
    }
}

export const getMyGroup = () => async (dispatch) => {
    dispatch({ type: "GET_MY_GROUP_START" })
    try {
        const { data } = await GroupRequest.getMyGroup()
        dispatch({ type: "GET_MY_GROUP_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_MY_GROUP_FAIL" })
    }
}
export const receivedInvitations = () => async (dispatch) => {
    dispatch({ type: "GET_MY_INVITATION_START" })
    try {
        const { data } = await GroupRequest.receivedInvitations()
        dispatch({ type: "GET_MY_INVITATION_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_MY_INVITATION_FAIL" })
    }
}


export const getGroupsPeople = (id) => async (dispatch) => {
    dispatch({ type: "GET_MY_GROUP_POEPLE_START" })
    try {
        const { data } = await GroupRequest.getGroupsPeople(id)
        dispatch({ type: "GET_MY_GROUP_POEPLE_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_MY_GROUP_POEPLE_FAIL" })
    }
}


export const getPeopleNotGroup = (id) => async (dispatch) => {
    dispatch({ type: "GET_MY_NOT_GROUP_POEPLE_START" })
    try {
        const { data } = await GroupRequest.getPeopleNotGroup(id)
        dispatch({ type: "GET_MY_NOT_GROUP_POEPLE_SUCCESS", data: data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_MY_NOT_GROUP_POEPLE_FAIL" })
    }
}



export const invitationsSend = (formData) => async (dispatch) => {
    dispatch({ type: "INVITAION_SEND_START" })
    try {
        const { data } = await GroupRequest.invitationsSend(formData)
        dispatch({ type: "INVITAION_SEND_SUCCESS", data: formData['receiver_id'] })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "INVITAION_SEND_FAIL" })
    }
}


export const invitationsRespond = (formdata, invi_id) => async (dispatch) => {
    dispatch({ type: "INVITAION_RESPONS_START" })
    try {
        const { data } = await GroupRequest.invitationsRespond(formdata, invi_id)
        dispatch({ type: "INVITAION_RESPONS_SUCCESS", data: invi_id })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "INVITAION_RESPONS_FAIL" })
    }
}
export const search = (formdata, group_id) => async (dispatch) => {
    dispatch({ type: "SEARCH_START" })
    try {
        const { data } = await GroupRequest.search(formdata, group_id)
        dispatch({ type: "SEARCH_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "SEARCH_FAIL" })
    }
}

export const sendInvitations = () => async (dispatch) => {
    dispatch({ type: "GET_SEND_INVITATION_START" })
    try {
        const { data } = await GroupRequest.sendInvitations()
        dispatch({ type: "GET_SEND_INVITATION_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_SEND_INVITATION_FAIL" })
    }
}
export const deleteInvitations = (invID) => async (dispatch) => {
    dispatch({ type: "DELETE_INVITATION_START" })
    try {
        await GroupRequest.deleteInvitations(invID)
        dispatch({ type: "DELETE_INVITATION_SUCCESS", data: invID })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "DELETE_INVITATION_FAIL" })
    }
}


export const getGroups = () => async (dispatch) => {
    dispatch({ type: "GET_GROUP_START" })
    try {
        const { data } = await GroupRequest.getGroups()
        dispatch({ type: "GET_GROUP_SUCCESS", data: data.data })
    }
    catch (err) {
        console.log(err)
        dispatch({ type: "GET_GROUP_FAIL" })
    }
}