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
                <form class="space-y-6" @submit.prevent="onSubmit">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>{{ $t("common.name") }}</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="shadcn" v-bind="componentField" size="lg" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <!-- <FormField  name="icon">
                        <FormItem>
                            <FormLabel>{{ $t("common.icon") }}</FormLabel> -->
                    <div>
                        <label>{{ $t("common.icon") }}</label>
                        <multiselect v-model="iconValue" placeholder="Fav No Man’s Sky path" label="label"
                            track-by="label" :options="options" :option-height="104" :show-labels="false"
                            @update:modelValue="(value:any) => {
                               form.setFieldValue('icon', value.value)
                            }"
                            
                            >
                            <template #singleLabel="props">
                                <div class="flex items-center gap-3">
                                    <Icon :icon="props.option.icon || iconValue" class="size-4" />
                                    <span class="option__desc">
                                        <span class="option__title">{{ props.option.label }}</span>
                                    </span>
                                </div>
                            </template>
                            <template #option="props">
                                <div class="flex items-center gap-3">
                                    <Icon :icon="props.option.icon || iconValue" class="size-4" />
                                    <div class="option__desc">
                                        <span class="option__title">{{ props.option.label }}</span>
                                    </div>
                                </div>
                            </template>
                        </multiselect>
                    </div>
                    <!-- <FormMessage />
                        </FormItem>
                    </FormField> -->

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

                    <DialogFooter class="p-6 pt-0">
                        <Button type="button" variant="outline" @click="$emit('changeOpen')">
                            Cancel
                        </Button>
                        <Button type="submit"> Save changes </Button>
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
import { computed, defineProps, reactive, ref, watch, withDefaults } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "vee-validate";
import { PetsValid } from "@/validations/pets";
import { toTypedSchema } from "@vee-validate/zod";
import { usePets, useServiceProvider } from "@/stores";
import Multiselect from "vue-multiselect";
import { DEFINE_PET_ICONS } from "@/lib/constants";
import { Icon } from "@iconify/vue";
import { valueUpdater } from "@/lib/utils";
import type { z } from "zod";

const props = withDefaults(defineProps<{ open: boolean; rowEditting: any }>(), {
    open: false,
});

const options = computed(() => {
    return Object.keys(DEFINE_PET_ICONS).map((key) => ({
        value: DEFINE_PET_ICONS[key],
        icon: DEFINE_PET_ICONS[key],
        label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
});
const iconValue = ref();


const emit = defineEmits(["changeOpen"]);
const store = usePets();

const form = useForm({
    validationSchema: toTypedSchema(PetsValid),
});

const onSubmit = form.handleSubmit(async (values: z.infer<typeof PetsValid>) => {
    console.log('submitForm', values)
    await store.createNewPet(values);
    form.resetForm();
    emit("changeOpen");
    iconValue.value = ""
});

watch(
    () => props.rowEditting,
    (newVal:z.infer<typeof PetsValid>) => {
        console.log('newVal',newVal)
        if (newVal) {
            form.resetForm();
            form.setValues({ ...newVal }, true);
            iconValue.value = options.value.find((i) => i.value === newVal.icon)
        }
    }
);
</script>
