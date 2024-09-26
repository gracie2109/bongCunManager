<template>
    <Dialog :open="props.open" @update:open="$emit('changeOpen')">
        <DialogContent
            class="sm:max-w-[425px] lg:max-w-[950px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 h-auto max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
                <DialogTitle> {{ $t("common.addNew") }}</DialogTitle>
                <DialogDescription>
                    {{ $t("pageFields.serviceProvider.desc") }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <form class="space-y-6" @submit="onSubmit">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>{{ $t("common.name") }}</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="shadcn" v-bind="componentField" size="lg" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="desc">
                        <FormItem>
                            <FormLabel>{{ $t("common.description") }}</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us a little bit about yourself" class="resize-none"
                                    v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="phone">
                        <FormItem>
                            <FormLabel>{{ $t("common.phone") }}</FormLabel>
                            <FormControl>
                                <Input type="text" size="lg" placeholder="shadcn" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <DialogFooter class="p-6 pt-0">
                        <Button type="button" variant="outline" @click="$emit('changeOpen')" > Cancel </Button>
                        <Button type="submit" > Save changes </Button>

                    </DialogFooter>
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
import { Textarea } from "@/components/ui/textarea";
import { defineProps, watch, withDefaults } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "vee-validate";
import { ServiceProvider } from "@/validations/service-provider";
import { toTypedSchema } from "@vee-validate/zod";
import {useServiceProvider} from "@/stores";

const props = withDefaults(defineProps<{ open: boolean, rowEditting: any }>(), {
    open: false,
});

const emit = defineEmits(["changeOpen"]);
const store = useServiceProvider();

const form = useForm({
    validationSchema: toTypedSchema(ServiceProvider),
});

const onSubmit = form.handleSubmit(async (values) => {
    await store.createProvider(values);
    form.resetForm();
    emit('changeOpen')
});


watch(() => props.rowEditting, (newVal) => {
    if (newVal) {
        form.resetForm();
        form.setValues({ ...newVal }, true);
    }
});

</script>
