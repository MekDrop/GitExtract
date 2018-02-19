import GitUrlParse from "git-url-parse";

export default function (url) {
  "use strict";
  if (!url || (url.trim().length < 1)) {
    return false;
  }
  try {
    let ret = GitUrlParse(url);
    return true;
  } catch (ex) {
    return false;
  }
};
