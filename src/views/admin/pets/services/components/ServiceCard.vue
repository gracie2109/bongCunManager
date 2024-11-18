<template>
  <div class="border border-primary h-[100px] rounded-lg cursor-pointer" :class="{
    'bg-[#dcdcdc]': props.isMouseId === String(props.data.id),
  }" @mouseenter="() => onMouseOver(String(props.data.id))" @mouseleave="() => onMouseLeave()">
    <div class="top h-[33%]">
      <div class="w-full h-full flex gap-x-4 items-center text-white cursor-pointer p-2 bg-primary-subb rounded-t-lg">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child @click="comingsoon">
              <Settings class="size-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Setting</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip v-if="props.data.petIds?.includes(String($route.params.petId))">
            <TooltipTrigger as-child @click="comingsoon">
              <HeartOff class="size-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>HeartOff</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip v-if="!props.data.petIds?.includes(String($route.params.petId))">
            <TooltipTrigger as-child @click="comingsoon">
              <Heart class="size-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Heart</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child @click="() => {
              if (props.data.type !== 'all') {
                $router.push({
                  name: 'DetailPetService',
                  params: {
                    petId: String($route.params.petId),
                    serviceId: props.data.id,
                  },
                })
              } else {
                openServiceDetail = !openServiceDetail
              }
            }">
              <Edit class="size-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child @click="comingsoon">
              <Trash class="size-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Trash</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
    <div class="h-[33%] text-center p-2">
      <h1 class="h-full font-bold capitalize text-lg">{{ props.data.name }}</h1>
    </div>
  </div>

  <div v-if="openServiceDetail">
    <ServiceEditPrice :data="props.data" :open="openServiceDetail" @update-open="() => {
      openServiceDetail = !openServiceDetail
    }" />
  </div>
</template>

<script lang="ts" setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings, HeartOff, Heart, Edit, Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { ref } from "vue";
import ServiceEditPrice from "./ServiceEditPrice.vue";

type TEnable = string | "all" | undefined;
const props = defineProps<{
  data: any;
  enable: TEnable;
  isMouseId: string;
}>();

const emits = defineEmits(["setMouseEl"]);
const openServiceDetail = ref(false);

function onMouseOver(id: string) {
  emits("setMouseEl", id);
}

function onMouseLeave() {
  emits("setMouseEl", "");
}

function comingsoon() {
  toast.info("Function comming soon")
}

</script>
