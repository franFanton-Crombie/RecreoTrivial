import React, {useState} from 'react';
import {SafeAreaView,View,Text,StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useHttp from '../Hooks/useHttp';

const CreateAccount = () => {
    const navigation = useNavigation();
    const [name , setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [password, setPassword] = useState('');
    const { addUsers } = useHttp();

    const submitHandler = (name,surname,email,password,dni) => {
        addUsers({name:name,surname:surname,email:email,password:password,dni:dni});
    };
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'#386BF4'}}>
            <View>
                <Text style={styles.textCrearCuenta}>
                    Crear Cuenta
                </Text>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Nombre:</Text>
                <TextInput 
                        style={styles.textInput} 
                        value={name}
                        onChangeText={name => {
                        setName(name)
                }}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Apellido:</Text>
                <TextInput 
                        style={styles.textInput} 
                        value={surname}
                        onChangeText={surname => {
                            setSurname(surname)
                }}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Correo Electronico:</Text>
                <TextInput 
                        style={styles.textInput} 
                        value={email}
                        onChangeText={email => {
                            setEmail(email)
                }}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Contraseña:</Text>
                <TextInput 
                        style={styles.textInput} 
                        value={password}
                        onChangeText={password => {
                            setPassword(password)
                }}/>
            </View>
            <View style={styles.camposCrearCuenta}>
                <Text style={styles.textTitulo}>Documento:</Text>
                <TextInput 
                        style={styles.textInput} 
                        value={dni}
                        onChangeText={dni => {
                            setDni(dni)
                }}/>
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity 
                    delayPressIn={0}
                    style={styles.boton}
                    onPress={() => {
                        submitHandler(name,surname,email,password,dni)
                        navigation.push('Inicio')
                    }}
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