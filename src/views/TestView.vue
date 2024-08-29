<template>
  <div class="p-8 m-8 ">
   <div class="w-[250px] border border-red-500 p-2" >
     <input id="container" :value="inputValue"  @change="(vl) => setValue(vl.target.value)"/>
     <div id="content" ref="contentRef" class="flex border">
       <span v-for="(tag, index) in displayedTags" :key="index" class="tag">{{ tag }}</span>
     </div>
   </div>

  </div>
</template>

<script setup>
import { ref} from "vue";
const tags = ref([]); // Các tag ví dụ
const displayedTags = ref([]);
const inputValue = ref('')



function setValue(value) {
  inputValue.value = value;
  tags.value = [...tags.value, value];
  inputValue.value = '';
}





function getWidth() {
  let containerW = 0;
    let contentW = 0;
  let currentWidth = 0;
  let lastIndex = 0;


  if (document.getElementById("container")) {
    const w = document.getElementById('container').clientWidth
    containerW = w
  }
  if (document.getElementById("content")) {
    const w = document.getElementById('content').clientWidth
    contentW = w
  }


  for (let i = 0; i < tags.value.length; i++) {
    const tagElement = document.createElement('span');
    tagElement.style.display = 'inline-block';
    tagElement.style.padding = '5px 10px';
    tagElement.style.marginRight = '5px';
    tagElement.style.color = '#fff';
    tagElement.style.whiteSpace = 'nowrap';
    tagElement.style.visibility = 'hidden'; // Ẩn thẻ để tính toán kích thước
    tagElement.textContent = tags.value[i];
    document.body.appendChild(tagElement);
    const tagWidth = tagElement.offsetWidth;
    document.body.removeChild(tagElement);
    if (currentWidth + tagWidth > containerW) {
      break;
    }
    currentWidth += tagWidth;
    lastIndex = i;
  }
  displayedTags.value = tags.value.slice(0, lastIndex);

  if (lastIndex < tags.value.length) {
    const remainingTagsCount = tags.value.length - lastIndex;
    displayedTags.value.push(`+${remainingTagsCount} tags`);
  }
}




watch(() =>tags.value, () => {
  getWidth();
});

onMounted(() => {
 nextTick(() => {
   getWidth()
 })
})


</script>
<style scoped>
.container {
  width: 250px;
  overflow: hidden;
  border: 2px solid red;
  padding: 10px;
  background-color: #f0f0f0;
}

.content {
  display: flex;
  flex-wrap: nowrap;
}

.tag {
  display: inline-block;
  font-size: 14px;
  margin-right: 5px;
  background-color: #007BFF;
  color: #fff;
  border-radius: 5px;
  white-space: nowrap;
  padding: 0 5px;
}

.input-field {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>