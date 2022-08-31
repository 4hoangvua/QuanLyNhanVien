function Worker(account, name, email, password, dayWork, salary, position, timeWork){
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dayWork = dayWork;
    this.salary = salary;
    this.position = position;
    this.timeWork = timeWork;

    this.calcSalary = function(){
        var sumSalary = 0;
        switch(this.position){
            case "Sếp": sumSalary = salary * 3; break;
            case "Trưởng phòng": sumSalary = salary * 2; break;
            case "Nhân viên":   sumSalary = salary;
            default: break;
        }
        return sumSalary;
    }
    this.calcTypeWorker = function(){
        if(this.timeWork >= 192){
            return "Xuất sắc";
        }
        else if(this.timeWork >= 176){
            return "Giỏi";
        }
        else if(this.timeWork >= 160){
            return "Khá";
        }
        else {
            return "Trung bình";
        }
    }
}