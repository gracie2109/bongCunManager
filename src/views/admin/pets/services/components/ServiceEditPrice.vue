<template>
    <Dialog :open="props.open" @update:open="$emit('updateOpen')">
        <DialogContent>
            <DialogHeader class="p-6 pb-0">
                <DialogTitle> {{ $t("pageFields.pets.editPrice") }}</DialogTitle>
            </DialogHeader>

            <div>
                <form @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="shadcn" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
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
import { Form, FormField, FormMessage } from "@/components/ui/form"
import FormLabel from "@/components/ui/form/FormLabel.vue";
import Input from "@/components/ui/input/Input.vue";
import { useForm } from "vee-validate";

const props = defineProps<{
    data: any,
    open: boolean
}>();
const form = useForm();
const onSubmit = form.handleSubmit((values) => {
    console.log('values', values);

})
const emits = defineEmits(['updateOpen']);

</script>