import React from 'react';
import {View,Text} from 'react-native';

const Ingredientlist = props => {
    return(
        <View>
            <Text>List of Ingredient</Text>
            {props.ingredients.map()}
        </View>
    );
};
export default Ingredientlist;