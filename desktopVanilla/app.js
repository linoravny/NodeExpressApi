
'use stric';

const main = function(){
    const tbodyID = "tbl_body";

    function init(){
        getProducts() 
    }

    function getProducts() {
        _clearTbl();
        var container = document.getElementById(tbodyID);
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/getProducts');

        xhr.responseType = 'json';
        
        xhr.onload = function () {
            var arrOfProductsFileds = ["name", "email", "type"];
            if (xhr.readyState === 4) {
                var data = this.response;
                if (data && xhr.status === 200) {
                    data.map(item => {
                        const tr = document.createElement('tr');
                        tr.setAttribute('class', 'item-tr');
                        container.appendChild(tr);

                        var td, text, deleteBtn, editBtn;
                        var div, errorEditDiv, input;

                        arrOfProductsFileds.map((key, index) => {
                            td = document.createElement('td');
                            // required error message
                            if(index == 0) {
                                errorEditDiv = document.createElement('div');
                                errorEditDiv.innerText = "Email and Name are required";
                                errorEditDiv.classList.add("editError");
                                errorEditDiv.classList.add("error");
                                td.appendChild(errorEditDiv);
                            }

                            // text td - read only mode
                            div = document.createElement('div');
                            text = item[key] || null;
                            div.innerText = text;
                            div.classList.add("textForEdit");
                            td.appendChild(div);

                            // inputs td - edit mode
                            if(key === 'type') {
                                input = document.createElement('select');
                                // Create and append the options
                                var array = ["Services","Goods","Experiences"];
                                var option;
                                for (let i = 0; i < array.length; i++) {
                                    option = document.createElement("option");
                                    option.value = array[i];
                                    option.text = array[i];
                                    input.appendChild(option);
                                }
                            } else {
                                input = document.createElement('input');
                                input.type = "text";
                                input.required = true;
                                input.value = text;
                            }
                            input.classList.add("inputForEdit");
                            input.classList.add("hide");
                            td.appendChild(input);
                            
                            tr.appendChild(td);

                            // add buttons - edit + delete
                            if(index === (arrOfProductsFileds.length - 1)) {
                                // EDIT
                                editBtn = document.createElement('button');
                                editBtn.className = 'button editMode';
                                editBtn.innerText = 'Edit Product';
                                
                                editBtn.addEventListener('click', function(event){
                                
                                    var editError = document.querySelector(".editError");
                                    editError.style.display = "none";
                                    var inputs = tr.querySelectorAll('.inputForEdit');

                                    var myCellInputs, myCellDiv;
                                    for (let i = 0; i < tr.cells.length; i++) {
                                        myCellInputs = tr.cells[i].querySelectorAll('.inputForEdit')[0]; 
                                        myCellDiv = tr.cells[i].querySelectorAll('div.textForEdit')[0];
                                        if(myCellInputs.classList.contains('hide')) { // read only mode
                                            myCellDiv.classList.add("hide");
                                            myCellInputs.classList.remove("hide");
                                        } else {
                                            if(inputs[0].value && inputs[1].value) { // edit mode
                                                myCellDiv.classList.remove("hide");
                                                myCellInputs.classList.add("hide");
                                            }
                                        }
                                    };

                                    if(editBtn.classList.contains('editMode')) { // click to switch - edit mode
                                        editBtn.innerText = "Done";
                                        editBtn.classList.remove("editMode");
                                    } else { // click to switch - read only mode
                                        // "done" click
                                        var itemToEdit = {
                                            id: item._id,
                                            name: inputs[0].value,
                                            email: inputs[1].value,
                                            type: inputs[2].value
                                        }
                                        if(inputs[0].value && inputs[1].value){                             
                                            editProduct(itemToEdit);
                                            editBtn.innerText = 'Edit Product';
                                            editBtn.classList.add("editMode");
                                        } else {
                                            editError.style.display = "block";
                                        }
                                    }
                                });
                                tr.appendChild(editBtn);
                                // EDIT END

                                // DELETE
                                deleteBtn = document.createElement('button');
                                deleteBtn.className = 'button';
                                deleteBtn.innerText = 'Delete Product';
                                deleteBtn.addEventListener('click', function(event){
                                    console.log("delete btn clicked");
                                    deleteProduct(item._id)
                                });
                                tr.appendChild(deleteBtn);
                                // DELETE END
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

    function addProduct(){
        var addError = document.querySelector(".addError");
        var form = document.querySelector("form#productsForm");
            
        addError.style.display = "none";

        if(form.elements.name.value && form.elements.email.value){
            var xhr = new XMLHttpRequest();

            var body = {
                name: form.elements.name.value,
                email: form.elements.email.value,
                type: form.elements.ddlTypes.value
            };
            var req = JSON.stringify(body);

            xhr.open('POST', 'http://localhost:3000/addProduct');
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.responseType = 'json';

            xhr.onreadystatechange = function () {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    getProducts();
                    console.log("add product success");
                } 
            }

            xhr.onerror = function (e) {
                console.error("add product error");
            };

            xhr.send(req);
        } else {
            addError.style.display = "block";
        }
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

    init();

    return {
        getProducts:getProducts,
        addProduct:addProduct,
        editProduct:editProduct,
        deleteProduct: deleteProduct
    }

}();
