const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");
const { getURLsFromHTML } = require("./crawl.js");

test("normalizeURL", () => {
  expect(normalizeURL("https://www.google.com/search")).toBe(
    "www.google.com/search"
  );
});

test("normalizeURL slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL http", () => {
  const input = "http://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("getting all URLs from HTMl  ", () => {
  const input =
    '<a href="https://www.google.com/search">Google</a> <a href="/search/bitch">Bing</a> <a href="/search/ded">Yahoo</a>';
  const actual = getURLsFromHTML(input, "https://www.google.com");
  const expected = [
    "https://www.google.com/search",
    "https://www.google.com/search/bitch",
    "https://www.google.com/search/ded",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
