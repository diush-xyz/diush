import React from "react";
import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
} from "react-native";
import InfoIcon from "../../../../icons/common/info";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { useSellerViewProductStore } from "../../../../state/auth/SellerViewProductStore";
import CustomText from "../../CustomText";
import { useTheme } from "../../../../utils/useTheme.util";
import CompactIcon from "../../../catalog/viewProduct/CustomDeleteConfirmation/CompactIcon";
import LargeButton from "../../LargeButton";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../config/firebase";
import { CatalogStatus } from "../../../../@types/GlobalTypes";
import { HAPTIC_OPTIONS, hapticFeedback } from "../../../../utils/haptics.util";

const ModalPopup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    const sellerViewProductStore = useSellerViewProductStore();
    const theme = useTheme();

    React.useEffect(() => {
        toggleModal();
    }, [visible]);

    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                //@ts-ignore
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    return (
        <Modal
            transparent
            visible={showModal}
            onDismiss={() => sellerViewProductStore.setDeleteConfirmation()}
        >
            <TouchableOpacity
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                activeOpacity={1}
                onPress={() => {
                    sellerViewProductStore.setDeleteConfirmation();
                }}
            >
                <Animated.View
                    style={[
                        {
                            width: "90%",
                            borderRadius: 16,
                            elevation: 20,
                            backgroundColor: theme.popupBackground,
                        },
                        { transform: [{ scale: scaleValue }] },
                    ]}
                >
                    {children}
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

interface IDeleteConfirmation {
    icon: React.ReactNode;
    title: string;
    desc: string;
    buttonText: string;
    buttonOnClick: () => void;
    footerText: string;
    onFooterClick: () => void;
}

const DeleteConfirmation = (props: IDeleteConfirmation) => {
    const sellerViewProductStore = useSellerViewProductStore();

    React.useEffect(() => {
        if (sellerViewProductStore.deleteConfirmation) {
            hapticFeedback(HAPTIC_OPTIONS.WARNING);
        }
    });

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <ModalPopup visible={sellerViewProductStore.deleteConfirmation}>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 22,
                        paddingHorizontal: 12,
                    }}
                >
                    {props.icon}
                    {/* <CompactIcon /> */}
                    <CustomText
                        font="Bold"
                        fontSize={20}
                        style={{ marginTop: 9 }}
                    >
                        {props.title}
                    </CustomText>
                    <CustomText
                        secondary
                        fontSize={16}
                        textAlign="center"
                        style={{ marginTop: 9, marginBottom: 27 }}
                    >
                        {props.desc}
                        {/* by deleting this product, you also {"\n"} decline all
                        offers pertaining to this{"\n"} product and delete all
                        data. */}
                    </CustomText>
                    <LargeButton
                        title={props.buttonText}
                        onPress={props.buttonOnClick}
                        // deleteProduct();
                        // sellerViewProductStore.setDeleteConfirmation();
                        footer
                        footerButtonTitle={props.footerText}
                        footerButtonOnPress={props.onFooterClick}
                        // sellerViewProductStore.setDeleteConfirmation()
                    />
                </View>
            </ModalPopup>
        </View>
    );
};

export default DeleteConfirmation;
