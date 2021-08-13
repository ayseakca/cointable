import axios from "axios";
const access_token = "";
const config = {
  "X-CMC_PRO_API_KEY": `${access_token}`,
};

async function get(url, data = {}) {
  return await axios.get("https://pro-api.coinmarketcap.com/v1" + url, {
    headers: config,
    params: data,
  });
}

export default {
  get,
};
