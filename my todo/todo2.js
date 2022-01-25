var data = JSON.parse(localStorage.getItem("todolist")) || [];

console.log("data", data);
let updateIndex = "";
let updateStatus = false;

function addItem() {
    var Text = document.getElementById("input").value
    if (Text != "") {

        if (updateStatus) {
            //console.log("data[updateIndex]",data[updateIndex]);
            data[updateIndex].input = Text
            updateStatus = false
        } else {
            var textObj = {
                id: Math.random(),
                input: Text,
                status: false
            };

            data.push(textObj);
        }

        console.log("textObj", textObj);
        //data.splice(updateIndex,0,textObj);
        //data.push(textObj);
        prepareTableCell();
        localStorage.setItem("todolist", JSON.stringify(data));
        console.log("inputData++++++++++++++++++++++++", data);
       
    }
}


function ChangeHandler(id) {
    console.log("Id=check=uncheck", id);
    data.map(item => {
        if (item.id === id) {
            if (item.status === true) {
                item.status = false
            } else {
                item.status = true
            }
        }

        console.log("inputData++++++++++++++++++++++++", data);
    })
    // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data);
    prepareTableCell();
}
function prepareTableCell() {
    let table = `<table border="1" cellpadding="2" cellspacing="2">`;
    data.map(item => {
        if (item.status === true) {
            table += `<tr>
                                        <td><input type="checkbox" id="status" name="status" value="checked" checked="true" onchange="ChangeHandler(${item.id})"></td>
                                        <td align="center" style="text-decoration:line-through; margin: 2px 0; padding="10px 1000px" "><ul><li><b>${item.input}</b></li><ul></td>
                                        <td><button value="" class="btn btn-warning" onclick="editRow(${item.id})"><i class="bi bi-pencil-square"></i> </button></td> 
                                        <td><button value=""class="btn btn-danger" onclick="deleteRow(${item.id})"> <i class="bi bi-trash-fill"></i></button></td> 
                                    </tr>`
        } else {
            table += `<tr>
                                        <td><input type="checkbox" id="status" name="status" value="unchecked" onchange="ChangeHandler(${item.id})"></td>  
                                        <td align="center"><li>${item.input}</li></td>
                                        <td><button value="" class="btn btn-warning" onclick="editRow(${item.id})"><i class="bi bi-pencil-square"></i> </button></td> 
                                        <td><button value="" class="btn btn-danger" onclick="deleteRow(${item.id})"> <i class="bi bi-trash-fill"></i></button></td> 
                                    </tr>`
        }
    })
    table += `</table>`
    // console.log("tableeeeee",table);
    localStorage.setItem("todolist", JSON.stringify(data));
    document.getElementById("tablerows").innerHTML = table;
    document.getElementById("resetButton").style.visibility = "hidden";
}

function active() {

    var activearr = data.filter((item) => !item.status);
    let activearrtbl = `<table border="1" cellpadding="2" cellspacing="2">`;
    activearr.map(item => {
        activearrtbl += `<tr>
                                        <td><input type="checkbox" id="status" name="status" value="unchecked" onchange="ChangeHandleractive(${item.id})"></td>
                                        <td align="center" ><li><b>${item.input}</b></li></td>
                                        <td><button value="" class="btn btn-warning" onclick="editRow(${item.id})"><i class="bi bi-pencil-square"></i> </button></td> 
                                        <td><button value="" class="btn btn-danger" onclick="deleteRow(${item.id})"> <i class="bi bi-trash-fill"></i></button></td> 
                                    </tr>`
    })
    activearrtbl += `</activearrtbl>`
    console.log("active", activearr);
    document.getElementById("tablerows").innerHTML = activearrtbl;
    document.getElementById("resetButton").style.visibility = "hidden";
}

function ChangeHandleractive(id) {
    console.log("Id=check=uncheck..", id);
    data.map(item => {
        if (item.id === id) {
            if (item.status === true) {
                item.status = false
            } else {
                item.status = true
            }
        }
    })
    active();
}


function completed() {

    var completedarr = data.filter((item) => item.status);
    let completedarrtbl = `<table border="1" cellpadding="2" cellspacing="2">`;
    completedarr.map(item => {
        completedarrtbl += `<tr>
                                        <td><input type="checkbox" id="status" name="status" value="checked" checked="true" onchange="ChangeHandlercompleted(${item.id})"></td>
                                        <td align="center" style="text-decoration:line-through; margin: 2px 0; padding="10px 1000px" "><ul><li><b>${item.input}</b></li><ul></td>
                                        <td><button value="" class="btn btn-warning" onclick="editRow(${item.id})"><i class="bi bi-pencil-square"></i> </button></td> 
                                        <td><button value="" class="btn btn-danger" onclick="deleteRow(${item.id})"> <i class="bi bi-trash-fill"></i></button></td> 
                                    </tr>`
    })
    completedarrtbl += `</completedarrtbl>`
    console.log("completed", completedarr);
    document.getElementById("tablerows").innerHTML = completedarrtbl;
    document.getElementById("resetButton").style.visibility = "visible";
}

function ChangeHandlercompleted(id) {
    console.log("Id=check=uncheck..", id);
    data.map(item => {
        if (item.id === id) {
            if (item.status === true) {
                item.status = false
            } else {
                item.status = true
            }
        }
    })
    completed();
}

function editRow(id) {


    console.log("EditeID", id);
    updateStatus = true;
    var edit = data.map(item => item.id === id)
    const dataIndex = data.findIndex((item) => item.id === id)
    console.log("dataIndexxx", dataIndex);
    console.log("dataaaaaaaaaaaaaaAAAA", data);
    updateIndex = dataIndex
    document.getElementById("input").value = data[updateIndex].input


    console.log(edit);
    data1 = edit;
    localStorage.setItem("todolist", JSON.stringify(data1))
    prepareTableCell();
}


function deleteRow(id) {
    var newarray = data.filter((item) => item.id != id);
    data = newarray;
    localStorage.setItem("todolist", JSON.stringify(data))
    prepareTableCell();
}

function resetAll() {
    window.localStorage.clear();
    location.reload();
}

function validation() {
    document.getElementById("error").innerHTML = "";
    let text = document.getElementById("input").value

    // var text = document.myForm.input.value;
    //alert("Please Enter Value");
    if (text == "") {

        document.getElementById("error").innerHTML = "Please Enter Value..."
        return false;
    }
}

function dltActv(id) {
    let newArray = data.filter((item) => item.id !== id);
    console.log(newArray);
    data = newArray
    localStorage.setItem("todolist", JSON.stringify(data))
    active();
}

function dltCmplt(id) {
    console.log("Delete Completed");
    let newArray2 = data.filter((item) => item.id !== id);
    console.log(newArray2);
    data = newArray2
    localStorage.setItem("todolist", JSON.stringify(data))
    completed();
}