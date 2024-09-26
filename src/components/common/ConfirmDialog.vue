<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

defineProps<{
  open: boolean;
  title: string;
  desc?: string;
}>();

defineEmits([ "cancel", "openChange","handleOk"]);
</script>

<template>
  <AlertDialog :open="open" @update:open="$emit('openChange')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title || "Are you absolutely sure?" }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{
            desc ||
            "  This action cannot be undone. This will permanently delete your   account and remove your data from our servers."
          }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="$emit('cancel')">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="$emit('handleOk')">Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
