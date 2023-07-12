import React from "react";
import CustomText from "../../lib/CustomText";

interface ISearchFilter {
    data: any[];
}

const SearchFilter = (props: ISearchFilter) => {
    return (
        <>
            {props.data.map((elem, idx) => {
                return <CustomText>{elem.title}</CustomText>;
            })}
        </>
    );
};

export default SearchFilter;
