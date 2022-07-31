import { View, Text } from "react-native";
import React from "react";
import LargeButton from "../../lib/LargeButton";
import { useCreateProductStore } from "../../../state/auth/CreateProduct.store";
import { observer } from "mobx-react";

const AskingPrice = () => {
    const createProductStore = useCreateProductStore();
    return (
        <View>
            <LargeButton
                title="continue"
                onPress={() => {
                    // setFirstTime(false);
                    // if (allClear) {
                    //     createProductStore.setCurrentStep(1);
                    // }
                    null;
                }}
                footer
                // disabled={!allClear && !firstTime}
                footerButtonTitle="cancel"
                footerButtonOnPress={() => createProductStore.cancel()}
            />
        </View>
    );
};

export default observer(AskingPrice);
