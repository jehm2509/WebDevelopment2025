
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@/auth/auth.service';
import { IRegisterResponse } from '@/core/interfaces/http.interface';
import { ROUTES } from '@/core/constants/routes.constants';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  email = '';
  password = '';
  message: string | null = null;
  error: string | null = null;
  routes = ROUTES;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  register() {
    this.message = null;
    this.error = null;
    this.auth.register(this.email, this.password).subscribe({
      next: (res: IRegisterResponse) => {
        console.log('Response');
        console.log(res);
        this.email = '';
        this.password = '';
        this.message = res.message;
        this.error = null;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log('Error');
        console.log(err.error.message);
        this.error = err.error.message;
        this.message = null;
        this.cdr.detectChanges();
      }
    });
  }
}
