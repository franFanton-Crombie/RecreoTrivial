import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fragment } from 'react';

export default function QuestionSlide({question,questionNro,answersSelected}){
    const respuestas = [];
    respuestas.push(question?.correct_answer);
    const respuestasCompletas = respuestas.concat(question?.incorrect_answers);
    const [selected, setSelected] = useState("");

    return(
        <SafeAreaView style={styles.contaimer}>
            <View>
                <Text style={styles.tituloNumber}>Questions Number: {questionNro}</Text>
                <Text style={styles.pregunta}>{question?.question}</Text>
                <View style={styles.vistaRespuestas}>
                    {respuestasCompletas.map((respuesta,index) => (
                        <Fragment key={index}>
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelected(respuesta);
                                    answersSelected(respuesta);
                                  
                                }}
                                style={[
                                    styles.botonRespuesta,
                                    selected === respuesta && selected === question?.correct_answer && {backgroundColor: "green"},
                                    selected === respuesta && selected !== question?.correct_answer && {backgroundColor: "red"}
                                ]}
                            >
                                <Text style={styles.textoRespuestas}>
                                    {respuesta}
                                </Text>
                            </TouchableOpacity>
                        </Fragment>
                    ))}
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    contaimer: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: '#386BF4',
        
    },
    pregunta: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: 'white',
        height: 150
    },
    tituloNumber: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    botonRespuesta: {
        height: 30,
        width: 350,
        backgroundColor: '#CCFFB1',
        padding: 5,
        margin: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    vistaRespuestas: {
        marginTop: 50,
        alignItems: 'center',
    },
    textoRespuestas:{
        color: 'black',
    }
});