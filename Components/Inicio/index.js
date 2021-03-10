import React, { useEffect, useState } from 'react';
import { View,SafeAreaView,Image,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../Login/Index';

const Inicio = () => {
    const navigation = useNavigation();
    
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#386BF4'}}>
            <View style={styles.vistaImagen}>
                <Image 
                    source={require('../../assets/images/homer_trivia.gif')}
                    style={{flex: 1, height: 300,backgroundColor:'#386BF4'}}
                    resizeMode='cover'/>
            </View>
            <View>
                <View style={styles.animacion}>
                    <Text style={styles.titulo}>Recreo Trivias</Text>
                    <Login users={null} />
                    <View style={styles.rowNoCuenta}>
                        <View >
                            <Text style={styles.textNoCuenta}>
                                No tienes cuenta?
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                            delayPressIn={0}
                            style={styles.boton}
                            onPress={() => navigation.push('CrearCuenta')}
                            >
                                <Text>Crear Cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    vistaImagen: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    animacion: {
        marginTop: 30,
        backgroundColor: '#386BF4',
        height: 200,
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 100,
        alignContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    titulo2: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    textNoCuenta:{
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    boton: {
        alignItems: "center",
        backgroundColor: "#A3FF73",
        padding: 10,
        marginTop: 30,
        width: 150,
        borderRadius: 12,
        margin: 5
    },
    rowNoCuenta:{
        flexDirection:'row',
        width: 300,
        justifyContent: "space-between",
        alignItems: 'center',
    }
})

export default Inicio;