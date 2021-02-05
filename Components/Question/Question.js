import React, { useEffect, useState } from 'react';
import { View,ScrollView,Animated,Text,StyleSheet,SafeAreaView} from 'react-native';
import { questions } from './data'; 
import { Fragment } from 'react';
import QuestionSlide from './QuestionSlide';
import { funcionRara, grabQuizQuestions, QuestionDifficulty } from '../Helpers/DataQuest';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type currAnswerObjecProps = {
    question: string,
    answer: string,
    answerIsCorrect: Boolean,
    correctAnswer: string,
}

const Question = () => {
    const [qloading,setQloading] = useState(false);
    const [allQuestions,setAllQuestions] = useState([]);
    const [userSelectedAnswers, setUserSelectedAnswers] = useState([]);
    const [score,setScore] = useState(0);
    const [totalQuestions] = useState(10);
    const [quizOver,setQuizOver] = useState(false);
    const [scrolling,setScrolling] = useState(false);
    const curNum = 0;

    const startJob = async() => {
        setQloading(true);
        setQuizOver(false);
        const newQuestions = await grabQuizQuestions(
            totalQuestions,
            'easy'
        );
        setAllQuestions(newQuestions);
        setScore(0);
        setUserSelectedAnswers([]);
        setQloading(false);
    }

    const shuffledDifficulty = funcionRara ([
        QuestionDifficulty.EASY,
        QuestionDifficulty.MEDIUM,
        QuestionDifficulty.HARD,
    ]);
    const answersSelected = (answer:string, index:number) => {
        console.log(answer);
    }
    useEffect(() => {
        startJob();
    },[]);
    return(
        <SafeAreaView style={{flex: 1}}>
            <>
            {qloading ? (
                <View style={styles.vistaCarga}>
                    <Text style={styles.textoCarga}>
                        Cargando....
                    </Text>
                </View>
            )
            : (
                <View>
            <View style={{height:'100%'}}>
                {allQuestions.map((question,index) => (
                    <Fragment key={index}>
                        <QuestionSlide {...{question}} questionNro={curNum +1} answersSelected={answersSelected}/>
                    </Fragment>
                ))}
                {/*<ScrollView
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}>
                    {allQuestions.map((question,index) => (
                        <Fragment key={index}>
                            <QuestionSlide {...{question}} questionNro={curNum +1} answersSelected={answersSelected}/>
                        </Fragment>
                    ))}
                </ScrollView>*/}
            </View>
            
            </View>
            )}
            </>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    titulo:{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    container: {
        backgroundColor: 'red',
    },
    animacion: {
        backgroundColor: 'red',
        height: 200,
        width: 200
    },
    vistaCarga: {
        flex: 1,
        backgroundColor: '#386BF4'
    },
    textoCarga: {
        textAlign:'center',
        textAlignVertical: 'center',
        fontSize: 25,
        marginTop: 300,
        fontWeight: 'bold'
    }
});
export default Question;