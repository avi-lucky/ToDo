axios.get('/tasks', {
  headers: {
    Authorization: ('Bearer ', localStorage.getItem("token"))
  },
})
.then(function (response) {
  console.log(response);
  console.log(response.data)

  var list_pending = document.getElementById('pending')
  var list_completed = document.getElementById('completed')
  list_pending = `<h3 id="pending">Pending</h3>`
  list_completed = `<h3 id="completed">Completed</h3>`

  for (i=0; i< response.data.length; i++)
  {
    if(response.data[i].completed == false)
    {
      var task = response.data[i].description
      // var pending = response.data[i].completed == false
      console.log(typeof (task))
      console.log(task)
    id = response.data[i]._id
    console.log(id)
    list_pending += `<li id="${id}">${response.data[i].description}`
    list_pending += `<form>
                  <button onclick=updateStatus("${id}",${true})><input type="checkbox"></button>
                  <button onclick=deleteToDo("${id}") action="none" type="submit" value="Delete"><i class="far fa-trash-alt"></i></button>
                  <button onclick=modal(${i},"${id}","${task}") type="button" id="${i}" class="fa fa-edit"/>
            </form></li>`
    }
  }
  for (i=0; i< response.data.length; i++)
  {
    if(response.data[i].completed == true)
    {
      var task = response.data[i].description
      // var completed = response.data[i].completed == true
      id = response.data[i]._id
      console.log(id)
      list_completed += `<li id="${id}">${response.data[i].description}`
      list_completed += `<form>
                  <button onclick=updateStatus("${id}",${false})><input checked="checked" type="checkbox"></button>
                  <button onclick=deleteToDo("${id}") action="none" type="submit" value="Delete"><i class="far fa-trash-alt"></i></button>
                  <button onclick=modal(${i},"${id}","${task}") type="button" id="${i}" class="fa fa-edit"/>
            </form></li>`
          }
        }
  document.getElementById('pending').innerHTML = list_pending
  document.getElementById('completed').innerHTML = list_completed
  let form = document.getElementById('updateToDo');
})
.catch(function (error) {
  if (error.response) 
    console.log(localStorage.token)
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
});

function modal(i, id, task) {
  console.log(task)
  var modal = document.getElementById("myModal");
  var btn = document.getElementById(i);
  document.getElementById('moddal_value').value = task
  document.getElementById('modals').setAttribute('onclick',`updateToDo("${id}")`)

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

function updateStatus(id, status) {
  axios.patch("/tasks/"+ id + "", {
    completed: status
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
  const description = document.getElementById("moddal_value").value
  console.log(description)
  axios.patch("/tasks/"+ id + "", {
      description: description
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