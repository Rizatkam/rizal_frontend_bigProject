import jwt_decode from "jwt-decode";

const token = window.localStorage.getItem("token");
const decoded = jwt_decode(token);
console.log(decoded, "ini data yang udah didecode");
export const ENDPOINT = "http://localhost:4000/";
export const access_token = token;
export const role = decoded.role_id;
export const uid = decoded.id;
export const uname = decoded.name;
