import axios from "axios";

const DreamApp = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

export const finetuneModel = async (data) => {
  try {
    const response = await DreamApp.post("/finetune", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const inferenceModel = async (data) => {
  try {
    const response = await DreamApp.post("/inference", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
