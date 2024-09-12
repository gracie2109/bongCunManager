import {onUnmounted, ref, type Ref} from 'vue'
import {defineStore} from 'pinia'
import {checkItemExist, createCollection, getCollectionList,deleteItem,checkItemNotExist} from "@/lib/firebaseFn";
import {v7 as uuidv7} from 'uuid';
import {toast} from "vue-sonner";
import {useI18n} from "vue-i18n";
import {COLLECTION} from "@/lib/constants"
import {sendMessageToast} from "@/lib/utils";

export const useProductStore = defineStore('product', () => {
    const products: Ref<any[]> = ref([]);
    const loading = ref(false);
    const unsubscribe = ref<null | (() => void)>(null);

    async function createProduct(payload: any) {
        try {
            loading.value = true;
            const notExist = await checkItemExist(COLLECTION.PRODUCTS, 'name', payload.name);
            if (notExist) {
                await createCollection(COLLECTION.PRODUCTS, {...payload, uid: uuidv7()});
                sendMessageToast('success', 'create', 'success')
            }
        } catch (error: any) {
            sendMessageToast('fail', 'create', 'error', error.message)

        } finally {
            loading.value = false;
        }
    }

    async function getListProducts() {
        try {
            loading.value = true;
            unsubscribe.value = getCollectionList(COLLECTION.PRODUCTS, (data) => { products.value = data});
        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false
        }
    }
    
    async function deleteProduct (id: string) {
            try{
                loading.value = true;
                const exist = await checkItemNotExist(COLLECTION.PRODUCTS, '__name__', id);
                if(exist){
                    await deleteItem(COLLECTION.PRODUCTS,id);
                    sendMessageToast('success', 'delete', 'success');
                }
            }
            catch(error: any){
                sendMessageToast('fail', 'delete', 'error', error.message)
            }
            finally{
                loading.value = false
            }
    }

    onUnmounted(() => {
        if (unsubscribe.value) {
          unsubscribe.value();
        }
      });


    return {products, loading, createProduct, getListProducts, deleteProduct}
})
