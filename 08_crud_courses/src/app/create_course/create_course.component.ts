import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create_course',
  imports: [FormsModule, NgIf],
  templateUrl: './create_course.component.html',
  styleUrl: './create_course.component.css'
})
export class CreateCourse implements OnInit {

  name: string = "";
  duration: string = "";
  price: string = "";
  showError: boolean = false;
  showSuccess: boolean = false;



  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    var session = sessionStorage.getItem('token');

    if (session == null || session.trim() == '') {
      this.router.navigate(['/login']);
    }

  }

  createCourse() {
    if (!this.name || !this.price || !this.duration) {
      this.showError = true;
    }
    this.showError = false;

    var url = "http://localhost:4000/api/course";

    var headers = new HttpHeaders();
    headers = headers.append(
      'Content-Type', 'application/json'
    );

    headers = headers.append('Authorization', sessionStorage.getItem('token') ?? '');


    var body = {
      'name': this.name,
      'hour_duration': this.duration,
      'price': this.price
    }

    this.httpClient.post(url, body, { headers }).subscribe({
      next: (resp: any) => {
        this.showError = false;
        this.showSuccess = true;
      },
      error: err => {
        this.showSuccess = false;
        this.showError = true;
        console.log(err);
      }
    });


  }

  goToHome() {
    this.router.navigate(['/']);
  }


}
