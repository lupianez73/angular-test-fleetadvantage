import { Component, Output } from '@angular/core';
import {FormData, DataFormat} from './models/contact-form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-project';
  
  formData = new FormData(
    new DataFormat("First Name", "Enter First Name", "", "This field is required and most have between 1 and 56 chars"), 
    new DataFormat("Last Name", "Enter Last Name", "",  "This field is required and most have between 1 and 56 chars"), 
    new DataFormat("Login"),
    new DataFormat("Date of birth", "yyyy-mm-dd", "",  "Date is invalid"), 
    "Login Panel"); 
}
