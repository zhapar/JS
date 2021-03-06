import { http } from "./http";

// Get posts on DOM Load
document.addEventListener("DOMContentLoad", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
