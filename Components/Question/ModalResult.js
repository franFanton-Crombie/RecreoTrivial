import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View ,TouchableOpacity} from "react-native";

const ModalResult = ({onRestart,userAnswer}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [percent,setPercert] = useState(0);
    const [correctCount, setCorrectCount] =useState(0); 

    const calculateScore = () => {
        let correct = 0;
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
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your result is: <Text>{percent > 50 ? "Passed" : "Failed"}</Text></Text>
                    <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
                        <Text style={{textAlign:'center',color:'red',fontSize:20}}>{percent} %SCORE</Text>
                        <Text style={{fontWeight:'bold',color:'black',marginTop:10}}>Your quiz completed successfully</Text>
                        <Text style={{fontWeight:'bold',marginTop:20,textAlign:'center'}}>Your attempted {userAnswer.length} questions and you only got {" "} {correctCount} in the quiz test.</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={onRestart}
                        >
                            <Text style={{color:'white'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                

            </View>
        </Modal>
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
        >
            <Text style={styles.textStyle}>Result</Text>
        </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    height: 300
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "blue",
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