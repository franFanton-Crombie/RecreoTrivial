import  React ,{ useEffect, useState , useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IngredientForm from './IngredientForm';
import Ingredientlist from './IngredientList';
import Search from './Search';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading , setLoading] = useState(false);
    const [error , setError] = useState();

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
            setIngredients(prevIngredients => 
                [...prevIngredients ,{id: responseData.name, ...ingredient}]);    
        });
    }

    const filteredIngredients = useCallback(filteredIngredients => {
        setIngredients(filteredIngredients);
    }, []);

    const removeIngredients = ingredientId => {
        setLoading(true);
        fetch(`https://react-hooks-update-2a961-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,{
        method: 'DELETE',
        }).then(response => {
            setLoading(false);
            setIngredients(prevIngredients => 
                prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
        }).catch(error => {
            setError(error.message);
        });
    }

    const clearError = () => {
        setError(null);
        setLoading(false);
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> : null }
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
