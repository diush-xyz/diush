import React from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import CustomText from "../../../lib/CustomText";
import DropdownIcon from "../../../../icons/catalog/Dropdown";
import { useCatalogStore } from "../../../../state/auth/Catalog.store";
import { MAX_WIDTH } from "../../../../utils/constants";
import {
    deriveProductConditionFromDb,
    productConditionToDb,
} from "../../../../utils/productCondition.util";
import ConditionModal from "../../ConditionModal/ConditionModal";
import CustomTextInput from "../../../lib/CustomTextInput";
import { ProductCondition } from "../../../../@types/GlobalTypes";

interface IConditionAndExtra {
    condition: number;
    setCondition: React.Dispatch<React.SetStateAction<number>>;
    additionalInfo: string;
    setAdditionalInfo: React.Dispatch<React.SetStateAction<string>>;
}

const ConditionAndExtra = (props: IConditionAndExtra) => {
    const catalogStore = useCatalogStore();
    const [selector, setSelector] = React.useState<boolean>(false);

    return (
        <View style={{ display: "flex", flexDirection: "column" }}>
            <CustomText fontSize={18} font="Bold" style={{ marginBottom: 12 }}>
                condition
            </CustomText>
            <TouchableOpacity
                onPress={() => setSelector(!selector)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        backgroundColor: "rgba(255,255,255,0.05)",
                        height: 45,
                        width: "100%",
                        maxWidth: MAX_WIDTH,
                        // marginBottom: props.isErr
                        //     ? 7
                        //     : props.marginBottom || 0,
                        borderRadius: 12,
                        paddingHorizontal: 20,
                        marginBottom: 32,
                    }}
                >
                    {props.condition == null ? (
                        <CustomText secondary>status</CustomText>
                    ) : (
                        <CustomText>
                            {deriveProductConditionFromDb(props.condition)}
                        </CustomText>
                    )}
                    <DropdownIcon />
                </View>
            </TouchableOpacity>

            <CustomText fontSize={18} font="Bold" style={{ marginBottom: 12 }}>
                additional info
            </CustomText>
            <CustomTextInput
                isLarge
                defaultValue={props.additionalInfo}
                placeholder="anything else to add?"
                onChangeText={(text: string) => {
                    props.setAdditionalInfo(text);
                }}
                onSubmitEditing={() => Keyboard.dismiss()}
            />
            <ConditionModal
                modalVisible={selector}
                setModalVisible={setSelector}
                condition={deriveProductConditionFromDb(props.condition)}
                setCondition={(c: ProductCondition) =>
                    props.setCondition(productConditionToDb(c))
                }
                // onSelectionPress={() => catalogStore.setHasChanged(true)}
            />
        </View>
    );
};

export default ConditionAndExtra;
