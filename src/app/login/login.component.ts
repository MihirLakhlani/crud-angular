import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from './register.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formvalue !: FormGroup;
  employeemodal : EmployeeModel = new EmployeeModel();
  employeedata !: any
  
  
  constructor(private formbuilder:FormBuilder , private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      firstname : [''],
      lastname : [''],
      emailid : [''],
      password : [''],
      gender : [''],
      hobbies : [''],
      userexperiance : [''],
    })
    this.getallEmployee();
  }
  
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  postEmployeeDetails(){
    console.log("mihir")
    this.employeemodal.firstname = this.formvalue.value.firstname;
    this.employeemodal.lastname = this.formvalue.value.lastname;
    this.employeemodal.emailid = this.formvalue.value.emailid;
    this.employeemodal.gender = this.formvalue.value.gender;
    this.employeemodal.hobbies = this.formvalue.value.hobbies;
    this.employeemodal.userexperiance= this.formvalue.value.userexperiance;
    this.employeemodal.password=this.formvalue.value.password

    this.api.postEmployee(this.employeemodal)
    .subscribe(res=>{
      console.log(res);
      alert("Registered succesfully")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formvalue.reset()
      this.getallEmployee();
       
    },
    err=>{
      alert("something gone wrong!!!")
    })
    
  }
  getallEmployee()
  {
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeedata = res;
    })
  }

  deleteEmployee(row:any)
  {
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      console.log("hii")
      alert("Removed Successfully")
      this.getallEmployee();
    })
  }
}
