import React from 'react';
import { View,SafeAreaView,Text,StyleSheet } from 'react-native';
import Question from './Question';

const Juego = () => {
    return(
        <SafeAreaView style={{flex: 1}}>
            <Question />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default Juego;