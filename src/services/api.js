import settings from '../appsettings.json';
import axios from "axios";

const instance = axios.create({
  baseURL: settings.BackendBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
