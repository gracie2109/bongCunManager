import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, QueryDocumentSnapshot, startAfter, where, type DocumentData } from "firebase/firestore";
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


export function getCollectionList(collectionName: string, callback: (data: any[]) => void, isAll?: boolean, limitNumb?: number) {
    try {
        const colRef = collection(db, collectionName);
        const q = (!isAll && limitNumb) ? query(colRef, limit(limitNumb)) : query(colRef);

        return onSnapshot(q, (snapshot) => {
            let response: any[] = [];

            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    response = [...response, {
                        ...doc.data(),
                        id: doc.id,
                    }];
                });
            }
            callback(response);
        });

    } catch (error) {
        throw new Error('something went wrong');
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