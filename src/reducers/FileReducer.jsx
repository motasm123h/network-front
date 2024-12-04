import { useSelector } from "react-redux";

const fileReducer = (state = { Files: [], checkFile: [], backupfile: [], loading: false, ErrorMEsage: [], error: false }, action) => {
    switch (action.type) {
        case 'CREATE_FILE_START':
            return { ...state, loading: true, error: false };
        case 'CREATE_FILE_SUCCESS':
            return {
                ...state,
                Files: [...state.Files, action.data],
                loading: false,
                error: false
            };

        case 'CREATE_FILE_FAIL':
            return { ...state, loading: false, error: true };

        case 'DELETE_FILE_START':
            return { ...state, loading: true, error: false }

        case "DELETE_FILE_SUCCESS":
            const Files = state.Files.filter((file) => file.id != action.data);
            return { ...state, Files: groups, loading: false, error: false }
        case "DELETE_FILE_FAIL":
            return { ...state, loading: false, error: true }

        case 'GET_FILE_START':
            return { ...state, loading: true, error: false }
        case "GET_FILE_SUCCESS":
            return { ...state, Files: action.data, loading: false, error: false }
        case "GET_FILE_FAIL":
            return { ...state, loading: false, error: true }


        case 'LOCK_FILE_START':
            return { ...state, loading: true, error: false }
        case "LOCK_FILE_SUCCESS":
            // const { data } = useSelector((state) => state?.authReducer?.authData || {});

            const updatedFiles = state.Files.map(file => {
                if (action.payload.data.ids.includes(file.id)) {
                    return {
                        ...file,
                        locked_by: action.payload.id,
                    };
                }
                return file;
            });

            return { ...state, Files: updatedFiles, loading: false, error: false };
        case "LOCK_FILE_FAIL":
            console.log(action.data)
            return { ...state, loading: false, ErrorMEsage: action.data.message, error: true }

        case 'UNLOCK_FILE_START':
            return { ...state, loading: true, error: false }
        case "UNLOCK_FILE_SUCCESS":
            const updatedFilesUnlock = state.Files.map(file => {
                if (action.data.ids.includes(file.id)) {
                    return {
                        ...file,
                        locked_by: null,
                    };
                }
                return file;
            });
            return { ...state, Files: updatedFilesUnlock, loading: false, error: false }
        case "UNLOCK_FILE_FAIL":
            return { ...state, loading: false, error: true }





        ///////////////////////////////////////////

        case 'GET_FILE_CHECK_START':
            return { ...state, loading: true, error: false }
        case "GET_FILE_CHECK_SUCCESS":
            return { ...state, checkFile: action.data, loading: false, error: false }
        case "GET_FILE_CHECK_FAIL":
            return { ...state, loading: false, error: true }


        case 'GET_BACKUP_FILE_START':
            return { ...state, loading: true, error: false }
        case "GET_BACKUP_FILE_SUCCESS":
            return { ...state, backupfile: action.data, loading: false, error: false }
        case "GET_BACKUP_FILE_FAIL":
            return { ...state, loading: false, error: true }


        case 'FILE_RESPOND_START':
            return { ...state, loading: true, error: false }
        case "FILE_RESPOND_SUCCESS":
            const checkfileEdit = state.checkFile.filter((file) => file.id != action.data)
            const fileEdit = state.Files.map((file) => {
                if (file.id === action.data) {
                    return { ...file, status: "approved" };
                }
                return file;
            })
            return { ...state, checkFile: checkfileEdit, Files: fileEdit, loading: false, error: false }
        case "FILE_RESPOND_FAIL":
            return { ...state, loading: false, error: true }



        case 'UPDATE_FILE_START':
            return { ...state, loading: true, error: false }
        case "UPDATE_FILE_SUCCESS":
            const FileAfterUpdate = state.Files.map((file) => {
                if (file.id == action.payload.id) {
                    return {
                        ...file,
                        ...action.payload.data.data
                    };
                }
                return file;
            })
            return { ...state, Files: FileAfterUpdate, loading: false, error: false }
        case "UPDATE_FILE_FAIL":
            return { ...state, loading: false, ErrorMEsage: action.data.message, error: true }



        //hereeeee
        case 'FILE_CHECK_START':
            return { ...state, loading: true, error: false }
        case "FILE_CHECK_SUCCESS":
            const Filecheckout = state.Files.map((file) => {
                if (file.id == action.data.id) {
                    return {
                        ...file, locked_at: null, locked_by: null, file_name: action.data.file_name
                    };
                }
                return file;
            })
            console.log(Filecheckout);
            return { ...state, Files: Filecheckout, loading: false, error: false }
        case "FILE_CHECK_FAIL":
            return { ...state, loading: false, ErrorMEsage: action.data.message, error: true }



        default:
            return state
    }
}

export default fileReducer