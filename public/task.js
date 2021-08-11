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

//   var list = document.getElementById('list')
//   list = 'Pending'
//   // list  = '<tr><th>Pending</th><th>Completed</th></tr>'
//   for (i=0; i< response.data.length; i++)
//   {
//     id = response.data[i]._id
//     console.log(id)
//     list += '<tr>'
//     list += '<td>' + response.data[i].description + '</td>'
//     list += '<td>' + response.data[i].completed + '</td>'
//     list += '<td>' + '<button onclick=deleteToDo("' + id + '") action="none" type="submit" value="Delete">Delete</button>'
//     list += '<td>' + '<button onclick=updateToDo("' + id + '") action="none" type="submit" value="Update">Update</button>'
//     list += '</tr>'
//   }
//   document.getElementById('list').innerHTML = list
//   let form = document.getElementById('updateToDo');
})
.catch(function (error) {
  if (error.response) 
    console.log(localStorage.token)
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
});

// var li = document.getElementById('li')

// const input = document.querySelector('input');
// const btn = document.querySelector('.addTask > button');

// btn.addEventListener('click', addToDo);

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

// function addToDo() {
//     const pending = document.querySelector('.pending');
//     const completed = document.querySelector('.completed');

//     const newLi = document.createElement('li');
//     const checkBtn = document.createElement('button');
//     const delBtn = document.createElement('button');
//     const editBtn = document.createElement('button');

//     checkBtn.innerHTML = '<i class="fa fa-check"></i>';
//     delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
//     editBtn.innerHTML = '<i class="fa fa-edit"></i>';

//     if(input.value !==''){
//         newLi.textContent = input.value;
//         input.value = '';
//         pending.appendChild(newLi);
//         newLi.appendChild(checkBtn);
//         newLi.appendChild(delBtn);
//         newLi.appendChild(editBtn);
//     }

//     checkBtn.addEventListener('click', function(){
//         const parent = this.parentNode;
//         parent.remove();
//         completed.appendChild(parent);
//         checkBtn.style.display = 'none'
//     })

//     delBtn.addEventListener('click', function(){
//         const parent = this.parentNode;
//         parent.remove();
//     })

//     editBtn.addEventListener('click', function(){
//         const parent = this.parentNode;
//         paragraph.contentEditable = true;
//         editBtn.onclick = function() {
//             modal.style.display = "block";
//         }
//     })
// }

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