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
import { useScopeProductStore } from "../../../../state/buy/ScopeProduct.store";

const ModalPopup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    const scopeProductStore = useScopeProductStore();

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
            onDismiss={() => scopeProductStore.setImageModal()}
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
                    scopeProductStore.setImageModal();
                }}
            >
                <Animated.View
                    style={[
                        {
                            width: "90%",
                            backgroundColor: "white",
                            borderRadius: 20,
                            elevation: 20,
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

const ImageModal = () => {
    const scopeProductStore = useScopeProductStore();
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <ModalPopup visible={scopeProductStore.imageModal}>
                <View style={{ alignItems: "center" }}></View>
                <View style={{ alignItems: "center" }}>
                    <Image
                        style={{
                            height: 220,
                            width: "100%",
                            resizeMode: "cover",
                            borderRadius: 20,
                        }}
                        source={{
                            uri: scopeProductStore.fetchedActiveProduct
                                .imageURL,
                        }}
                    />
                </View>
            </ModalPopup>
        </View>
    );
};

export default ImageModal;
