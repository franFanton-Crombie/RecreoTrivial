import  React ,{ useEffect, useState , useCallback, useReducer } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IngredientForm from './IngredientForm';
import Ingredientlist from './IngredientList';
import Search from './Search';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';

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
    const [userIngredients, dispatch] = useReducer(ingredientReducer,[]);
    //const [ingredients, setIngredients] = useState([]);
    const [isLoading , setLoading] = useState(false);
    const [error , setError] = useState(false);

    const addIngredients = ingredient => {
        setLoading(true);
        fetch('https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients.json',{
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        setLoading(false);
        return response.json();
        }).then(responseData => {
            //setIngredients(prevIngredients => 
              //  [...prevIngredients ,{id: responseData.name, ...ingredient}]);
            dispatch({type: 'ADD' , ingredient: {{id: responseData.name, ...ingredient}}});
        });
    }

    const filteredIngredients = useCallback(filteredIngredients => {
        //setIngredients(filteredIngredients);
        dispatch({ type: 'SET', ingredients: filteredIngredients });
    }, []);

    const removeIngredients = ingredientId => {
        setLoading(true);
        fetch(`https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,{
        //fetch(`https://asdadsradsaasdadsn`,{
        method: 'DELETE',
        }).then(response => {
            setLoading(false);
            setIngredients(prevIngredients => 
                prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
        }).catch(error => {
            console.log('ERROR');
            setError(true);
            setLoading(true);
        });
    }

    const clearError = () => {
        setError(null);
        setLoading(false);
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <IngredientForm 
                        onAddIngredient={addIngredients}
                    />                
                </View>
                <View>
                { isLoading ? <LoadingIndicator /> : null}
                </View>
                <View>
                    <Search onLoadedIngredients={filteredIngredients}/>
                    <Ingredientlist 
                        ingredients={ingredients} 
                        onRemoveIngredient={removeIngredients}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Ingredients;
