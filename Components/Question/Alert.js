import React , {useEffect, useState} from 'react';
import { View , Text,StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { interpolate } from 'react-native-reanimated';

const { height , width } = Dimensions.get("window");

const FinishedAlert = ({finished,onRestart,userAnswer}) => {
    const [percent,setPercert] = useState(0);
    const [correctCount, setCorrectCount] =useState(0);
    
    const opacity = interpolate(finished,{
        inputRange: [0,1],
        outputRange: [0,1],
    });

    const zIndex = interpolate(finished,{
        inputRange: [0,1],
        outputRange: [0,2],
    });

    const calculateScore = () => {
        let correct = 0;
        for(const el of userAnswer){
            if(el.userAnswer){
                correct++;
            }
        }
        setCorrectCount(correct);
        const got = (correct/100) * 10;
        const percentage = got  * 100;
        setPercert(percentage);
    };

    useEffect(() => {
        calculateScore();
        console.log(userAnswer);
    },[userAnswer]);

    return (
        <View style={styles.view,opacity,zIndex}>
            <View style={{alignItems:'center'}}>
                <View style={{backgroundColor:'white',position:'absolute',zIndex:1,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
                    {percent > 50 ? <Text>BIEN!</Text> : <Text>MAL!</Text>}
                </View>
                <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
                    <Text>{percent > 50 ? "Passed" : "Failed"}</Text>
                    <Text style={{textAlign:'center',color:'red'}}>{percent} %SCORE</Text>
                    <Text style={{fontWeight:'bold',color:'black'}}>Your quiz completed successfully</Text>
                    <Text>Your attempted {userAnswer.length} questions and you only got {" "} {correctCount} in the quiz test.</Text>
                    <TouchableOpacity
                        onPress={onRestart}
                    >
                        <Text>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default FinishedAlert;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    view: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});