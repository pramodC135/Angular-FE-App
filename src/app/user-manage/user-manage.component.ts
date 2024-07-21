import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { UserModel } from './usermanage.model';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      company : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllUser();
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails(){
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.company = this.formValue.value.company;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.salary = this.formValue.value.salary;

    this.api.postUser(this.userModelObj).subscribe(res => {
      console.log(res);
      alert("User Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    err=>{
      alert("Somethig Went Wrong")
    })
  }

  getAllUser(){
    this.api.getUser().subscribe(res =>{
      this.userData = res;
    })
  }

  deleteUser(row : any){
    this.api.deleteUser(row.id).subscribe(res =>{
      alert("User Deleted")
      this.getAllUser();
    })
  }
  onEdit(row: any){
    this.showAdd = false
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['company'].setValue(row.company);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateUserDetails(){
    this.userModelObj.firstName = this.formValue.value.firstName;
    this.userModelObj.lastName = this.formValue.value.lastName;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.company = this.formValue.value.company;
    this.userModelObj.mobile = this.formValue.value.mobile;
    this.userModelObj.salary = this.formValue.value.salary;

    this.api.updateUser(this.userModelObj, this.userModelObj.id).subscribe(res =>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    })
  }
}
