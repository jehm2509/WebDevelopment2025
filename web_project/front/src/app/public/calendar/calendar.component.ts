import { IService, IServiceRequest } from '@/core/interfaces/http.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from './calendar.service';
import { CommonModule, NgIf } from '@angular/common';
import { CalendarEvent, CalendarModule, CalendarView, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SharedCalendarModule } from '@/core/shared/SharedCalendarModule.module';
import { addMinutes, format, isSameDay, isSameHour, parse } from 'date-fns';
import { ServiceServices } from '@/core/services/servicesService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, SharedCalendarModule, NgIf,FormsModule],
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit{

  service_requests: IServiceRequest[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  view: CalendarView = CalendarView.Week;
  selectedDate: Date = new Date();
  showFormModal: boolean = false;
  services: IService[] = [];
  service_id: string = "";
  client_name: string = "";
  client_email: string = "";
  client_phone: string = "";
  formated_date: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private calendarService: CalendarService, 
    private serviceServices: ServiceServices) {}

  ngOnInit(): void {
   
    this.calendarService.getServiceRequests().subscribe({
       next: (serviceRequests: IServiceRequest[]) => {
        
        console.log(serviceRequests);

        let _services = serviceRequests.filter(service => service.company_id == this.route.snapshot.paramMap.get('id'));

        this.events = _services.map(event => {
          const start = parse(event.date, 'yyyy-MM-dd HH:mm:ss', new Date());
          const end = addMinutes(start,60);
          return {
            start,
            end,
            title: event.service.name,
            color: { primary: '#1e90ff', secondary: '#D1E8FF' }
          }
        });

        


        console.log(this.events);

      },
      error: (err) => {
      }
    });

      this.serviceServices.getServices().subscribe({
        next: (services: IService[]) => {
          console.log('services');
          console.log(services);
          this.services = services.filter(service => service.company._id == this.route.snapshot.paramMap.get('id'));
        },
        error: (err) => {
        }
      });
  }

  closeModal(){
    this.showFormModal = false;    
  }


  goToHome(){
      this.router.navigate(['/']);

  }


  createEvent(){
    
  }

  onHourSegmentClicked(event: {date: Date}){

    const clickedDate = event.date;

    const isSlotOccupied = this.events.some(ev =>
      isSameDay(ev.start, clickedDate) && isSameHour(ev.start, clickedDate)
    );

    if (isSlotOccupied) {
      return; // do nothing date already selected
    }

    // Mostrar modal con formulario
    this.selectedDate = clickedDate;
    this.formated_date = format(clickedDate, 'dd/MM/yyyy HH:mm');
    this.showFormModal = true;
  }

}
