import { ROUTES } from '@/core/constants/routes.constants';
import { AuthService } from '@/core/services/AuthService';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

  routes = ROUTES;


  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }


  logout(){
    this.authService.logout();
    this.router.navigate([`${ROUTES.AUTH_PATH}/${ROUTES.LOGIN}`]);
  }


}
