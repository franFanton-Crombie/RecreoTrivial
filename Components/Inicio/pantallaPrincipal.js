import React from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const pantallaPrincipal = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#386BF4'}}>
            <View>
                <Text style={styles.tituloRanking}>
                    Ranking de Trivia
                </Text>
                <Text style={styles.tituloRanking}>
                    ...
                </Text>
            </View>
            <View style={styles.vistaBotones}>
                <TouchableOpacity 
                    delayPressIn={0}
                    style={styles.boton}
                    onPress={() => navigation.push('Juego')}
                >
                    <Text>Jugar!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    delayPressIn={0}
                    style={styles.boton}
                    onPress={() => navigation.push('Hooks')}
                >
                    <Text>Pruebas Hooks</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    boton: {
        alignItems: "center",
        backgroundColor: "#A3FF73",
        padding: 10,
        marginTop: 30,
        width: 150,
        borderRadius: 12,
        margin: 5,
    },
    vistaBotones: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tituloRanking: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        marginTop: 20,
    },
    vista: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default pantallaPrincipal;
