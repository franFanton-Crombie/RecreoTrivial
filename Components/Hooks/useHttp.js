import {useReducer,useCallback,useEffect} from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null
};

function ingredientReducer(currentUsers, action){
    console.log('CURRENT ING Current: ',currentUsers);
    console.log('ACTION: Reducer',action);
    switch (action.type){
        case 'SET':
            return action.users;
        case 'ADD':
            return [...currentUsers, action.user];
        case 'DELETE':
            return currentUsers.filter(user => user.id !== action.id);
        default:
            throw new Error('Should not get there!');
    }
}

const httpReducer = (currentHttpState, action) => {
    console.log('CURRENT HTTP STATE: ',currentHttpState);
    console.log('ACTION HTTP STATE: ',action);
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier};
        case 'RESPONSE':
            return { ...currentHttpState, loading: false, data: action.responseData, extra: action.extra};
        case 'ERROR':
            return { loading: false, error: action.errorMessage};
        case 'CLEAR':
            return initialState;
        default: 
            throw new Error('Should not be reached!');
    }
}

const useHttp = () => {
    const [userIngredients, dispatch] = useReducer(ingredientReducer,[]);
    const [httpState,dispatchHttp] = useReducer(httpReducer, initialState);
    const sendRequest = useCallback((url,method,body,requestExtra,requestIdentifier) => {
        dispatchHttp({ type: 'SEND',identifier:requestIdentifier})
        fetch(url,{
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            dispatchHttp({ type: 'RESPONSE' , responseData: responseData , extra: requestExtra});
        }).catch(error => {
            dispatchHttp({type: 'ERROR', errorMessage: 'Something went wrong!'});
        });
    },[]);

    const addUsers = useCallback(user => {
        sendRequest(
            'https://react-hooks-update-2a961-default-rtdb.firebaseio.com/users.json',
            'POST',
            JSON.stringify(user),
            user,
            'ADD_USER'
        );
    },[sendRequest]);

    const filteredUsers = useCallback(filteredUsers => {
        dispatch({ type: 'SET', users: filteredUsers });
    }, []);

    const removeUsers = useCallback(userId => {
        sendRequest(
            `https://react-hooks-update-2a961-default-rtdb.firebaseio.com/users/${userId}.json`,
            'DELETE',
            null,
            userId,
            'REMOVE_USER'
        );
    },[sendRequest]);

    useEffect(() => {
        if(!httpState.loading && !httpState.error && httpState.identifier === 'REMOVE_USER'){
            dispatch({type: 'DELETE', id: httpState.extra}) 
        }
        else if(!httpState.loading && !httpState.error && httpState.identifier === 'ADD_USER'){
            dispatch({type: 'ADD' , user: {id: httpState.data.name, ...httpState.extra}});
        }
    },[httpState.data,httpState.extra,httpState.loading,httpState.error]);
    
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        addUsers,
        filteredUsers,
        removeUsers,
        userIngredients,
        sendRequest,
        
    };
};

export default useHttp;