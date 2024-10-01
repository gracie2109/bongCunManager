import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, startAfter, where, type DocumentData } from "firebase/firestore";
import { db } from "@/plugins/firebase"
import { COLLECTION, CURRENT_DATE } from "@/lib/constants";
import i18n from "@/i18n"


export async function getDetailData(collectionName: string, fieldName: string, data: string) {
    const q = query(collection(db, collectionName), where(fieldName, '==', data));
    return await getDocs(q);
}

export async function checkItemExist(collectionName: string, field: string, dataCheck: string) {
    const querySnapshot = await getDetailData(collectionName, field, dataCheck)
    if (querySnapshot.empty) return true;
    else throw new Error(i18n.global.t('common.dataExisted', { field: dataCheck }))
}

export async function checkItemNotExist(collectionName: string, field: string, dataCheck: string) {
    const querySnapshot = await getDetailData(collectionName, field, dataCheck)
    if (!querySnapshot.empty) return true;
    else throw new Error(i18n.global.t('common.dataNotExisted', { field: dataCheck }))
}


// export async function getCollectionList(
//     collectionName: string,
//     callback: ({ data, totalRecord }: { data: any[], totalRecord: any }) => void,
//     isAll?: boolean,
//     limitNumb?: number
// ) {
//     try {
//         const colRef = collection(db, collectionName);
//         const qData = (!isAll && limitNumb) ? query(colRef, limit(limitNumb), orderBy('createdAt', 'desc')) : query(colRef, orderBy('createdAt', 'desc'));
//         const qRecord = query(collection(db, collectionName));
//         const doc = await getDocs(qRecord);

//         return onSnapshot(qData, (snapshot) => {
//             let response: any[] = [];
//             if (!snapshot.empty) {
//                 snapshot.forEach(doc => {
//                     response = [...response, {
//                         ...doc.data(),
//                         id: doc.id,
//                     }];
//                 });
//             }
//             callback({
//                 data: response,
//                 totalRecord: doc.size
//             });
//         });

//     } catch (error) {
//         throw new Error('something went wrong');
//     }
// }
export async function getCollectionList(
    collectionName: string,
    callback: ({ data, totalRecord, lastVisibleDoc }: { data: any[], totalRecord: number, lastVisibleDoc:any}) => void,
    isAll?: boolean,
    limitNumb?: number,
    startAfterDoc?: any
) {
    try {
        const colRef = collection(db, collectionName);
        let qData;

        // Tạo query cho dữ liệu
        if (!isAll && limitNumb) {
            if (startAfterDoc) {
                qData = query(colRef, orderBy('createdAt', 'desc'), startAfter(startAfterDoc), limit(limitNumb));
            } else {
                qData = query(colRef, orderBy('createdAt', 'desc'), limit(limitNumb));
            }
        } else {
            qData = query(colRef, orderBy('createdAt', 'desc'));
        }

        const qRecord = query(collection(db, collectionName));
        const documentSnapshots = await getDocs(qRecord) as any
        return onSnapshot(qData, (snapshot) => {
            let response: any[] = [];
            let lastVisibleDoc: any = null;

            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    response.push({
                        ...doc.data(),
                        id: doc.id,
                    });
                    lastVisibleDoc= doc
                });
                //@ts-ignore
              
            }
            
            callback({
                data: response,
                totalRecord: documentSnapshots.size,
                lastVisibleDoc:lastVisibleDoc
            });
        });

    } catch (error) {
        throw new Error('Something went wrong: ' + error);
    }
}
export async function createCollection(collectionName: string, payload: any) {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, convertBefore(payload, 'CREATE'))
}


export async function deleteItem(collectionName: string, idDelete: string) {
    await deleteDoc(doc(db, collectionName, idDelete));
}


export function convertBefore(payload: any, method: 'UPDATE' | 'CREATE') {
    if (!payload || !method) return
    if (method === 'CREATE') {
        return {
            ...payload,
            createdAt: CURRENT_DATE.toString(),
            updatedAt: CURRENT_DATE.toString()
        }
    } else {
        return {
            ...payload,
            updatedAt: CURRENT_DATE.toString()
        }
    }
}