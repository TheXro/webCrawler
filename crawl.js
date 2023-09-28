const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function crawlPage(baseURL, currentURL, pages) {
  // if this is an offsite URL, bail immediately
  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }
  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }
  pages[normalizedURL] = 1; // initialize the page
  console.log(`Crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log("HTTP Error: Goodbye cruel world :(");
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log("Not HTML: You're dead to me");
        return pages;
    }
    htmlBody = await resp.text();
  } catch (err) {
    console.log(err);
    return pages;
  }
  const urls = getURLsFromHTML(htmlBody, baseURL);
  for (const url of urls) {
    pages = await crawlPage(baseURL, url, pages);
  }
  
}

const normalizeURL = (url) => {
  const newURL = new URL(url);
  let fullPath = `${newURL.host}${newURL.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
};

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aElements = dom.window.document.querySelectorAll("a");
  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
