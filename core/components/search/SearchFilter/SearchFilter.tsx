import React from "react";
import CustomText from "../../lib/CustomText";
import { FlatList } from "react-native";
import ProductCard from "../../catalog/Dashboard/ProductCard";

interface ISearchFilter {
    data: any[];
}

const SearchFilter = (props: ISearchFilter) => {
    return (
        <>
            <FlatList
                data={props.data}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginTop: 22,
                    marginBottom: 15,
                }}
                renderItem={({ item, index }) => (
                    <ProductCard
                        productData={item}
                        marginLeft={index % 2 === 0 ? 0 : 5}
                        marginRight={index % 2 === 0 ? 5 : 0}
                        isToMakeOffer
                    />
                )}
            />
        </>
    );
};

export default SearchFilter;
