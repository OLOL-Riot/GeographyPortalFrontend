import axios from "axios";

const server = "http://localhost/";

export async function getTestsList() {
  const response = await axios.get(server + "");
}
