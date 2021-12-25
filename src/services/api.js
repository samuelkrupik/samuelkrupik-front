import axios from "axios";

export default class ImageUploader {
  /**
   * Počítadlo na určenie pozície v queue
   */
  static QUEUE_COUNTER = 1;

  /**
   * Konštruktor
   * @param file Súbor typu File
   * @param filesState interný state (array) komponentu
   * @param endpoint Api endpoint kde sa budu  nahrávat súbory, delete bude v tvare endpoint/{id_nahraneho_suboru}
   */
  constructor(file, filesState, endpoint) {
    this.endpoint = endpoint;
    const index = filesState.push(this) - 1;
    this.state = filesState[index];
    this.state.file = file;
    this.state.status = "waiting";
    this.state.queued = false;
    this.state.message = "";
    this.setDataUrl();
  }

  /**
   * Získa data url zo súboru
   */
  getDataUrl() {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(this.state.file);
    });
  }

  /**
   * Nastaví dataUrl
   */
  async setDataUrl() {
    this.state.dataUrl = await this.getDataUrl();
  }

  /**
   * Dá súbor do poradia
   */
  enqueue() {
    this.state.queued = true;
    this.state.status = "queued";
    this.state.queueOrder = ImageUploader.QUEUE_COUNTER++;
  }

  /**
   * Vymaže subor z poradia
   */
  dequeue() {
    this.state.queued = false;
    this.state.queueOrder = null;
  }

  /**
   * Začne nahrávať na server
   */
  upload() {
    return new Promise((resolve, reject) => {
      this.state.controller = new AbortController();
      let formData = new FormData();
      formData.append("file", this.state.file);
      const config = {
        onUploadProgress: (progress) => {
          const percentCompleted = Math.round(
            (progress.loaded * 100) / progress.total
          );
          this.state.uploadProgress = percentCompleted;
          //console.log(percentCompleted);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: this.state.controller.signal,
      };
      axios
        .post(this.endpoint, formData, config)
        .then((response) => {
          this.state.status = "uploaded";
          this.state.uploadedId = response.data.id;
          resolve(response.data);
        })
        .catch((error) => {
          if (error.message === "canceled") {
            this.state.status = "canceled";
          } else {
            this.state.status = "rejected";
          }
          this.state.message = error.response.data.message;
          reject();
        });

      this.state.status = "uploading";
      this.state.message = "";
    });
  }

  /**
   * Vymaže nahraný subor zo servera
   */
  delete() {
    if (!this.state.status === "uploaded") {
      return;
    }
    axios.delete(`${this.endpoint}/${this.state.uploadedId}`);
  }

  /**
   * Zruší nahrávanie na server
   */
  cancelUpload() {
    this.state.controller.abort();
  }
}
