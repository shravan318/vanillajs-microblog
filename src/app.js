import { http } from "./httplib";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getPosts);

//listen to add post
document.querySelector(".post-submit").addEventListener("click", submitPost);
// delete post
document.querySelector("#posts").addEventListener("click", deletePost);

//edit post
document.querySelector("#posts").addEventListener("click", enableEdit);

//cancel edit
document.querySelector(".card-form").addEventListener("click", cancelEdit);

//get post
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

//SUBMIT post
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body,
    id,
  };
  if (title !== "" && body !== "" && id === "") {
    // create post
    http
      .post("http://localhost:3000/posts", data)
      .then((data) => {
        ui.showAlert("Post Added", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch((err) => console.log(err));
  } else if (title !== "" && body !== "" && id !== "") {
    // updte post
    http
      .put(`http://localhost:3000/posts/${id}`, data)
      .then((data) => {
        ui.showAlert("Post updated", "alert alert-success");
        ui.changeFormState("add");
        getPosts();
      })
      .catch((err) => console.log(err));
  } else {
    ui.showAlert(
      "please fill in the fields before submitting",
      "alert alert-warning"
    );
  }
}

//delete post

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("are you sure")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert("post deleted", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// edit

function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
      .replace(/[\n\r]+|[\s]{2,}/g, " ")
      .trim();
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body,
    };
    ui.fillForm(data);
  }
}
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    e.preventDefault();
    ui.changeFormState("add");
  }
}
