import React, {useState} from 'react';
import {SafeAreaView,View,Text,StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const CreateAccount = () => {
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#386BF4'}}>
            <View>
                <Text style={styles.textCrearCuenta}>
                    Crear Cuenta
                </Text>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Nombre:</Text>
                <TextInput style={styles.textInput}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Apellido:</Text>
                <TextInput style={styles.textInput}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Correo Electronico:</Text>
                <TextInput style={styles.textInput}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Documento:</Text>
                <TextInput style={styles.textInput}/>
            </View>
            <View>
                <Text>Acepto Terminos y Condiciones</Text>
            </View>
            <View>
                <TouchableOpacity 
                    delayPressIn={0}
                    style={styles.boton}
                    onPress={() => navigation.push('Hooks')}
                >
                    <Text>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CreateAccount;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderRadius:10,
        width: 200,
        marginLeft: 20
    },
    camposCrearCuenta:{
        flexDirection:'row',
        marginTop:20,
        justifyContent: 'space-between',
        width: 400,
    },
    textTitulo: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    textCrearCuenta: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50
    },
    boton: {
        alignItems: "center",
        backgroundColor: "#A3FF73",
        padding: 10,
        marginTop: 30,
        width: 150,
        borderRadius: 12,
        margin: 5
    }
})