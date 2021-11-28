// Write Javascript Here
const baseUrl = "http://localhost:3000/users";
const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};

var usersList=[];


getUsersRequest().then(users =>{
    //This function has been implemented already for you
    const tableEl = document.getElementById("table");
    for (const user of users) {
        usersList.push(user);
        tableEl.appendChild(createTableRow(user))
    }
})








function addNewUser(){
    //TODO: Implement me
    const tableEl = document.getElementById("table");
     let userName=window.prompt("Add user");
     if(userName){
     usersList.push({"id":usersList.length+1,"name":userName})
     tableEl.appendChild(createTableRow(usersList[usersList.length-1]))
     }else{
         alert("Please provide a user name!");
     }
}



function editUser(id, userName){
    //TODO: implement me
    let userEditName=window.prompt("Edit user",userName);
    if(userEditName){
      let obj={"id":id, "name":userEditName};
      updateUserRequest(obj);
      getUsersRequest();
    }else{
        alert("Please provide a valid user name!");
    }
}

function deleteUser(id){
    //TODO: implement me
   let deleteUser=window.confirm("Are you sure you want to delete this entry?");
   if(deleteUser){
   deleteUserRequest(id);
   getUsersRequest();
   }
}




//CRUD HELPER METHODS
function createUserRequest(user){
    return fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(user),
    }).then(response => response.json())
}


function  getUsersRequest()  {
    return fetch(baseUrl, {
        method: 'GET',
    }).then(response => response.json())
}

function  deleteUserRequest(id)  {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    }).then(response => response.json())
}


function updateUserRequest(user){
    return fetch(`${baseUrl}/${user.id}`, {
        method: 'PATCH',
        headers: headers,
        body:JSON.stringify(user),
    }).then(response => response.json())
}


//HELPER METHODS
function createTableRow(user){
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`;
    return tr;
}
