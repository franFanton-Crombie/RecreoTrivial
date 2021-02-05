import React, { useState } from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../UI/Card';

const IngredientForm = () => {
    const [name , setName] = useState('');
    const [amount, setAmount] = useState('');

    const imprimir = (name,amount) => {
        console.log(name,amount)
    };
    const submitHandler = event => {
        event.preventDefault();
    };
    
    return(
        <View style={styles.container}>
            <View style={{flexDirection:'column'}}>
                <View style={styles.vistaRow}>
                    <Text style={styles.title}>Name: </Text>
                    <TextInput 
                        style={styles.input} 
                        value={name}
                        onChangeText={name => {
                            setName(name)
                        }}/>
                </View>
                <View style={styles.vistaRow}>
                    <Text style={styles.title}>Amount: </Text>
                    <TextInput 
                        style={styles.input} 
                        value={amount}
                        onChangeText={amount => {
                            setAmount(amount)
                        }}/>
                </View>
            </View>
            <View style={{flexDirection:'column'}}>
                <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => imprimir(name,amount)}
                    style={styles.boton}>
                    <Text style={styles.textBoton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#5885FD',
        flexDirection: 'row'
    },
    input: {
        marginLeft: 7,
        backgroundColor: 'white',
        width: 150,
        borderColor: 'green',
        borderRadius: 10,
        padding: 2
    },
    vistaRow: {
        flexDirection: 'row',
        margin: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        width: 70
    },
    boton: {
        backgroundColor: '#FFFF8C',
        marginTop: 15,
        marginLeft: 50,
        borderRadius: 5
    },
    textBoton: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',

    }
});
export default IngredientForm;