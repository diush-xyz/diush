import { IProduct, IUser } from "../@types/GlobalTypes";
import {
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

//create
export const createProductInDb = async (product: IProduct) => {
    // Add a new document in collection "users"
    await setDoc(doc(db, "products", product.id), {
        id: product.id,
        linkedUID: product.linkedUID,
        title: product.title,
        blurb: product.blurb,
        askingPrice: product.askingPrice,
        // offers: product.offers,
        createdAt: new Date(),
        // categories: product.categories,
        // condition: product.condition,
    })
        .then(() => console.log("Created in db!"))
        .catch(error => console.log("db error: " + error));
};

//read
interface IReadMyProductsFromDb {
    linkedUID: string;
    setProducts: (user) => void;
}

export const readMyProductsFromDb = (props: IReadMyProductsFromDb) => {
    const q = query(
        collection(db, "products"),
        where("linkedUID", "==", props.linkedUID)
    );
    onSnapshot(q, querySnapshot => {
        // querySnapshot.forEach(doc => {
        //     props.setProduct(doc.data());
        // });
        props.setProducts(querySnapshot.docs.map(doc => doc.data()));
    });
};
