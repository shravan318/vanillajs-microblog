class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }
  showPosts(posts) {
      console.log(posts)
    let output = "";
    posts.forEach((post) => {
      output += `
         <div class="card mb-3">
         <div class="card-body">
         <h4 class="card-title">
         ${post.title}
         </h4>
         <p class="card-text">${post.body}</p>
         <a href="#" class="edit card-link" data-id="${post.id}">
         <i class="fa fa-pencil"></i>
         </a>
         <a href="#" class="delete card-link" data-id="${post.id}">
         <i class="fa fa-trash"></i>
         </a>
         </div>
         </div>
        `;
    });
    this.post.innerHTML = output
  }

  showAlert(message,className){
      this.clearAlert();

      const div = document.createElement("div")
      div.className = className
      div.appendChild(document.createTextNode(message))

      const postContainer = document.querySelector(".postsContainer")
    
      const posts = document.querySelector("#posts")

      postContainer.insertBefore(div, posts)

      setTimeout(()=>{
          this.clearAlert()
      },3000)

  }
  clearAlert(){
      const currentAlert = document.querySelector(".alert")

      if(currentAlert){
          currentAlert.remove()
      }

  }
  clearFields(){
      this.titleInput.value = ""
      this.bodyInput.value=""
  }
  fillForm(data){
    this.idInput.value = data.id
    this.titleInput.value = data.title
    this.bodyInput.value= data.body
    this.changeFormState("edit")
}
changeFormState(type){
  if(type === "edit"){
    this.postSubmit.textContent = "Update Post"
    this.postSubmit.className = "post-submit btn btn-warning btn-block"

    const cancelBtn = document.createElement("button")
    cancelBtn.className = "post-cancel btn btn-light btn-block"
    cancelBtn.appendChild(document.createTextNode("Cancel Edit"))

    const cardForm = document.querySelector(".card-form")
    
    const formEnd = document.querySelector(".form-end")

    cardForm.insertBefore(cancelBtn, formEnd)


  }else{
    this.postSubmit.textContent = "Post It"
    this.postSubmit.className = "post-submit btn btn-primary btn-block"

    if( document.querySelector(".post-cancel")){
      document.querySelector(".post-cancel").remove()
    }
    this.clearId()
    this.clearFields()
  }
}
clearId(){
  this.idInput.value=""
}

}
export const ui = new UI();
