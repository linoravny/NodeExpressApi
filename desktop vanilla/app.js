const tbodyID = "tbl_body";

function getUsers() {
    clearTbl();
    var container = document.getElementById(tbodyID);
    var xhr = new XMLHttpRequest();//JSONHttpRequest
    xhr.open('GET', 'http://localhost:3000/getUsers', true); //true for processed asynchronously

    xhr.responseType = 'json';
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var arrOfUsersFileds = ["first_name", "last_name", "email", "status"]
    xhr.onload = function () {

        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                data.map(usr => {
                    const tr = document.createElement('tr');
                    tr.setAttribute('class', 'userTr');
                    container.appendChild(tr);

                    var td, text, deleteBtn, editBtn;

                    arrOfUsersFileds.map((key, index) => {
                        td = document.createElement('td');
                        text = usr[key] || null;
                        td.innerText = text;
                        tr.appendChild(td);
                        //add buttons - edit + delete
                        if(index === (arrOfUsersFileds.length - 1)) {
                            editBtn = document.createElement('button');
                            editBtn.innerText = 'Edit User';
                            editBtn.addEventListener('click', function(event){
                                console.log("edit btn clicked");
                                editUser(key);
                            });
                            tr.appendChild(editBtn);
                            deleteBtn = document.createElement('button');
                            deleteBtn.innerText = 'Delete User';
                            deleteBtn.addEventListener('click', function(event){
                                console.log("delete btn clicked");
                                deleteUser(key._id)
                            });
                            tr.appendChild(deleteBtn);
                        }
                    });

                });
            } else {
                //handel error:
                const errorMessage = document.createElement('div');
                errorMessage.textContent = `it's not working!`;
                app.appendChild(errorMessage);
            } 
        } else {
            console.error(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };

    xhr.send(null);
}

function clearTbl() {
    var tbody = document.getElementById(tbodyID);
    while(tbody.hasChildNodes())
    {
        tbody.removeChild(tbody.lastChild);
    }
}

function deleteUser(id){
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/users', true); 

    xhr.responseType = 'json';
    
    xhr.onload = function () {

        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                console.error("delete success");
            } else {
                //handel error:
                const errorMessage = document.createElement('div');
                errorMessage.textContent = `it's not working!`;
                app.appendChild(errorMessage);
            } 
        } else {
            console.error(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };

    xhr.send(null);
}

function editUser(user){
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/editUser', true); 

    xhr.responseType = 'json';
    
    xhr.onload = function () {

        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                console.error("edit success");
            } else {
                //handel error:
                const errorMessage = document.createElement('div');
                errorMessage.textContent = `it's not working!`;
                app.appendChild(errorMessage);
            } 
        } else {
            console.error(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };

    xhr.send(null);
}

function addUser(user){
//add form validation here...
    var form = document.querySelector("form#newUserForm");
    var formData = {
        first_name: form.elements.firstName.value,
        last_name: form.elements.lastName.value,
        email: form.elements.email.value,
        status: form.elements.ddlStatus.value
    };

    var data = JSON.stringify(formData);
   // var data = "first_name="+form.elements.firstName.value+"&last_name="+form.elements.lastName.value+"&email="+form.elements.email.value+"&status="+form.elements.ddlStatus.value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                console.error("edit success");
            } else {
                //handel error:
                // const errorMessage = document.createElement('div');
                // errorMessage.textContent = `it's not working!`;
                // app.appendChild(errorMessage);
            } 
        } else {
            console.log(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error("addUser error");
    };

    xhr.open('POST', 'http://localhost:3000/setUser', true); 
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
   // xhr.setRequestHeader("header_nb", "1");
   // xhr.setRequestHeader("header_ds", "logon");
    xhr.setRequestHeader( "Content-Type", "application/json; charset=UTF-8" );
    xhr.send(data);
}
