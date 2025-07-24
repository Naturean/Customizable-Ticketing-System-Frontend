import { BASE_API_URL } from "@/utils/constUtil.js";
import { ref } from "vue";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILE_COUNT = 5;

export function useTicketForm() {
  const poster = ref("");
  const description = ref("");
  const imageFiles = ref(null);
  const images = ref([]);

  const currentStep = ref("form");
  const isUploadSuccess = ref(false);

  const uploadIssueId = ref(null);

  function onImagesChange(event) {
    const files = event.target.files;

    if (files.length > MAX_FILE_COUNT) {
      alert(`最多只能上传 ${MAX_FILE_COUNT} 张图片`);
      event.target.value = "";
      return;
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        alert(
          `文件 ${file.name} 大小超过 ${MAX_FILE_SIZE / 1024 / 1024}MB 限制`
        );
        event.target.value = "";
        return;
      }
    }

    images.value = [];
    imageFiles.value = files;

    for (const file of files) {
      images.value.push({ file: file, url: URL.createObjectURL(file) });
    }
  }

  function removeImage(index) {
    images.value.splice(index, 1);
  }

  function onSubmit() {
    currentStep.value = "confirm";
  }

  async function onConfirm() {
    // upload
    currentStep.value = "uploading";

    var formdata = new FormData();
    formdata.append("poster", poster.value);
    formdata.append("description", description.value);
    images.value.forEach((image, idx) => {
      const extName = image.file.name.split(".").at(-1);
      formdata.append(
        "image",
        image.file,
        `${idx.toString().padStart(2, "0")}.${extName}`
      );
    });

    const response = await fetch(`${BASE_API_URL}/issue`, {
      method: "POST",
      body: formdata,
    });
    const result = await response.json();

    currentStep.value = "complete";

    // restore default
    poster.value = "";
    description.value = "";
    images.value = [];

    if (!response.ok || result.status !== "success") {
      return;
    }

    isUploadSuccess.value = true;
    uploadIssueId.value = result.data.id;

    updateIssueStorage(uploadIssueId.value);
  }

  function onCancel() {
    currentStep.value = "form";
  }

  function updateIssueStorage(id) {
    const ticketSubmitted = localStorage.getItem("ticket-submitted");

    if (!ticketSubmitted) {
      localStorage.setItem("ticket-submitted", JSON.stringify([id]));
      return;
    }

    const ticketSubmittedSet = new Set(JSON.parse(ticketSubmitted));
    ticketSubmittedSet.add(id);

    localStorage.setItem(
      "ticket-submitted",
      JSON.stringify([...ticketSubmittedSet])
    );
  }

  return {
    poster,
    description,
    images,
    currentStep,
    isUploadSuccess,
    uploadIssueId,
    onImagesChange,
    removeImage,
    onSubmit,
    onConfirm,
    onCancel,
  };
}
