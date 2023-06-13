import { IConversation, IProduct, IUser } from "../@types/GlobalTypes";
import {
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// //create
// export const createProductInDb = async (product: IProduct) => {
//     // Add a new document in collection "users"
//     await setDoc(doc(db, "products", product.id), {
//         id: product.id,
//         linkedUID: product.linkedUID,
//         title: product.title,
//         blurb: product.blurb,
//         askingPrice: product.askingPrice,
//         imageURL: product.imageURL,
//         // offers: product.offers,
//         createdAt: new Date(),
//         // categories: product.categories,
//         condition: product.condition,
//         additionalInfo: product.additionalInfo,
//     })
//         .then(() => console.log("Created in db!"))
//         .catch(error => console.log("db error: " + error));
// };

//read
interface IReadMyIncomingConversationsFromDb {
    sellerUID: string;
    setConversations: (conversations) => void;
}

export const readMyIncomingConversationsFromDb = (
    props: IReadMyIncomingConversationsFromDb
) => {
    const q = query(
        collection(db, "conversations"),
        where("sellerUID", "==", props.sellerUID)
    );
    onSnapshot(q, querySnapshot => {
        // querySnapshot.forEach(doc => {
        //     props.setProduct(doc.data());
        // });
        props.setConversations(querySnapshot.docs.map(doc => doc.data()));
    });
};

export const createConversationInDb = async (conversation: IConversation) => {
    // Add a new document in collection "conversations"
    await setDoc(doc(db, "conversations", conversation.id), {
        id: conversation.id,
        linkedProductID: conversation.linkedProductID,
        sellerUID: conversation.sellerUID,
        buyerUID: conversation.buyerUID,
        dealReached: conversation.dealReached,
    });
};
