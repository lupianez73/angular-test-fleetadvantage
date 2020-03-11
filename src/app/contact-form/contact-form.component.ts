import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormData } from '../models/contact-form.model';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ValidationErrors, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() formData: FormData;
  form: FormGroup
  faCoffee = faCoffee;
  closeResult: string;
  fromDate: NgbDate;
  maxDate: NgbDate;

  constructor(private modalService: NgbModal, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private formBuilder: FormBuilder) {
    // this.fromDate = calendar.getToday();
    this.maxDate = calendar.getNext(calendar.getToday(), 'd', 0);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(56), Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.maxLength(56), Validators.minLength(1)]],
      date: [null, [
        Validators.required,
        Validators.minLength(4)]]
    });
  }

  close() {
    let validation = false;
    if(validation) {
      this.modalService.dismissAll();
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  validateAllFormFields(formGroup: FormGroup) {       
  Object.keys(formGroup.controls).forEach(field => {  
    const control = formGroup.get(field);            
    if (control instanceof FormControl) {             
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        
      this.validateAllFormFields(control);            
    }
  });
}

  onSubmit() {
    if (this.form.valid) {
      alert('form submitted');
    } else {
      this.validateAllFormFields(this.form); //{7}
    }
  }

}
