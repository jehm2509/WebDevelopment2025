import { IContact } from '@/core/interfaces/http.interface';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  @Input() contact?: IContact;
  @Output() formSubmit = new EventEmitter<IContact>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      _id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      cellphone: ['']
    });
  }

  ngOnInit() {
    if (this.contact) {
      this.form.patchValue(this.contact);
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as IContact);
    }
  }
}
