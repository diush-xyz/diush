import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import InfoIcon from "../../../icons/common/info";
import { useTheme } from "../../../utils/useTheme.util";
import CustomText from "../../lib/CustomText";
import ModalElement from "./ModalElement";

interface IConditionModal {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const theme = useTheme();

const ConditionModal = (props: IConditionModal) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    props.setModalVisible(!props.modalVisible);
                }}
            >
                <TouchableWithoutFeedback
                    onPress={() => props.setModalVisible(!props.modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ModalElement
                                text="new with box"
                                onPress={() => console.log("Clicked!")}
                            />
                            <ModalElement
                                text="new without box"
                                onPress={() => console.log("Clicked!")}
                            />
                            <ModalElement
                                text="new with defects"
                                onPress={() => console.log("Clicked!")}
                            />
                            <ModalElement
                                text="used (good condition)"
                                onPress={() => console.log("Clicked!")}
                            />
                            <ModalElement
                                text="used (decent condition)"
                                onPress={() => console.log("Clicked!")}
                                noBorderBottom
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalView: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        margin: 20,
        backgroundColor: theme.popupBackground,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderColor: theme.secondary,
        borderWidth: 1,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 242,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default ConditionModal;
