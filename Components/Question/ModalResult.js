import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Image, View ,TouchableOpacity} from "react-native";

const ModalResult = ({onRestart,userAnswer,visible,onClose}) => {
    const [percent,setPercert] = useState(0);
    const [correctCount, setCorrectCount] =useState(0); 

    const calculateScore = () => {
        let correct = 1;
        for(const el of userAnswer){
            if(el.answerIsCorrect){
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
    },[userAnswer]);

    return (
        <View style={styles.centeredView}>
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your result is: <Text>{percent > 60 ? "Passed" : "Failed"}</Text></Text>
                    <View>
                      {percent > 60
                        ?
                        <Image 
                          source={require('../../assets/images/homer_happy.gif')}
                          style={{width:350 , height: 200,backgroundColor:'#386BF4'}}
                          resizeMode='cover'/>
                        :
                        <Image 
                          source={require('../../assets/images/homer_sad.gif')}
                          style={{ width:350 , height: 200,backgroundColor:'#386BF4'}}
                          resizeMode='cover'/>
                      }
                    </View>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
                        <Text style={{textAlign:'center',color:'red',fontSize:20,marginTop:10}}>{percent} %SCORE</Text>
                        <Text style={{fontWeight:'bold',color:'black',marginTop:10}}>Your quiz completed successfully</Text>
                        <Text style={{fontWeight:'bold',marginTop:20,textAlign:'center'}}>Your attempted {userAnswer.length} questions and you only got {" "} {correctCount} in the quiz test.</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={onRestart}
                        >
                            <Text style={{color:'black'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  centeredView:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 450,
    marginTop: 300
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#A3FF73",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ModalResult;