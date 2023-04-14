import axios from "axios";

const endpoint = "http://localhost:3004";
export async function getScenario() {
  try {
    const Url = `${endpoint}/scenarios`;
    const res = await axios.get(Url);

    return res.data;
  } catch (e) {
    alert("check the backend is running");
  }
}
export async function addVehicle(selectedScenario, data) {
  try {
    const Url = `${endpoint}/scenarios/${selectedScenario}`;
    const res = await axios.patch(Url, data);
    return res;
  } catch (e) {
    alert("check the backend is running");
  }
}
export async function createNewScenario(data) {
  try {
    const Url = `${endpoint}/scenarios/`;
    const res = await axios.post(Url, data);
    return res;
  } catch (e) {
    alert("check the backend is running");
  }
}
export async function deleteScenario(id) {
  try {
    const Url = `${endpoint}/scenarios/${id}`;
    const res = await axios.delete(Url);
    return res.data;
  } catch (e) {
    alert("check the backend is running");
  }
}
export async function deleteVehicle(id) {
  try {
    const Url = `${endpoint}/scenarios/${id}`;
    const res = await axios.delete(Url);
    return res;
  } catch (e) {
    alert("check the backend is running");
  }
}
export async function saveScenario(id, data) {
  try {
    const Url = `${endpoint}/scenarios/${id}`;
    const res = await axios.put(Url, data);
    return res;
  } catch (e) {
    alert("check the backend is running");
  }
}
