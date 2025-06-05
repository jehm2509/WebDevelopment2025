import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contacts.service';
import { IContact, IContactResponse } from '@/core/interfaces/http.interface';
import { NgForm } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ContactForm } from '../contact-form/contact-form';

declare const bootstrap: any;

@Component({
  selector: 'app-list-contacts',
  standalone: true,
  imports: [NgFor, NgIf, ContactForm],
  templateUrl: './list-contacts.html',
  styleUrl: './list-contacts.css'
})
export class ListContacts implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) { }

  contacts: IContact[] = [];
  loading: boolean = false;
  selectedContact?: IContact;
  modalInstance: any;
  showFormModal: boolean = false;
  showFormModalDelete: boolean = false;


  ngOnInit(): void {
    this.loading = true;
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (response: IContactResponse) => {

        console.log('response');
        console.log(response);

        this.loading = false;

        if (response.contacts) {
          this.contacts = response.contacts;
        }

        this.cdr.detectChanges();

      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  createNewContact() {
    this.openModal();
  }
  closeModal() {
    this.showFormModal = false;
  }

  openModal(contact?: IContact) {
    this.showFormModal = true;
    this.selectedContact = contact;
    this.cdr.detectChanges();
  }

  onFormSubmit(contact: any) {


    console.log(contact);

    const obs = contact._id
      ? this.contactService.updateContact(contact)
      : this.contactService.createContact(contact);

    obs.subscribe(() => {
      this.closeModal();
      this.loadContacts();
    });
  }

  deleteContact(){
    if(this.selectedContact){
      this.contactService.deleteContact(this.selectedContact).subscribe(() =>{
          this.closeModalDelete();
          this.loadContacts();
      });
    }
  }

  openModalDelete(contact: IContact){
    this.selectedContact = contact;
    this.showFormModalDelete = true;
  }
  closeModalDelete(){
    this.showFormModalDelete = false;
  }

}
