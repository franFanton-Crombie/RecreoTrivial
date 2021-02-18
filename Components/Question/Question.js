import React, { useEffect, useRef, useState } from 'react';
import { View,ScrollView,Text,StyleSheet,SafeAreaView, Dimensions} from 'react-native';
import { Fragment } from 'react';
import QuestionSlide from './QuestionSlide';
import { funcionRara, grabQuizQuestions, QuestionDifficulty } from '../Helpers/DataQuest';
import { useValue } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import ModalResult from './ModalResult';

export type currAnswerObjectProps = {
    question: string,
    answer: string,
    answerIsCorrect: Boolean,
    correctAnswer: string,
}

const Question = () => {
    const navigation = useNavigation();
    const [qloading,setQloading] = useState(false);
    const [allQuestions,setAllQuestions] = useState([]);
    const [userSelectedAnswers, setUserSelectedAnswers] = useState([]);
    const [score,setScore] = useState(0);
    const [totalQuestions] = useState(10);
    const [quizOver,setQuizOver] = useState(false);
    const [scrolling,setScrolling] = useState(false);
    const [curNum,setCurNum] = useState(0);
    /**@type {React.MutableRefObject<ScrollView>} */
    const scroll= useRef(null);
    const [answerIsCorrect,setAnswerIsCorrect] = useState(false);
    
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
        if(!quizOver){
            setAnswerIsCorrect(allQuestions[curNum].correct_answer === answer);
        }
        if(answerIsCorrect){
            setScore((currScore) => currScore + 1);
        }
        const currAnswerObject = {
            question: allQuestions[curNum].question,
            answer,
            answerIsCorrect,
            correctAnswer: allQuestions[curNum].correct_answer,
        }
        setUserSelectedAnswers((curranswers) => [...curranswers,currAnswerObject])
    }

    const nextQuestion = () => {
        if(!quizOver && curNum < allQuestions.length - 1){
            setCurNum((number) => number + 1);
        }
        else{
            setQuizOver(true);
        }
    }

    useEffect(() => {
        if(!quizOver){
            if(scroll.current){
                scroll.current.scrollTo({x: Dimensions.get("window").width*curNum, animated: true})
            }
        }
    },[curNum])

    useEffect(() => {
        if(userSelectedAnswers.length > 0){
            nextQuestion();
        }
    },[userSelectedAnswers]);

    useEffect(() => {
        startJob();
    },[]);

    const finishedValue = useValue(0);

    useEffect(() => {
        if(quizOver){
            finishedValue.setValue(1);
        }
    },[quizOver]);

    return(
        <SafeAreaView style={{flex: 1 , backgroundColor:'#386BF4'}}>
            <View>
            {qloading ? (
                <View style={styles.vistaCarga}>
                    <Text style={styles.textoCarga}>
                        Cargando....
                    </Text>
                </View>
            )
            : (
            <View style={{height:500}}>
                <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                bounces={false}
                ref={scroll}>
                    {allQuestions.map((question,index) => {
                        const last = index === allQuestions.length - 1; 
                        return(
                        <Fragment key={index}>
                            <View style={{flexDirection:'column'}}>
                                <QuestionSlide {...{question,index}} questionNro={curNum +1} answersSelected={answersSelected}/>
                                {last ? 
                                    <View style={{alignItems: 'center', height: 100}}>
                                    <ModalResult
                                    onRestart={() => {
                                        startJob();
                                        navigation.push('Inicio');
                                    }}
                                    userAnswer={userSelectedAnswers}
                                    />
                                    </View>
                                    : null 
                                }
                            </View>
                        </Fragment>
                    )})}
                </ScrollView>
            </View>
            )}
            </View>
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
    },
    botonNext: {
        backgroundColor: 'blue',
        width: 80,
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
    }
});
export default Question;