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
    NativeSyntheticEvent,
    NativeTouchEvent,
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

interface IWarningConfirmation {
    icon: React.ReactNode;
    title: string;
    desc: string;
    buttonText: string;
    buttonOnClick: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    footerText: string;
    onFooterClick: () => void;
    visible: boolean;
    isSuccessButton?: boolean;
}

const WarningConfirmation = (props: IWarningConfirmation) => {
    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        if (props.visible && count == 0) {
            hapticFeedback(HAPTIC_OPTIONS.WARNING);
            setCount(count + 1);
        }
    });

    React.useEffect(() => {
        if (!props.visible) {
            setCount(0);
        }
    }, [props.visible]);

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <ModalPopup visible={props.visible}>
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
                        onPress={ev => props.buttonOnClick(ev)}
                        // deleteProduct();
                        // sellerViewProductStore.setDeleteConfirmation();
                        footer
                        footerButtonTitle={props.footerText}
                        footerButtonOnPress={props.onFooterClick}
                        // sellerViewProductStore.setDeleteConfirmation()
                        isSuccessButton={props.isSuccessButton}
                    />
                </View>
            </ModalPopup>
        </View>
    );
};

export default WarningConfirmation;
