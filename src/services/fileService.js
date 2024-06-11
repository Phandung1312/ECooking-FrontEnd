import axios from "../plugins/axios";

const fileService = {

  getListFiles(pageNumber, pageSize) {
    return axios.get(`files`, {
      params: {
        page: pageNumber - 1,
        size: pageSize,
      },
    });
  },

  uploadFile(formData, file, files, uploadedFiles, failedFile, notifyCallback) {
    const { name, size } = file;
    const fileSize =
      size < 1024 ? size + " KB" : (size / (1024 * 1024)).toFixed(2) + " MB";
    return axios
      .post(`files`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          files[files.length - 1].loading = Math.round((loaded / total) * 100);
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          uploadedFiles.push({
            name: name,
            size: fileSize,
          });

          notifyCallback({
            title: "Success",
            text: response.data.message,
            type: "success",
          });
        } else {
          console.log(response.data.message);
          failedFile.push({
            name: name,
            size: fileSize,
          });

          notifyCallback({
            title: "Error",
            text: response.data.message,
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        failedFile.push({
          name: name,
          size: fileSize,
        });
        if (error.response.data.status === "error") {
          notifyCallback({
            title: "Error",
            text: error.response.data.message,
            type: "error",
          });
        } else {
          notifyCallback({
            title: "Error",
            text: "Error uploading file. Please try again later.",
            type: "error",
          });
        }
      });
  },

  downloadFile(id, fileName, notifyCallback) {
    axios
      .get(`files/download/${id}`, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.target = "_blank";
        a.click();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        notifyCallback({
          title: "Error",
          text: "Error downloading file. Please try again later.",
          type: "error",
        });
      });
  },

  deleteFile(id, notifyCallback) {
    return axios
      .delete(`files/${id}`)
      .then((response) => {
        if (response.data.status === "ok") {
          notifyCallback({
            title: "Success",
            text: response.data.message,
            type: "success",
          });
          return true;
        } else {
          notifyCallback({
            title: "Error",
            text: response.data.message,
            type: "error",
          });
          return false;
        }
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        notifyCallback({
          title: "Error",
          text: "Error deleting file. Please try again later.",
          type: "error",
        });
      });
  },
  
  searchAndFilterFile(pageNumber, pageSize, searchQuery, statuses) {
    return axios.get(`files/search/`, {
      params: {
        page: pageNumber - 1,
        size: pageSize,
        search: searchQuery,
        statuses: statuses,
      },
    });
  }
};

export default fileService;
