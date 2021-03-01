import  React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import IngredientForm from './IngredientForm';
import Ingredientlist from './IngredientList';
import Search from './Search';
import LoadingIndicator from '../UI/LoadingIndicator';
import useHttp from '../Hooks/useHttp';

const Ingredients = () => {
    const { isLoading,userIngredients,addIngredients,filteredIngredients,removeIngredients } = useHttp();

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
                    <Ingredientlist 
                        ingredients={userIngredients} 
                        onRemoveIngredient={removeIngredients}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Ingredients;
