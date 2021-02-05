import React from 'react';
import { View,SafeAreaView,Image,StyleSheet,Text,TouchableOpacity, Touchable } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Inicio = () =>{
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.vistaImagen}>
                <Image 
                    source={require('../../assets/images/ReCreoDefaultImage.png')}
                    style={{flex: 1, height: 300}}
                    resizeMode='contain'/>
            </View>
            <View>
                <Animated.View style={styles.animacion}>
                    <Text style={styles.titulo}>Recreo Trivials</Text>
                    <Text style={styles.titulo2}>Juga para obtener grandes beneficios.</Text>
                    <TouchableOpacity 
                        delayPressIn={0}
                        style={styles.boton}
                        onPress={() => navigation.push('Juego')}
                    >
                        <Text>Jugar!</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            style={styles.boton}
                            onPress={() => navigation.push('Hooks')}
                        >
                            <Text>Probando Hoooks</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    vistaImagen: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    animacion: {
        marginTop: 100,
        backgroundColor: '#386BF4',
        height: 800,
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
    boton: {
        alignItems: "center",
        backgroundColor: "#A3FF73",
        padding: 10,
        marginTop: 30,
        width: 100,
        borderRadius: 12,
    }
})

export default Inicio;