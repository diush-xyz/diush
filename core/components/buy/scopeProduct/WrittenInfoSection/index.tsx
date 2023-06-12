import React from "react";
import { deriveProductConditionFromDb } from "../../../../utils/productCondition.util";
import CustomText from "../../../lib/CustomText";
import HorizontalLine from "../../../lib/HorizontalLine";
import { observer } from "mobx-react";
import { View } from "react-native";
import { useAuthStore } from "../../../../state/auth/Auth.store";
import { useScopeProductStore } from "../../../../state/buy/ScopeProduct.store";

const WrittenInfoSection = () => {
    const scopeProductStore = useScopeProductStore();
    const authStore = useAuthStore();

    React.useEffect(() => {
        console.log(authStore.user);
    }, []);

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 60,
            }}
        >
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                blurb
            </CustomText>
            <CustomText secondary fontSize={17}>
                {scopeProductStore.fetchedActiveProduct.blurb}
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                condition
            </CustomText>
            <CustomText secondary fontSize={17}>
                {deriveProductConditionFromDb(
                    scopeProductStore.fetchedActiveProduct.condition
                )}
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                seller location
            </CustomText>
            <CustomText secondary fontSize={17}>
                {authStore.user.location}
            </CustomText>
            {scopeProductStore.fetchedActiveProduct.additionalInfo && (
                <>
                    <HorizontalLine />
                    <CustomText
                        fontSize={18}
                        font="Heavy"
                        style={{ marginBottom: 14 }}
                    >
                        additional info
                    </CustomText>
                    <CustomText secondary fontSize={17}>
                        {scopeProductStore.fetchedActiveProduct.additionalInfo}
                    </CustomText>
                </>
            )}
        </View>
    );
};

export default observer(WrittenInfoSection);
