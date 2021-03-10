import React, { useState,useEffect } from "react";
import { Modal, StyleSheet, Text, Image, View ,TouchableOpacity} from "react-native";

const ModalLogin = ({visible,onClose}) => {
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
                        <Text style={styles.modalText}>Logueo Exitoso!</Text>
                        <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    onClose();
                                }}
                            >
                                <Text style={{color:'black'}}>Aceptar</Text>
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
    height: 200,
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

export default ModalLogin;