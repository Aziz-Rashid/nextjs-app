const slugify_api = require("slugify");
const { categories } = require("./categories");

const SORT = {
  ASC: "asc",
  DESC: "desc"
}

const slugify = (str) => {
  const slugOptions = {
    lower: true,
    strict: true,
  };
  return slugify_api(str, slugOptions);
};

function getBaseUrl() {
  const dev = process.env.NODE_ENV !== "production";
  return dev ? process.env.URL_DEV : process.env.URL_PROD;
}

function loadRakutenScript() {
  console.log("create rakuten script function");
  const isScript = document.getElementById("rakuten");
  console.log("isScript =", isScript);
  if (isScript) return;
  const script = document.createElement("script");
  script.id = "rakuten";
  script.src = "/js/rakuten.js";
  document.body.appendChild(script);
}

const encodeString = (str = "") => {
  return str.replace(/\s/g, "%20").replace(/&/g, "%26");
};

const decodePercentEncode = (str = "") => {
  return str.replace(/%20/g, " ").replace(/%26/g, "&");
};

module.exports = {
  getBaseUrl,
  decodePercentEncode,
  loadRakutenScript,
  categories,
  encodeString,
  slugify,
  SORT
};
