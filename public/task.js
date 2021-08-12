axios.get('/tasks', {
  headers: {
    Authorization: ('Bearer ', localStorage.getItem("token"))
  },
})
.then(function (response) {
  console.log(response);
  console.log(response.data)

  // const input = document.querySelector('input');
 
  // const pending = document.querySelector('.pending');
  // const completed = document.querySelector('.completed');

  // const newLi = document.createElement('li');
  // const checkBtn = document.createElement('button');
  // const delBtn = document.createElement('button');
  // const editBtn = document.createElement('button');

  // checkBtn.innerHTML = '<i class="fa fa-check"></i>';
  // delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  // editBtn.innerHTML = '<i class="fa fa-edit"></i>';

  // if(input.value !==''){
  //     newLi.textContent = input.value;
  //     input.value = '';
  //     pending.appendChild(newLi);
  //     newLi.appendChild(checkBtn);
  //     newLi.appendChild(delBtn);
  //     newLi.appendChild(editBtn);
  // }
  
  // checkBtn.addEventListener('click', function(){
  //   const parent = this.parentNode;
  //   parent.remove();
  //   completed.appendChild(parent);
  //   checkBtn.style.display = 'none'
  // })
  
  // delBtn.addEventListener('click', function(){
  //   const parent = this.parentNode;
  //   parent.remove();
  // })
  
  // editBtn.addEventListener('click', function(){
  //   const parent = this.parentNode;
  //   paragraph.contentEditable = true;
  //   editBtn.onclick = function() {
  //     modal.style.display = "block";
  //   }
  // })

  var list_pending = document.getElementById('pending')
  var list_completed = document.getElementById('completed')
  list_pending = `<h3 id="pending">Pending</h3>`
  list_completed = `<h3 id="completed">Completed</h3>`

  for (i=0; i< response.data.length; i++)
  {
    if(response.data[i].completed == false)
    {
    id = response.data[i]._id
    console.log(id)
    list_pending += `<li id="${id}">${response.data[i].description}`
    list_pending += `<form>
                  <button><i class="fa fa-check"></i></button>
                  <button onclick=deleteToDo("${id}") action="none" type="submit" value="Delete"><i class="far fa-trash-alt"></i></button>
                  <button onclick=updateToDo("${id}") action="none" type="submit" value="Update"><i class="fa fa-edit"></i></button>
            </form></li>`
    }
  }
  for (i=0; i< response.data.length; i++)
  {
    if(response.data[i].completed == true)
    {
    id = response.data[i]._id
    console.log(id)
    list_completed += `<li id="${id}">${response.data[i].description}`
    list_completed += `<form>
                  <button><i class="fa fa-check"></i></button>
                  <button onclick=deleteToDo("${id}") action="none" type="submit" value="Delete"><i class="far fa-trash-alt"></i></button>
                  <button onclick=updateToDo("${id}") action="none" type="submit" value="Update"><i class="fa fa-edit"></i></button>
            </form></li>`
    }
  }
  document.getElementById('pending').innerHTML = list_pending
  document.getElementById('completed').innerHTML = list_completed
  let form = document.getElementById('updateToDo');

//   var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

})
.catch(function (error) {
  if (error.response) 
    console.log(localStorage.token)
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
});

// add task
function addToDo() {
  const description = document.getElementById("description").value
  const completed = false
  axios.post("/tasks", {
    description: description,
    completed: completed
  },{
  headers: {
    Authorization : ('Bearer ', localStorage.getItem("token"))
  }})
  .then(function (response) {
    console.log(response)
    console.log(response.data)
    location.reload()
  })
  .catch(function (error) {
    console.log(error);
  });
}

 // update task
 function updateToDo(id) {
  console.log(id)
  const description = document.getElementById("description").value
  const completed = false
  console.log(description)
  console.log(completed)
  axios.patch("/tasks/"+ id + "", {
      description: description,
      completed: completed
  },{
  headers: {
    Authorization : ('Bearer ', localStorage.getItem("token"))
  }})
  .then(function (response) {
    console.log(response);
    console.log(response.data)
    location.reload()
  })
  .catch(function (error) {
    console.log(error);
  });
}

// delete task
function deleteToDo(id) {
    console.log("Tet")
    console.log(id)
    axios.delete("/tasks/"+ id + "/delete", {
      headers: {
        Authorization : ('Bearer ', localStorage.getItem("token"))
      },
    })
    .then(function (response) {
      console.log(response);
      console.log(response.data)
      location.reload()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

// logout
function logOut() {
    console.log(localStorage.getItem("token"))
    axios.post('/users/logout', {
    },
      {
      headers: {
        Authorization : ('Bearer ', localStorage.getItem("token"))
      }
    }).then((response) => {
      console.log("Logged Out")
      localStorage.removeItem("token");
      location.replace('/')
    }).catch ((error) => {
      console.log(error)
      console.log(localStorage.getItem("token"))
    })
  }