<template>
  <div class="w-full p-4">
    <nav class="flex" aria-label="Breadcrumb">
      <ol
        class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
      >
        <li class="inline-flex items-center">
          <a
            href="/"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-400 dark:hover:text-white"
          >
            <span class="material-icons text-sm font-bold mr-1">home</span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="material-icons text-sm font-bold text-gray-500"
              >arrow_forward_ios</span
            >
            <span
              class="ms-1 text-sm font-medium text-gray-700 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >File</span
            >
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <span class="material-icons text-sm font-bold text-gray-500"
              >arrow_forward_ios</span
            >
            <span
              class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
              >Upload File</span
            >
          </div>
        </li>
      </ol>
    </nav>

    <div
      class="mt-5 mb-2 py-10 px-3 md:px-6 lg:px-10 bg-slate-50 flex flex-col items-center justify-center rounded-lg"
    >
      <form
        class="mb-5 flex flex-col items-center py-10 px-5 md:px-10 lg:px-20 rounded-lg border-2 border-dashed border-gray-300 w-[90%] md:w-[80%] lg:w-1/2"
      >
        <input
          type="file"
          name="file"
          ref="fileInput"
          hidden
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="uploadFile"
        />
        <div class="md:w-15 lg:w-20 md:h-15 lg:h-20 flex justify-center items-center">
          <i class="material-icons text-4xl md:text-5xl lg:text-6xl">cloud_upload</i>
        </div>
        <h2 class="text-center font-semibold text-xl lg:text-2xl mt-3">
          Choose a file or drag & drop it here
        </h2>
        <p class="text-gray-400 font-semibold text-base lg:text-lg">
          csv, xls, xlsx formats
        </p>
        <div
          class="mt-5 px-2 md:px-3 lg:px-5 py-1 lg:py-2 cursor-pointer text-gray-400 font-semibold rounded-2xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 hover:text-blue-500"
          @click="openFileInput"
        >
          Browse File
        </div>
      </form>
      <section class=" w-[90%] md:w-[80%] lg:w-1/2" v-if="showProgress">
        <div
          v-for="(file, index) in files"
          class="mb-5 px-5 py-2 flex rounded-xl bg-white shadow-lg w-full"
        >
          <div class="flex items-center justify-between w-full">
            <i class="material-icons text-blue-600 text-2xl">description</i>
            <div class="flex flex-col ml-4 w-full">
              <span class="text-base font-semibold">{{ file.name }}</span>
              <span class="text-xs text-gray-400">{{ file.loading }} %</span>
              <div class="bg-gray-200 rounded-lg h-2 mt-2">
                <div
                  class="bg-blue-600 rounded-lg h-full"
                  :style="{ width: file.loading + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <i class="material-icons text-blue-600 text-2xl flex items-center ml-2 cursor-pointer"
          @click="stopUpload"
            >stop</i
          >
        </div>
      </section>
      <section class="w-[90%] md:w-[80%] lg:w-1/2">
        <div
          v-for="(file, index) in uploadedFiles"
          class="mb-5 px-5 py-2 flex rounded-xl bg-white shadow-lg w-full"
        >
          <div class="flex items-center justify-between w-full">
            <i class="material-icons text-green-600 text-2xl">description</i>
            <div class="flex flex-col ml-4 w-full">
              <span class="text-base font-semibold">{{ file.name }}</span>
              <span class="text-xs text-gray-400">{{ file.size }}</span>
              <div class="bg-gray-200 rounded-lg h-2 mt-2">
                <div
                  class="bg-green-600 rounded-lg h-full"
                  style="width: 100%"
                ></div>
              </div>
            </div>
          </div>
          <i
            class="material-icons text-green-600 text-2xl flex items-center ml-2"
            >check</i
          >
        </div>
      </section>
      <section class="w-[90%] md:w-[80%] lg:w-1/2">
        <div
          v-for="(file, index) in failedFiles"
          class="mb-5 px-5 py-2 flex rounded-xl bg-white shadow-lg w-full"
        >
          <div class="flex items-center justify-between w-full">
            <i class="material-icons text-red-600 text-2xl">description</i>
            <div class="flex flex-col ml-4 w-full">
              <span class="text-base font-semibold">{{ file.name }}</span>
              <span class="text-xs text-gray-400">{{ file.size }}</span>
            </div>
          </div>
          <i class="material-icons text-red-600 text-2xl flex items-center ml-2 cursor-pointer"
          @click="removeFile(index)"
            >close</i
          >
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import fileService from "../../services/FileService";
export default (await import("vue")).defineComponent({
  setup() {
    document.title = "Upload File";
  },
  data() {
    return {
      files: [],
      uploadedFiles: [],
      failedFiles: [],
      showProgress: false,
    };
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    async uploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      const fileName =
        file.name.lenght >= 12
          ? file.name.slice(0, 13) + "... ." + file.name.split(".")[1]
          : file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.files.push({
        name: fileName,
        loading: 0,
      });
      this.showProgress = true;
      try {
        await fileService.uploadFile(
          formData,
          file,
          this.files,
          this.uploadedFiles,
          this.failedFiles,
          this.notify
        );
      } catch (error) {
        console.log(error);
      } finally {
        this.showProgress = false;
        this.files = [];
        this.$refs.fileInput.value = null;
      }
    },
    removeFile(index) {
      this.failedFiles.splice(index, 1);
    },
    stopUpload() {
      this.showProgress = false;
      this.files = [];
      this.$refs.fileInput.value = null;
    },
    notify({ title, text, type }) {
      this.$notify({
        title,
        text,
        type,
      });
    },
  },
});
</script>
<style></style>
