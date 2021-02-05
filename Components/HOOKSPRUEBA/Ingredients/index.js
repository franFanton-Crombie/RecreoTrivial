import React from 'react';
import { SafeAreaView, View } from 'react-native';
import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients(){
    return (
        <SafeAreaView>
            <View>
                <IngredientForm />                
            </View>
            <View>
                <Search />
            </View>
        </SafeAreaView>
    );
};

export default Ingredients;
