
var workerList = [
    {
      account: "123",
      name: "Hoang",
      email: "hoangstricker@gmail.com",
      password: "Ho45$",
      dayWork: "05/10/2022",
      salary: 1000000,
      position: "Sếp",
      timeWork: 123
    }
  ];

var resetInfo = function(){
    document.getElementById("btnReset").click();
}
var createWorker = function(){
    if(!validate()) return;
    var account = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;

    var newWorker = new Worker(account, name, email, password, dayWork, salary, position, timeWork);

    workerList.push(newWorker);

    renderWorker();

    saveData();
    resetInfo();
}


var getWorker = function(account){
    var index = findByAccount(account);
    if(index === -1){
        alert("Nhân viên không tồn tại");
        return;
    }
    
    var foundsWorker = workerList[index];
    
    document.getElementById("tknv").value = foundsWorker.account;
    document.getElementById("name").value = foundsWorker.name;
    document.getElementById("email").value = foundsWorker.email;
    document.getElementById("password").value = foundsWorker.password;
    document.getElementById("datepicker").value = foundsWorker.dayWork;
    document.getElementById("luongCB").value = foundsWorker.salary;
    document.getElementById("chucvu").value = foundsWorker.position;
    document.getElementById("gioLam").value = foundsWorker.timeWork;
    
    document.querySelector(`input[name=tk]`).disable = true;
}

var updateWorker = function(){

    var account = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = +document.getElementById("gioLam").value;

    var index = findByAccount(account);
    if(index === -1){
        alert("Nhân viên không tồn tại");
        return;
    }
    var foundsWorker = workerList[index];
    foundsWorker.account = account;
    foundsWorker.name = name;
    foundsWorker.email = email;
    foundsWorker.password = password;
    foundsWorker.dayWork = dayWork;
    foundsWorker.salary = salary;
    foundsWorker.position = position;
    foundsWorker.timeWork = timeWork;
    renderWorker();
    saveData();
    document.getElementById("btnReset").click();
}

var renderWorker = function(data){
    if(!data) data = workerList;
    var dataHTML = "";
    
    for( var i = 0; i < data.length; i++){
        dataHTML += `
        <tr>
		    <td>${data[i].account}</td>
		    <td>${data[i].name}</td>
		    <td>${data[i].email}</td>
		    <td>${data[i].dayWork}</td>
		    <td>${data[i].position}</td>
		    <td>${data[i].calcSalary()}</td>
		    <td>${data[i].calcTypeWorker()}</td>
            <td>
                <button class = "btn btn-danger" onclick="deleteWorker('${workerList[i].account}')">Xóa</button>
            </td>
            <td>
                <button class = "btn btn-info" onclick="getWorker('${workerList[i].account}')" data-toggle="modal" data-target="#myModal" >Cập nhật</button>
            </td>
		</tr>
        `;
    }
    document.getElementById("tableDanhSach").innerHTML = dataHTML;
}

var saveData = function() {
    var workerListJSON =  JSON.stringify(workerList); 
    localStorage.setItem("workerList", workerListJSON);
}
var getData = function(){
    var workerListJSON = localStorage.getItem("workerList");
    if(workerListJSON){
        workerList = mapData(JSON.parse(workerListJSON));
        renderWorker();
    }
}
var mapData = function(dataFromLocal){
    var data = [];
    for( var i = 0; i < dataFromLocal.length; i++){
        var currentWorker = dataFromLocal[i];
        var mappenWorker = new Worker(
            currentWorker.account,
            currentWorker.name,
            currentWorker.email,
            currentWorker.password,
            currentWorker.dayWork,
            currentWorker.salary,
            currentWorker.position,
            currentWorker.timeWork
        );
        data.push(mappenWorker);
    }
    return data;
}

var deleteWorker = function(account){
    var index = findByAccount(account);
    if(index === -1){
        alert("Nhân viên không tồn tại");
        return;
    }
    workerList.splice(index, 1);
    renderWorker();
    saveData();
}
var findWorker = function(){
    var keyword = document.getElementById("searchName").value.toLowerCase().trim();
    var result = [];
    for(var i = 0; i < workerList.length; i++){
        var typeWorker = workerList[i].calcTypeWorker().toLowerCase();
        if(typeWorker.includes(keyword)){
            result.push(workerList[i]);
        }
    }
    renderWorker(result);
}
var findByAccount = function(account){
    for(var i = 0 ; i < workerList.length; i++){
        if(workerList[i].account === account){
            return i;
        }
    }
    return -1;
}

workerList = mapData(workerList);
renderWorker();
getData();

// ---------Validation-------------

var validate = function(){
    var account = document.getElementById("tknv").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dayWork = document.getElementById("datepicker").value;
    var salary = document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var timeWork = document.getElementById("gioLam").value;

    var textPattern = /^[A-z ]+$/g;
    var salaryPattern = /[0-9]+/g;
    var timeWorkPattern = /[0-9]+/g;
    var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    var passwordPattern = /(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*]){6,10}/g;

    var isValid = true;

    isValid &= require(account, "tbTKNV") && length(account, "tbTKNV", 1, 6, "Tài khoản tối đa 4-6 ký số");
    isValid &= require(name, "tbTen") && pattern(name, "tbTen", textPattern);
    isValid &= require(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);
    isValid &= require(password, "tbMatKhau") && pattern(password, "tbMatKhau", passwordPattern);
    isValid &= require(dayWork, "tbNgay");
    isValid &= require(salary, "tbLuongCB") && pattern(salary, "tbLuongCB", salaryPattern) && limitNumber(salary, "tbLuongCB", 1000000, 20000000, "Lương từ 1tr-20tr");
    isValid &= require(position, "tbChucVu") && positionWork(position, "tbChucVu", "Chọn đúng chức vụ");
    isValid &= require(timeWork, "tbGiolam")  && pattern(timeWork, "tbGiolam", timeWorkPattern) && limitNumber(timeWork, "tbGiolam", 80, 200, "Giờ làm từ 80-200h");

    return isValid;
}

var require = function(value, spanId){
    if(!value){
        document.getElementById(spanId).style.display = "block";
        document.getElementById(spanId).innerHTML = "* Trường này bắt buộc nhập";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
        return true;
}

var length = function(value, spanId, min, max, message){
    if(value.length < min || value.length > max){
        document.getElementById(spanId).style.display = "block";
        document.getElementById(spanId).innerHTML = message;
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
}
var limitNumber = function(value, spanId, min, max, message){
    value *= 1;
    if(value < min || value > max){
        document.getElementById(spanId).style.display = "block";
        document.getElementById(spanId).innerHTML = message;
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
}

var pattern = function( value, spanId, regex){
    if(!regex.test(value)){
        alert(value);
        document.getElementById(spanId).style.display = "block";
        document.getElementById(spanId).innerHTML = "* Không đúng định dạng";
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
}
var positionWork = function(value, spanId, message){
    if(value.toLowerCase().includes("c")){
        document.getElementById(spanId).style.display = "block";
        document.getElementById(spanId).innerHTML = message;
        return false;
    }
    document.getElementById(spanId).innerHTML = "";
    return true;
}
