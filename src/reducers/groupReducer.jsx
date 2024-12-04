const groupReducer = (state = { groups: [], GO: [], NOTGO: [], search: [], INVITIATIONSend: [], INVITIATION: [], people: [], loading: false, error: false }, action) => {
    switch (action.type) {
        case 'CREATE_GROUP_START':
            return { ...state, loading: true, error: false };
        case 'CREATE_GROUP_SUCCESS':
            return {
                ...state,
                groups: [...state.groups, action.data],
                loading: false,
                error: false
            };
        case 'CREATE_GROUP_FAIL':
            return { ...state, loading: false, error: true };

        case 'LEAVE_GROUP_START':
            return { ...state, loading: true, error: false }
        case "LEAVE_GROUP_SUCCESS":
            console.log(action.data);
            const groups = state.groups.filter((group) => group.id != action.data);
            return { ...state, groups: groups, loading: false, error: false }
        case "LEAVE_GROUP_FAIL":
            return { ...state, loading: false, error: true }

        case 'JOIN_GROUP_START':
            return { ...state, loading: true, error: false }
        case "JOIN_GROUP_SUCCESS":

            const go = state.GO.filter((go) => go.id != action.data);
            return { ...state, GO: go, loading: false, error: false }
        case "JOIN_GROUP_FAIL":
            return { ...state, loading: false, error: true }


        case 'GET_MY_GROUP_START':
            return { ...state, loading: true, error: false }
        case "GET_MY_GROUP_SUCCESS":
            return { ...state, groups: action.data, loading: false, error: false }
        case "GET_MY_GROUP_FAIL":
            return { ...state, loading: false, error: true }

        case 'GET_MY_GROUP_POEPLE_START':
            return { ...state, loading: true, error: false }
        case "GET_MY_GROUP_POEPLE_SUCCESS":
            return { ...state, people: action.data, loading: false, error: false }
        case "GET_MY_GROUP_POEPLE_FAIL":
            return { ...state, loading: false, error: true }

        case 'GET_GROUP_START':
            return { ...state, loading: true, error: false }
        case "GET_GROUP_SUCCESS":
            return { ...state, GO: action.data, loading: false, error: false }
        case "GET_GROUP_FAIL":
            return { ...state, loading: false, error: true }

        case 'GET_MY_INVITATION_START':
            return { ...state, loading: true, error: false }
        case "GET_MY_INVITATION_SUCCESS":
            return { ...state, INVITIATION: action.data, loading: false, error: false }
        case "GET_MY_INVITATION_FAIL":
            return { ...state, loading: false, error: true }




        case 'SEARCH_START':
            return { ...state, loading: true, error: false }
        case "SEARCH_SUCCESS":
            // console.log(action.data)
            return { ...state, search: action.data, loading: false, error: false }
        case "SEARCH_FAIL":
            return { ...state, loading: false, error: true }



        case 'GET_SEND_INVITATION_START':
            return { ...state, loading: true, error: false }
        case "GET_SEND_INVITATION_SUCCESS":
            // console.log(action.data)
            return { ...state, INVITIATIONSend: action.data, loading: false, error: false }
        case "GET_SEND_INVITATION_FAIL":
            return { ...state, loading: false, error: true }


        case 'DELETE_INVITATION_START':
            return { ...state, loading: true, error: false }
        case "DELETE_INVITATION_SUCCESS":
            console.log(action.data)
            const inv = state.INVITIATIONSend.filter((invi) => invi.id === action.data)
            return { ...state, INVITIATIONSend: inv, loading: false, error: false }
        case "DELETE_INVITATION_FAIL":
            return { ...state, loading: false, error: true }



        case 'GET_MY_NOT_GROUP_POEPLE_START':
            return { ...state, loading: true, error: false }
        case "GET_MY_NOT_GROUP_POEPLE_SUCCESS":
            return { ...state, NOTGO: action.data, loading: false, error: false }
        case "GET_MY_NOT_GROUP_POEPLE_FAIL":
            return { ...state, loading: false, error: true }


        case 'INVITAION_SEND_START':
            return { ...state, loading: true, error: false }
        case "INVITAION_SEND_SUCCESS":
            const notgo = state.NOTGO.filter((notgo) => notgo.id != action.data);
            const searchEdit = state.search.filter((s) => s.id != action.data);
            return { ...state, NOTGO: notgo, search: searchEdit, loading: false, error: false }
        case "INVITAION_SEND_FAIL":
            return { ...state, loading: false, error: true }


        case 'INVITAION_RESPONS_START':
            return { ...state, loading: true, error: false }
        case "INVITAION_RESPONS_SUCCESS":
            const INVITIATION = state.INVITIATION.filter((inv) => inv.id != action.data);
            return { ...state, loading: false, error: false }
        case "INVITAION_RESPONS_FAIL":
            return { ...state, loading: false, error: true }


        default:
            return state
    }
}

export default groupReducer