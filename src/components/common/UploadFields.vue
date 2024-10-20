<script lang="ts" setup>
import { useFileDialog } from "@vueuse/core";
import {
  getDownloadURL,
  getStorage,
  ref as fireStorageRef,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { Eye, PlusCircle, Trash } from "lucide-vue-next";
import { reactive, ref, toRaw } from "vue";
import { DialogConfirm, LoadingSpin } from "@/components/common";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-icons/vue";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Zooming from "./Zooming.vue";

const storage = getStorage();
const { open, onChange } = useFileDialog();

const props = defineProps<{
  folderName: string;
  limit: number;
  showControl:boolean
}>();

const errors = ref<string | null>(null);

const images = ref<string[]>([]);

const emit = defineEmits(["setImages"]);
const zoom = ref(false); // State for zoom
const selectedImg = ref("");
const newFiles = ref();
const progress = ref<boolean>(false);

onChange(async (files: any) => {
  newFiles.value = [...files];
  if (files.length > props.limit) {
    errors.value = `Upload max ${props.limit} item!`;
  }

  for (let file of newFiles.value.slice(0, props.limit)) {
    await uploadFile(file);
  }
});

const uploadFile = async (file: any) => {
  const storageRef = fireStorageRef(
    storage,
    `${props.folderName}/` + file.name
  );
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot: any) => {
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          progress.value = true;
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          break;
        case "storage/canceled":
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        images.value = [...images.value, downloadURL];
        emit("setImages", images.value);
      });
      progress.value = false;
    }
  );
};
const delImg = ref("");
const handleDelete = (img: string) => {
  console.log("de", img);
  if (img) {
    const path = decodeURIComponent(img.split("o/")[1].split("?")[0]);
    const desertRef = fireStorageRef(storage, path);
    deleteObject(desertRef)
      .then(() => {
        const newData = images.value.filter((i) => i !== img);
        images.value = newData;
        emit("setImages", newData);
        delImg.value = "";
      })
      .catch((error: any) => {
        errors.value = error;
      });
  }
};
</script>

<template>
  <div v-if="errors">
    <Alert variant="destructive">
      <ExclamationTriangleIcon class="w-4 h-4" />
      <AlertTitle>Notify</AlertTitle>
      <AlertDescription>
        {{ errors }}
      </AlertDescription>
    </Alert>
  </div>
  <div class="flex gap-3">
    <div
      v-for="(i, j) in limit"
      :key="j"
      class="rounded-lg border border-custom-primary border-dashed relative w-24 h-24"
      @click="
        () => {
          if (!images[i - 1]) {
            open();
          }
        }
      "
    >
      <div class="relative grid place-items-center w-full h-full">
        <template v-if="!images[i - 1]">
          <template v-if="!progress">
            <PlusCircle class="w-4 h-4" color="orange" />
          </template>
          <template v-else>
            <LoadingSpin />
          </template>
        </template>
        <div class="relative w-24 h-24" v-else>
          <div id="media" class="relative w-full h-full">
            <img
              :src="images[i - 1]"
              alt="image"
              class="w-full p-1 rounded-sm h-full object-cover"
            />
          </div>
          <div
            class="absolute bottom-[3px]   rounded-sm  backdrop-blur-sm bg-white/40 w-[97%] py-1 px-1"
          >
            <div class="flex items-center justify-between">
              <div @click="delImg = images[i - 1]">
                <Trash
                  class="size-5 cursor-pointer"
                  color="red"
                  type="button"
                />
              </div>
              <!-- Zoom button -->
              <div
                id="zoom_button"
                @click="
                  () => {
                    zoom = !zoom;
                    selectedImg = images[i - 1];
                  }
                "
              >
                <Eye class="size-5 cursor-pointer" color="white" type="button" />
              </div>

              <Dialog
                :open="zoom"
                @update:open="
                  () => {
                    zoom = !zoom;
                    selectedImg = '';
                  }
                "
                v-if="selectedImg"
              >
                <DialogContent class="w-full max-w-screen-md max-h-[500px]">
                  <Zooming :image="selectedImg" :showControl="props.showControl" />
                </DialogContent>
              </Dialog>

              <DialogConfirm
                :open="delImg ? true : false"
                :ok-btn="'Delete'"
                :desc="'You may be deleting user data. After you delete this, it can not be recovered.'"
                :title="'Delete files'"
                @handle-ok="handleDelete(toRaw(delImg))"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
