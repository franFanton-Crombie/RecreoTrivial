import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fragment } from 'react';

interface QuestionSlideProps {
    question: string,
    questionNro: number,
    
}

export default function QuestionSlide({question,questionNro,answersSelected} : QuestionSlideProps){
    const respuestas = [];
    respuestas.push(question?.correct_answer);
    const respuestasCompletas = respuestas.concat(question?.incorrect_answers);
    const {tamaño,setTamaño} = useState('30');

    //console.log('PREGUNTA: ',question);

    const checkSelected = (data) => {
        if(data === question?.correct_answer){
            colorStyles('green');
        }
        else{
            return false;            
        }
    }
    const colorStyles = (data) => {
        console.log('DATA: ',data);
        backgroundColor: '${data}'
    };

    return(
        <SafeAreaView style={styles.contaimer}>
            <View>
                <Text style={styles.tituloNumber}>Questions Number: {questionNro}</Text>
                <Text style={styles.titulo}>{question?.question}</Text>
                <View style={styles.vistaRespuestas}>
                    {respuestasCompletas.map((_,index) => (
                        <Fragment key={index}>
                            <TouchableOpacity 
                                onPress={() => {
                                    checkSelected(respuestasCompletas[index]);
                                    answersSelected(respuestasCompletas[index],index)}
                                }
                                style={[styles.boton,colorStyles]}
                            >
                                <Text style={styles.textoRespuestas}>{respuestasCompletas[index]}</Text>
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
        flex: 1,
        alignItems: 'center',
        width: Dimensions.get('window').width,
        backgroundColor: '#386BF4',
        
    },
    titulo: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        color: 'white'
    },
    tituloNumber: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    boton: {
        height: 30,
        width: 350,
        backgroundColor: '#CCFFB1',
        padding: 5,
        margin: 5,
        borderRadius: 8,
        alignItems: 'center'
    },
    vistaRespuestas: {
        marginTop: 80,
        alignItems: 'center',
    },
    textoRespuestas:{
        color: 'black',
    }
});