import axiosClient from "../axios-client";

export const addFile = (formData, group_id) => axiosClient.post(`addFile/${group_id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteFile = (file_id) => axiosClient.post(`deleteFile/${file_id}`);

export const getfiles = (group_id) => axiosClient.get(`getfiles/${group_id}`);

export const lockFile = (formdata) => axiosClient.post(`lockFile`, formdata);
export const unlockFile = (formdata) => axiosClient.post(`unlockFile`, formdata);


export const exportFileReportToPdf = (file_id, type_id) => axiosClient.get(`exportFileReportToPdf/${file_id}/${type_id}`);
export const exportFileReportToCsv = (file_id, type_id) => axiosClient.get(`exportFileReportToCsv/${file_id}/${type_id}`);

export const makeBackUpFile = (fromdata, file_id) => axiosClient.post(`makeBackUpFile/${file_id}`, fromdata, {
    headers: { 'Content-Type': 'multipart/form-data' }
});


export const getFilesForCheck = (group_id) => axiosClient.get(`getFilesForCheck/${group_id}`);
export const fileRespond = (fromData, file_id) => axiosClient.post(`fileRespond/${file_id}`, fromData);


export const checkout = (fromData, file_id) => axiosClient.post(`checkout/${file_id}`, fromData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getFileBackUp = (file_id) => axiosClient.get(`getFileBackUp/${file_id}`);

// Route:: get('getFileBackUp/{file_id}', [BackUpController:: class, 'getFile']);


