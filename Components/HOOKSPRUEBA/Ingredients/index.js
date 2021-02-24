import  React ,{ useCallback, useReducer, useMemo, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IngredientForm from './IngredientForm';
import Ingredientlist from './IngredientList';
import Search from './Search';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../Hooks/useHttp';

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

const Ingredients = () => {
    const { isLoading,error,data,sendRequest,requestExtra,requestIdentifier,clear } = useHttp();
    const [userIngredients, dispatch] = useReducer(ingredientReducer,[]);

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

    const clearError = useCallback(() => {
        clear();
    },[]);

    useEffect(() => {
        if(!isLoading && !error && requestIdentifier === 'REMOVE_INGREDIENT'){
            dispatch({type: 'DELETE', id: requestExtra}) 
        }
        else if(!isLoading && !error && requestIdentifier === 'ADD_INGREDIENT'){
            dispatch({type: 'ADD' , ingredient: {id: data.name, ...requestExtra}});
        }
    },[data,requestExtra,isLoading,error]);

    const ingredientList = useMemo(() => {
        return(
            <Ingredientlist 
            ingredients={userIngredients} 
            onRemoveIngredient={removeIngredients}
            />
        );
    },[userIngredients,removeIngredients]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <IngredientForm 
                        onAddIngredient={addIngredients}
                        loading={isLoading}
                    />                
                </View>
                <View>
                { isLoading ? <LoadingIndicator /> : null}
                </View>
                <View>
                    <Search onLoadedIngredients={filteredIngredients}/>
                    {ingredientList}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Ingredients;
