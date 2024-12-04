import axiosClient from "../axios-client";



export const createGroup = (formData) => axiosClient.post(`startGroups`, formData);
export const leaveGroup = (group_id) => axiosClient.post(`leaveGroups/${group_id}`);
export const joinGroup = (group_id) => axiosClient.post(`joinGroups/${group_id}`);

export const getMyGroup = () => axiosClient.get('myGroup');
export const getGroups = () => axiosClient.get('getGroups');
export const getGroupsPeople = (groups_id) => axiosClient.get(`getPoepleGroups/${groups_id}`);

export const getPeopleNotGroup = (groups_id) => axiosClient.get(`groups/${groups_id}/users-not-in`);
export const invitationsSend = (formData) => axiosClient.post(`invitations/send`, formData);
//under
export const invitationsRespond = (formdata, invi_id) => axiosClient.post(`invitations/respond/${invi_id}`, formdata);
//
export const receivedInvitations = () => axiosClient.get(`receivedInvitations`);

export const search = (formData, group_id) => axiosClient.post(`serachPeople/${group_id}`, formData);

export const sendInvitations = () => axiosClient.get(`sendInvitations`);

export const deleteInvitations = (invID) => axiosClient.get(`deleteInvitations/${invID}`);

// Route:: get('sendInvitations', [InvitationController:: class, 'sentInvitations']);
// Route:: get('deleteInvitations/{invID}', [InvitationController:: class, 'deleteInvitations']);

