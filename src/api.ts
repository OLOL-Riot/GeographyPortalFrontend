import axios from 'axios';

const server = "http://localhost/";

export async function getTestsList() {
    let response = await axios.get(server + '');
}