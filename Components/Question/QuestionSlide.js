import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Dimensions,SafeAreaView} from 'react-native';
import { Fragment } from 'react';

export default function QuestionSlide({question,questionNro}){
    const respuestas = [];
    respuestas.push(question?.correct_answer);
    const respuestasCompletas = respuestas.concat(question?.incorrect_answers);

    const answersSelected = (data) => {
        console.log(data);
    }
    
    return(
        <SafeAreaView style={styles.contaimer}>
            <View>
                <Text style={styles.titulo}>Pregunta Nro: {questionNro}</Text>
                <Text style={styles.titulo}>{question?.question}</Text>
                <View style={styles.vistaRespuestas}>
                    {respuestasCompletas.map((_,index) => (
                        <Fragment key={index}>
                            <TouchableOpacity 
                                onPress={answersSelected(respuestasCompletas[index])}
                                style={styles.boton}
                            >
                                <Text>{respuestasCompletas[index]}</Text>
                            </TouchableOpacity>
                        </Fragment>
                    ))}
                </View>
                <View style={styles.vistaRespuestas}>
                    <TouchableOpacity style={styles.botonNext}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    contaimer: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: '100%',
        backgroundColor: '#386BF4'
    },
    titulo: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    boton: {
        height: 30,
        width: 200,
        backgroundColor: '#CCFFB1',
        padding: 5,
        margin: 5,
        borderRadius: 8
    },
    vistaRespuestas: {
        marginTop: 50,
        alignItems: 'center',
    },
    botonNext: {
        backgroundColor: 'blue',
        width: 60,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
    }
});