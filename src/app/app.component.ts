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
	selector: 'vacayou-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('addform') addform: NgForm;

  submitForm(){
     this.addform.onSubmit(undefined);
  }
}
