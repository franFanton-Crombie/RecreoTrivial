import React, { useEffect, useRef, useState } from 'react';
import { View,ScrollView,Text,StyleSheet,SafeAreaView, Dimensions,Animated} from 'react-native';
import { Fragment } from 'react';
import QuestionSlide from './QuestionSlide';
import { grabQuizQuestions } from '../Helpers/DataQuest';
import { useNavigation } from '@react-navigation/native';
import ModalResult from './ModalResult';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const Question = () => {
    const [key, setKey] = useState(0);
    const navigation = useNavigation();
    const [qloading,setQloading] = useState(false);
    const [allQuestions,setAllQuestions] = useState([]);
    const [userSelectedAnswers, setUserSelectedAnswers] = useState([]);
    const [score,setScore] = useState(0);
    const [totalQuestions] = useState(10);
    const [quizOver,setQuizOver] = useState(false);
    const [curNum,setCurNum] = useState(0);
    const [playTimer,setPlayTimer] = useState(true);
    /**@type {React.MutableRefObject<ScrollView>} */
    const scroll= useRef(null);
    const [answerIsCorrect,setAnswerIsCorrect] = useState(false);
    
    const startJob = async() => {
        setQloading(true);
        setQuizOver(false);
        setKey(0);
        const newQuestions = await grabQuizQuestions(
            totalQuestions,
            'easy'
        );
        setAllQuestions(newQuestions);
        setScore(0);
        setUserSelectedAnswers([]);
        setQloading(false);
    }

    const resetState = () => {
        setQuizOver(false);
        setKey(0);
        setScore(0);
        setUserSelectedAnswers([]);
    }

    const answersSelected = (answer) => {
        const isCorrect = allQuestions[curNum].correct_answer === answer;
        if(!quizOver){
            setAnswerIsCorrect(isCorrect);
        }
        if(isCorrect){
            setScore((score) => score + 1);
        }
        const currAnswerObject = {
            question: allQuestions[curNum].question,
            answer,
            answerIsCorrect: isCorrect,
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
        setKey(prevKey => prevKey + 1);
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
            <View>
                <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                bounces={false}
                ref={scroll}>
                    {
                    allQuestions.map((question,index) => {
                        return(
                        <Fragment key={index}>
                            <View style={{flexDirection:'column'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <QuestionSlide
                                    {...{question,index}} 
                                    questionNro={curNum +1}
                                    answersSelected={answersSelected}/>
                                </View>
                                <View style={{alignItems:"center",marginTop:10}}>
                                    <CountdownCircleTimer
                                        key={key}
                                        isPlaying={playTimer}
                                        duration={10}
                                        size={100}
                                        colors={[
                                        ['#004777', 0.4],
                                        ['#F7B801', 0.4],
                                        ['#A30000', 0.2],
                                        ]}
                                        onComplete={() => {nextQuestion()}}
                                    >
                                        {({ remainingTime }) => (
                                        <Animated.Text style={{ color: 'white' }}>
                                            {remainingTime}
                                        </Animated.Text>
                                        )}
                                    </CountdownCircleTimer>
                                        </View>
                            </View>
                        </Fragment>
                    )})
                    }
                </ScrollView>
                <ModalResult
                    onRestart={() => {
                        console.log('RESTART');
                        resetState();
                        setPlayTimer(false);
                        navigation.push('Inicio');
                    }}
                    visible={quizOver}
                    onClose={() => {
                        console.log('CLOSE');
                        setQuizOver(false);
                        navigation.push('Inicio');
                    }}
                    userAnswer={userSelectedAnswers}
                />
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
    animacion: {
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