<template>
  <Header>
    <h1 class="font-semibold flex items-center gap-2">
      <User2 class="size-4 text-primary" />
      {{ $t("pageMeta.customers") }}
    </h1>
  </Header>

  <ContentWrap>
    <div class="p-5 bg-white min-h-dvh relative top-10">
      <Button @click="open = !open" variant="default"> New </Button>
      <div>
       ::: {{ users }}
        
        <div v-for="(i, ii) in users" :key="ii">
          <div class="flex gap-3">
            <p>{{ i.email }}</p>
            <p>{{ i.role || "no_role" }}</p>
          </div>
        
        </div>
        </div>
      <Dialog :open="open" @update:open="handleRese">
        <DialogContent>
          <InfomationForm
            :form="form"
            :loading="loading"
            :list-user-group="[]"
            :addressModel="addressModel"
            @on-submit="submitHdl"
          />
        </DialogContent>
      </Dialog>
    </div>
  </ContentWrap>
</template>

<script lang="ts" setup>
import { Header, ContentWrap } from "@/views/admin/components";
import { User2 } from "lucide-vue-next";
import InfomationForm from "./components/InfomationForm.vue";
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IUser } from "@/types/user.type";
import { initAddress, type IAddress } from "@/types/location.type";
import {useUsers} from "@/stores"
import type { PaginationState } from "@tanstack/vue-table";
import { INITIAL_PAGE_INDEX } from "@/lib/constants";


const addressModel = ref<IAddress>({...initAddress});


const form = useForm<IUser>({
  initialValues: {
    province:initAddress,
    password: "",
    fullName: "",
    phoneNumber: "",
    photoURL: "",
    email: "",
    displayName: "",
    groupIds:null
  },
});
const userStore = useUsers();
const { loading, users } = storeToRefs(userStore);
const open = ref(false);

const pageData = ref<PaginationState>({
  pageIndex: INITIAL_PAGE_INDEX,
  pageSize: 5,
});

const handleRese = () => {
  form.resetForm();
  open.value = !open.value;
};

const submitHdl = form.handleSubmit(async (value: any) => {
 await userStore.createNewUser({...value});
 handleRese()
});

console.log('usr', users.value)
onMounted(async () => {
  await userStore.getListUser({
    pageIndex: pageData.value.pageIndex,
    pageSize: pageData.value.pageSize,
  })
})

</script>
