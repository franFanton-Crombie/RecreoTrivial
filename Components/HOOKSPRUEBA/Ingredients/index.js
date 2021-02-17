import  React ,{ useEffect, useState , useCallback, useReducer, useMemo } from 'react';
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
    const { isLoading,error,data,sendRequest } = useHttp();
    const [userIngredients, dispatch] = useReducer(ingredientReducer,[]);
    const addIngredients = useCallback(ingredient => {
        /*dispatchHttp({type: 'SEND'});
        fetch('https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients.json',{
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        dispatchHttp({type: 'RESPONSE'});
        return response.json();
        }).then(responseData => {
            dispatch({type: 'ADD' , ingredient: {id: responseData.name, ...ingredient}});
        });*/
    },[]);

    const filteredIngredients = useCallback(filteredIngredients => {
        dispatch({ type: 'SET', ingredients: filteredIngredients });
    }, []);

    const removeIngredients = useCallback(ingredientId => {
        sendRequest(`https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,'DELETE');
    },[sendRequest]);

    const clearError = useCallback(() => {
        //dispatchHttp({type: 'CLEAR'});
    },[]);

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
