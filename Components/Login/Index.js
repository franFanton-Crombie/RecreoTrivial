import React from 'react';
import {SafeAreaView,View,Text,StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Index = ({users}) => {
    console.log('LOGIN Users: ',users);

    return(
        <SafeAreaView>
            <View>
                <Text style={styles.textLogin}>Iniciar Sesion</Text>
            </View>
            <View style={{flexDirection:'column'}}>
                <View style={styles.camposLogin}>
                    <Text style={styles.textTitulo}>
                        Cuenta: 
                    </Text>
                    <TextInput style={styles.textInput}/>
                </View>
                <View style={styles.camposLogin}>
                    <Text style={styles.textTitulo}>
                        Contraseña: 
                    </Text>
                    <TextInput style={styles.textInput}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Index;

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: 'white',
        borderRadius:10,
        width: 200,
        marginLeft: 20
    },
    textLogin: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    textTitulo: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    camposLogin:{
        flexDirection:'row',
        marginTop:10,
        justifyContent: 'space-between'
    }
})