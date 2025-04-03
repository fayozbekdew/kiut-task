import axios from "axios";
const token = import.meta.env.VITE_API_TOKEN;
const api = axios.create({
  baseURL: "http://13.124.160.16:8085/kefa/lab/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
export const getTableHeaders = () => {
  return api.get("/car-define/table-headers");
};

export const getCarData = () => {
  return api.post("/car-value/all", {
    state: null,
    keyword: null,
    page: 1,
    size: 50,
    order: null,
    field: "",
  });
};

export const deleteCar = (objectUUID) => {
  return api.delete(
    `/car-value/state?objectUUID=${objectUUID}&type=SOFT_DELETE`
  );
};
export const addCar = async (data) => {
  try {
    const response = await api.post("/car-value", data);
    return response;
  } catch (error) {
    console.error("Error adding:", error.response?.data || error);
    throw error;
  }
};
export const getCarFields = async () => {
  try {
    const response = await api.get("/car-define/create-headers");
    return response.data.dataSource;
  } catch (error) {
    console.error("Error fetching car fields:", error);
    throw error;
  }
};
export const getCarByID = async (id) => {
  try {
    const response = await api.get(`/car-value?objectUUID=${id}`);
    return response.data.dataSource.valueDetails;
  } catch (error) {
    console.error("Error fetching car value:", error);
    throw error;
  }
};

export const updateCarValue = async (id, data) => {
  try {
    const response = await api.put(`/car-value`, {
      objectUUID: id,
      values: data,
    });
    return response;
  } catch (error) {
    console.error("Error updating car value:", error);
    throw error;
  }
};
