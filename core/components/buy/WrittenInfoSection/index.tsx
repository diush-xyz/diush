import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { useAuthStore } from "../../../state/auth/Auth.store";
import { useCatalogStore } from "../../../state/auth/Catalog.store";
import { deriveProductConditionFromDb } from "../../../utils/productCondition.util";
import CustomText from "../../lib/CustomText";
import HorizontalLine from "../../lib/HorizontalLine";
import { useBuyProductStore } from "../../../state/auth/BuyProduct.store";

const WrittenInfoSection = () => {
    const buyProductStore = useBuyProductStore();
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
                {buyProductStore.activeProduct.blurb}
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                condition
            </CustomText>
            <CustomText secondary fontSize={17}>
                {deriveProductConditionFromDb(
                    buyProductStore.activeProduct.condition
                )}
            </CustomText>
            <HorizontalLine />
            <CustomText fontSize={18} font="Heavy" style={{ marginBottom: 14 }}>
                seller location
            </CustomText>
            <CustomText secondary fontSize={17}>
                {authStore.user.location}
            </CustomText>
            {buyProductStore.activeProduct.additionalInfo && (
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
                        {buyProductStore.activeProduct.additionalInfo}
                    </CustomText>
                </>
            )}
        </View>
    );
};

export default observer(WrittenInfoSection);
