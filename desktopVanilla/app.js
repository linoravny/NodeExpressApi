const tbodyID = "tbl_body";

function init(){
   getProducts() 
}

function getProducts() {
    _clearTbl();
    var container = document.getElementById(tbodyID);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/getProducts'); //true for processed asynchronously

    xhr.responseType = 'json';
    var arrOfProductsFileds = ["name", "email", "type"]
    xhr.onload = function () {

        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                data.map(item => {
                    const tr = document.createElement('tr');
                    tr.setAttribute('class', 'item-tr');
                    container.appendChild(tr);

                    var td, text, deleteBtn, editBtn;
                    var div;
                    var input;

                    arrOfProductsFileds.map((key, index) => {
                        td = document.createElement('td');
                          
                        div = document.createElement('div');
                        text = item[key] || null;
                        div.innerText = text;
                        div.classList.add("textForEdit");
                        td.appendChild(div);
                    
                        if(key === 'type') {
                            input = document.createElement('select');
                            //Create and append the options
                            var array = ["Services","Goods","Experiences"];
                            for (var i = 0; i < array.length; i++) {
                                var option = document.createElement("option");
                                option.value = array[i];
                                option.text = array[i];
                                input.appendChild(option);
                            }
                        } else {
                            input = document.createElement('input');
                            input.type = "text";
                            input.value = text;
                        }

                        input.classList.add("inputForEdit");
                        input.classList.add("hide");
                        td.appendChild(input);
                        

                        tr.appendChild(td);
                        //add buttons - edit + delete
                        if(index === (arrOfProductsFileds.length - 1)) {
                            editBtn = document.createElement('button');
                            editBtn.className = 'button editMode';
                            editBtn.innerText = 'Edit Product';
                            editBtn.addEventListener('click', function(event){
                               
                                var myCellInputs, myCellDiv;
                                for (var i = 0; i < tr.cells.length; i++) {
                                    myCellInputs = tr.cells[i].querySelectorAll('.inputForEdit')[0]; //input/select
                                    myCellDiv = tr.cells[i].querySelectorAll('div.textForEdit')[0];
                                    if(myCellInputs.classList.contains('hide')) { 
                                        myCellDiv.classList.add("hide");
                                        myCellInputs.classList.remove("hide");
                                    } else {
                                        myCellDiv.classList.remove("hide");
                                        myCellInputs.classList.add("hide");
                                    }
                                };

                                if(editBtn.classList.contains('editMode')) {
                                    editBtn.innerText = "Done";
                                    editBtn.classList.remove("editMode");
                                } else {
                                    //done click...
                                    var inputs = tr.querySelectorAll('.inputForEdit');
                                    var itemToEdit = {
                                        id: item._id,
                                        name: inputs[0].value,
                                        email: inputs[1].value,
                                        type: inputs[2].value
                                    }
                                    editProduct(itemToEdit);
                                    editBtn.innerText = 'Edit Product';
                                    editBtn.classList.add("editMode");
                                }
                            });
                            tr.appendChild(editBtn);
                            deleteBtn = document.createElement('button');
                            deleteBtn.className = 'button';
                            deleteBtn.innerText = 'Delete Product';
                            deleteBtn.addEventListener('click', function(event){
                                console.log("delete btn clicked");
                                deleteProduct(item._id)
                            });
                            tr.appendChild(deleteBtn);
                        }
                    });

                });
            } else {
                //handel error:
                const errorMessage = document.createElement('div');
                errorMessage.textContent = `it's not working!`;
                console.error(errorMessage);
            } 
        } else {
            console.error(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };

    xhr.send();
}

function _clearTbl() {
    var tbody = document.getElementById(tbodyID);
    while(tbody.hasChildNodes())
    {
        tbody.removeChild(tbody.lastChild);
    }
}

function deleteProduct(id){

    var body = {
        id: id
    };

    var req = JSON.stringify(body);

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:3000/deleteProduct'); 

    xhr.setRequestHeader("Content-Type", "application/json");
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.responseType = 'json';
    
    xhr.onload = function () {

        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                console.log("deleteProduct(): " + data.message);
                getProducts();
            } else {
                //handel error:
                const errorMessage = document.createElement('div');
                errorMessage.textContent = `it's not working!`;
                console.error(errorMessage);
            } 
        } else {
            console.error(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };

    xhr.send(req);
}

function _editProduct(product){
}

function editProduct(item){

    var body = {
        id: item.id,
        name: item.name,
        email: item.email,
        type: item.type
    };
    var req = JSON.stringify(body);

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/editProduct'); 

    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.responseType = 'json';
    
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            var data = this.response;
            if (data && xhr.status === 200) {
                console.log("edit success");
                getProducts();
            } else {
                //handel error:
                const errorMessage = document.createElement('div');
                errorMessage.textContent = `it's not working!`;
                console.error(errorMessage);
            } 
        } else {
            console.error(xhr.statusText);
        }
    }

    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };

    xhr.send(req);
}

function addProduct(product){

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        //var data = this.response;
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            getProducts();
            console.log("add product success");
        } 
    }

    xhr.onerror = function (e) {
        console.error("add product error");
    };

    var form = document.querySelector("form#productsForm");
    
    var body = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        type: form.elements.ddlTypes.value
    };
    var req = JSON.stringify(body);

    xhr.open('POST', 'http://localhost:3000/addProduct');
    //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    //xhr.setRequestHeader("Content-Length", req.length);
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.responseType = 'json';

    xhr.onprogress = function () {
        console.log('LOADING', xhr.readyState); // readyState will be 3
    };
    
    xhr.onload = function () {
        console.log('DONE', xhr.readyState); // readyState will be 4
    };

    xhr.send(req);
}

init();
