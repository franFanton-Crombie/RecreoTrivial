import {useReducer,useCallback,useEffect} from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    identifier: null
};

function ingredientReducer(currentIngredients, action){
    switch (action.type){
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ing => ing.id !== action.id);
        default:
            throw new Error('Should not get there!');
    }
}

const httpReducer = (currentHttpState, action) => {
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
    console.log('Ingredients:' ,userIngredients);
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

    const addIngredients = useCallback(ingredient => {
        sendRequest(
            'https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients.json',
            'POST',
            JSON.stringify(ingredient),
            ingredient,
            'ADD_INGREDIENT'
        );
    },[sendRequest]);

    const filteredIngredients = useCallback(filteredIngredients => {
        dispatch({ type: 'SET', ingredients: filteredIngredients });
    }, []);

    const removeIngredients = useCallback(ingredientId => {
        sendRequest(
            `https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
            'DELETE',
            null,
            ingredientId,
            'REMOVE_INGREDIENT'
        );
    },[sendRequest]);

    useEffect(() => {
        if(!httpState.loading && !httpState.error && httpState.identifier === 'REMOVE_INGREDIENT'){
            dispatch({type: 'DELETE', id: httpState.extra}) 
        }
        else if(!httpState.loading && !httpState.error && httpState.identifier === 'ADD_INGREDIENT'){
            dispatch({type: 'ADD' , ingredient: {id: httpState.data.name, ...httpState.extra}});
        }
    },[httpState.data,httpState.extra,httpState.loading,httpState.error]);
    
    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        addIngredients,
        filteredIngredients,
        removeIngredients,
        userIngredients,
        sendRequest,
        
    };
};

export default useHttp;