import React from 'react';
import { SafeAreaView } from 'react-native';
import Question from './Question';

const Juego = () => {
    return(
        <SafeAreaView style={{flex: 1}}>
            <Question />
        </SafeAreaView>
    );
};

export default Juego;