<template>
  <Dialog
    :open="props.open"
    @update:open="$emit('changeOpen')"
    class="w-[80%] min-w-[1150px] h-auto min-h-[650px]"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new</DialogTitle>
        <DialogDescription> Make a new store </DialogDescription>
      </DialogHeader>

      <div>
        <form class="" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>{{ $t('common.name') }}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" v-bind="componentField" />
              </FormControl>
              <FormDescription> This is your public display name. </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Header, ContentWrap } from "@/views/admin/components";
import { defineProps, withDefaults } from "vue";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "vee-validate";
import { StoreSchema } from "@/validations/store";
const props = withDefaults(
  defineProps<{
    open: boolean;
  }>(),
  {
    open: false,
  }
);

defineEmits(["changeOpen"]);

const form = useForm({
  validationSchema: StoreSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("handleSb", values);
});
</script>
