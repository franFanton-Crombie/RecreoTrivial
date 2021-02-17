import React from 'react';
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

    return(
        <SafeAreaView style={styles.contaimer}>
            <View>
                <Text style={styles.titulo}>Questions Number: {questionNro}</Text>
                <Text style={styles.titulo}>{question?.question}</Text>
                <View style={styles.vistaRespuestas}>
                    {respuestasCompletas.map((_,index) => (
                        <Fragment key={index}>
                            <TouchableOpacity 
                                onPress={() => {
                                    answersSelected(respuestasCompletas[index],index)}}
                                style={styles.boton}
                            >
                                <Text>{respuestasCompletas[index]}</Text>
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