import React, { useEffect, useState } from 'react';
import {SafeAreaView,View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import Modallogin from './ModalLogin';

const Index = () => {
    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [mostrar,setMostrar] = useState(false);

    const valirdarCuenta = (email,password) => {
        for(i in users){
            if (email == users[i].email && password == users[i].password){
                setMostrar(true);
            }
        }
    }

    useEffect(() => {
        setMostrar(false);
        database()
            .ref('/users/')
            .once('value')
            .then(snapshot => {
                setUsers(snapshot.val());
            });
    }, []);

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
                    <TextInput 
                        style={styles.textInput} 
                        value={email}
                        onChangeText={email => {
                            setEmail(email)
                    }}/>
                </View>
                <View style={styles.camposLogin}>
                    <Text style={styles.textTitulo}>
                        Contraseña: 
                    </Text>
                    <TextInput 
                        style={styles.textInput} 
                        value={password}
                        onChangeText={password => {
                            setPassword(password)
                    }}/>
                </View>
                <View style={{flexDirection:'row',justifyContent: 'center'}}>
                    <TouchableOpacity 
                        delayPressIn={0}
                        style={styles.boton}
                        onPress={() => valirdarCuenta(email,password)}
                    >
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                </View>
                <Modallogin
                    visible={mostrar}
                    onClose={() => {
                        setMostrar(false);
                        navigation.push('PantallaPrincipal',{email: email,password: password});
                    }}
                />
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
})