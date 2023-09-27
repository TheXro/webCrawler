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
  const actual = getURLsFromHTML(input, 'https://www.google.com');
  const expected = [
    "https://www.google.com/search",
    "https://www.google.com/search/bitch",
    "https://www.google.com/search/ded",
  ];
  expect(actual).toEqual(expected);
});
