import { IService } from '@/core/interfaces/http.interface';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { FormsModule } from '@angular/forms';

interface ICompanyData {
  _id: string,
  name: string,
  services: IService[]
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  searchTerm = '';
  services: IService[] = [];
  companies_data: ICompanyData[] = [];
  searched = false;

  constructor(private router: Router, private homeService: HomeService) { }

  ngOnInit() {

    this.homeService.getServices().subscribe({
      next: (services: IService[]) => {
        this.services = services;
        this.search();
      },
      error: (err) => {
      }
    });

  }

  // Aquí iría la llamada real al backend para buscar los servicios
  search() {

    let display_services = this.services.filter((s) =>
      s.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );


    let _companies_data: Record<string,ICompanyData> = {};


    display_services.forEach((service) => {
      const companyId: string = service.company._id;
      if (!_companies_data[companyId]) {
        _companies_data[companyId] = {
          _id: companyId,
          name: service.company.name,          
          services: []
        };
      }
      _companies_data[companyId].services.push(service);
    });

    this.companies_data = Object.values(_companies_data);

  }

  loadCalendar(companyId: string){
    
      this.router.navigate(['/calendar', companyId]);

  }


}
