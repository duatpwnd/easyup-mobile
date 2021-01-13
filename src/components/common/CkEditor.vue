<template>
  <div>
    <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
      }
    };
  }
};
</script>
<style scoped lang="scss"></style>
