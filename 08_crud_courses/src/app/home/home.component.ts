import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  coursesList: any[] = [];
  messageSuccess: string = "";

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    var session = sessionStorage.getItem('token');

    if (session == null || session.trim() == '') {
      this.router.navigate(['/login']);
    }

    this.loadCoursesList();


  }

  loadCoursesList() {
    var url = 'http://localhost:4000/api/courses';
    var headers = new HttpHeaders().set(
      'Content-Type', 'application/json'
    );

    this.httpClient.get(url, { headers }).subscribe({
      next: (resp: any) => {

        this.coursesList = resp;
      },
      error: err => {

      }
    });

  }

  goToCreateCourse() {
    this.router.navigate(['/create_course']);
  }

  logOut() {
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  deleteCourse(course_id: string) {

    this.messageSuccess = "";
    if (confirm('confirm delete course?')) {

      var url = "http://localhost:4000/api/course/" + course_id;

      var headers = new HttpHeaders();
      headers = headers.append(
        'Content-Type', 'application/json'
      );

      headers = headers.append('Authorization', sessionStorage.getItem('token') ?? '');

      this.httpClient.delete(url, { headers }).subscribe({
        next: (resp: any) => {
          this.coursesList = this.coursesList.filter(course => course._id != course_id);
          //this.loadCoursesList();
          this.messageSuccess = "Course deleted!";
        },
        error: err => {

        }
      });
    }
  }


}
