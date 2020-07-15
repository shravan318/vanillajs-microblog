import { http } from "./httplib";
import {ui} from "./ui"


document.addEventListener("DOMContentLoaded", getPosts);

//listen to add post 
document.querySelector(".post-submit").addEventListener("click", submitPost)

document.querySelector("#posts").addEventListener("click", deletePost)

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}


//SUBMIT post
function submitPost(){
  const title = document.querySelector("#title").value
  const body = document.querySelector("#body").value

  const data ={
    title,
    body
  }
  if(title !== "" && body !==""){

    // create post 
    http.post("http://localhost:3000/posts", data)
    .then(data => {
      ui.showAlert("Post Added", "alert alert-success");
      ui.clearFields()
      getPosts();
    })
    .catch(err => console.log(err))
  }

}

//delete post

function deletePost (e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains("delete")){
    const id = e.target.parentElement.dataset.id;
    if(confirm("are you sure")){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(()=>{
        ui.showAlert("post deleted", "alert alert-success")
        getPosts()
      })
      .catch(err => console.log(err))
    }
  }
}