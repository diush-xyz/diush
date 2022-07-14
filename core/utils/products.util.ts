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

// //read
// interface IFetchUserFromDb {
//     id: string;
//     setUser: (user) => void;
// }

// export const readProductFromDb = (props: IFetchUserFromDb) => {
//     const q = query(collection(db, "users"), where("id", "==", props.id));
//     onSnapshot(q, querySnapshot => {
//         querySnapshot.forEach(doc => {
//             props.setUser(doc.data());
//         });
//     });
// };
