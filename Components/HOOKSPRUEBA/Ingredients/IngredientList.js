import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Ingredientlist = (props) => {
    const { onRemoveIngredient } = props;
    const { ingredients } = props;
    
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>List of Ingredient</Text>
            {ingredients.map(index => (
                <View style={styles.lista}>
                    <Text style={styles.text}>
                        Name: {index.name}
                    </Text>
                    <Text style={styles.text}>
                        Amount: {index.amount}
                    </Text>
                    <TouchableOpacity 
                        style={styles.buttonDelete}
                        onPress={() => onRemoveIngredient(index.id)}
                        >
                        <Text>
                            X
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#5885FD'
    },
    titulo: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    lista:{
        flexDirection: 'row',
        marginTop: 10
    },
    text: {
        margin: 5,
        width:150
    },
    buttonDelete: {
        backgroundColor: 'red',
        marginLeft: 20,
        borderRadius: 10,
        padding: 5

    }
});

export default Ingredientlist;