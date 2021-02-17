import React from 'react';
import { Fragment } from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

interface AnswersProps {
    answers: string[];
    onPress?: () => void;
    answersSelected:(answer: string, index: number) => void;
}

export default function Answers({answers , answersSelected}:AnswersProps) {  
    return(
    <View style={{...styles.container}}>
        {answers.map((_,index) => (
            <Fragment key={index}>
                <TouchableOpacity 
                    onPress={() => {
                        answersSelected(answers[index],index);
                    }}
                    style={styles.boton}
                >
                    <Text>{answers[index]}</Text>
                </TouchableOpacity>
            </Fragment>
        ))}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 400,
        height: 200,
        backgroundColor: 'red'
    },
    boton: {
        height: 30,
        width: 200,
        backgroundColor: '#CCFFB1',
        padding: 5,
        margin: 2,
        borderRadius: 8
    }
});