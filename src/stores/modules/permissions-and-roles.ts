import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { COLLECTION } from "@/lib/constants";
import {
  checkItemExist,
  checkItemNotExist,
  createCollection,
  deleteItem,
  getCollectionList,
  updateCollection,
} from "@/lib/firebaseFn";
import { sendMessageToast } from "@/lib/utils";

export type IPermissionsHandle = {
  name: string;
  methods: string[];
  description: string;
};

export type IPermissions = {
  name: string;
  methods: string[];
  id: string;
};

export const usePermissionStore = defineStore("permission", () => {
  const loading: Ref<boolean> = ref(false);
  const permissions: Ref<any[]> = ref([]);
  const roles: Ref<any[]> = ref([]);
  const pageCount = ref();
  const detailPermission: Ref<any | undefined> = ref(undefined);

  const createNewPermission = async (value: IPermissionsHandle) => {
    try {
      loading.value = true;
      const checkExist = await checkItemExist(
        COLLECTION.PERMISSIONS,
        "name",
        value.name
      );
      if (checkExist) {
        await createCollection(COLLECTION.PERMISSIONS, value);
        sendMessageToast("success", "create", "success");
      }
    } catch (error: any) {
      console.log("error", error);
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  };

  const createNewRole = async (value: any) => {
    try {
      loading.value = true;
      const checkExist = await checkItemExist(
        COLLECTION.ROLE,
        "name",
        value.name
      );
      if (checkExist) {
        await createCollection(COLLECTION.ROLE, value);
        sendMessageToast("success", "create", "success");
      }
    } catch (error: any) {
      console.log("error", error);
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  };

  const getListPermissions = async () => {
    try {
      loading.value = true;
      await getCollectionList({
        collectionName: COLLECTION.PERMISSIONS,
        callback({ data, totalRecord, lastVisibleDoc }) {
          permissions.value = data;
          pageCount.value = totalRecord;
        },
        isAll: true,
      });
    } catch (error: any) {
      console.log("error", error);
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  };
  const getListRole = async () => {
    try {
      loading.value = true;
      await getCollectionList({
        collectionName: COLLECTION.ROLE,
        callback({ data, totalRecord, lastVisibleDoc }) {
          roles.value = data;
          pageCount.value = totalRecord;
        },
        isAll: true,
      });
    } catch (error: any) {
      console.log("error", error);
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  };

  const editPermission = async (value: any) => {
    try {
      loading.value = true;
      if (!value) return;
      await updateCollection(COLLECTION.PERMISSIONS, value.id, value);
      sendMessageToast("success", "create", "success");
    } catch (error: any) {
      console.log("error", error);
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  };

  const editRole = async (value: any) => {
    try {
      loading.value = true;
      if (!value) return;
      await updateCollection(COLLECTION.ROLE, value.id, value);
      sendMessageToast("success", "create", "success");
    } catch (error: any) {
      console.log("error", error);
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  };

  async function deletePermissions(id: string) {
    try {
      loading.value = true;
      const exist = await checkItemNotExist(
        COLLECTION.PERMISSIONS,
        "__name__",
        id
      );
      if (exist) {
        const totalRecord = await deleteItem(COLLECTION.PERMISSIONS, id);
        pageCount.value = totalRecord;
        sendMessageToast("success", "delete", "success");
      }
    } catch (error: any) {
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  }
  async function deleteRole(id: string) {
    try {
      loading.value = true;
      const exist = await checkItemNotExist(COLLECTION.ROLE, "__name__", id);
      if (exist) {
        const totalRecord = await deleteItem(COLLECTION.ROLE, id);
        pageCount.value = totalRecord;
        sendMessageToast("success", "delete", "success");
      }
    } catch (error: any) {
      sendMessageToast("fail", "delete", "error", error.message);
    } finally {
      loading.value = false;
    }
  }
  return {
    permissions,
    roles,
    loading,
    detailPermission,
    pageCount,
    createNewPermission,
    deletePermissions,
    deleteRole,
    getListPermissions,
    editPermission,
    editRole,
    createNewRole,
    getListRole,
  };
});
