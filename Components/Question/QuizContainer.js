import React from 'react';
import {SafeAreaView} from 'react-native';

interface QuizContainerProps {
    children: ReactElement;
}
export default function QuizContainer({ children } : QuizContainerProps){
    return(
        <SafeAreaView style={{paddingTop: 10 , flex: 1}}>
            {children}
        </SafeAreaView>
    );
}
