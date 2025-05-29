import { IServiceRequest } from '@/core/interfaces/http.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit{

  serice_requests: IServiceRequest[] = [];

  ngOnInit(): void {
      
  }

}
