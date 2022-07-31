import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "../../utils/useTheme.util";
import styled from "styled-components/native";
import WandIcon from "../../icons/catalog/Wand";
import { useCatalogStore } from "../../state/auth/Catalog.store";
import { CatalogStatus } from "../../@types/GlobalTypes";
import { observer } from "mobx-react";

const CreateProductButton = () => {
    const catalogStore = useCatalogStore();
    const theme = useTheme();

    const Wrapper = styled.TouchableOpacity`
        position: absolute;
        bottom: 41px;
        right: 20px;
        width: 56px;
        height: 56px;
        background-color: ${theme.accent};
        align-items: center;
        justify-content: center;
    `;

    return (
        <Wrapper
            style={{ borderRadius: "50%" }}
            onPress={() => {
                //     createProductInDb({
                //         id: "yuyu",
                //         linkedUID: auth.currentUser?.uid,
                //         title: "JBL Speakers",
                //         blurb: "Beautiful, compact, and powerful.",
                //         askingPrice: 89.99,
                //         imageURL:
                //             "https://cdn.vox-cdn.com/thumbor/80TKHF3cpG3fg11Gb3bejNDkbIk=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23382986/cwelch_220410_5136_0003.jpg",
                //     })
                //         .then(() => console.log("Created product in DB!"))
                //         .catch(err =>
                //             console.error("something went wrong: " + err)
                //         );
                catalogStore.setStatus(CatalogStatus.CREATE);
            }}
        >
            <WandIcon />
        </Wrapper>
    );
};

export default observer(CreateProductButton);
