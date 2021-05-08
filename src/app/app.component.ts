import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  NgForm
} from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('addform') addform: NgForm;
  contactsForm: FormGroup;
  public isAddFormOpen = false;
  public isEdit = false;
  public contactsList = [];
  constructor(private _fb: FormBuilder) {
    this.contactsForm = this._fb.group({
      id: [Number],
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$')
        ]
      ],
      department: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
        ]
      ]
    });
  }

  get formControls() {
    return this.contactsForm.controls;
  }

  trackByFn(index, entity) {
    return entity.email;
  }

  submitForm() {
    if (this.isAddFormOpen) {
      this.addform.onSubmit(undefined);
    } else {
      this.isAddFormOpen = true;
    }
  }

  editForm(i) {
    this.isEdit = true;
    this.contactsForm.patchValue(this.contactsList[i]);
    this.isAddFormOpen = true;
  }

  submitContactsForm() {
    if (this.contactsForm.invalid) {
      return;
    } else if(this.isEdit){
      let item = this.contactsList.find(x => x.id == this.contactsForm.value.id);
      console.log(item);
      if (item) {
        item = {...this.contactsForm.value}
      }
      console.log(this.contactsList)
      this.isEdit = false;
      this.isAddFormOpen = false;
      this.addform.reset();
    } else {
      this.contactsForm.get('id').setValue(this.contactsList.length + 1);
      this.contactsList.push(this.contactsForm.value);
      this.isAddFormOpen = false;
      this.addform.reset();
    }
  }
}
