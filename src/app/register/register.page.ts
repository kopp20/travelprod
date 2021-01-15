import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
import { RegisterRequest } from "../models/register-request";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthRequest } from "../models/auth-request";



@Component({
  templateUrl: "register.page.html",
})

export class RegisterPage {

  RegisterRequest: RegisterRequest;

  authRequest: AuthRequest;

 registerError: boolean;

 constructor(private auth: AuthService, private router: Router) {
  this.authRequest = new AuthRequest();
}

register(form: NgForm) {
  this.auth.register(form.value.name, form.value.password).subscribe(
    data => {
      this.authRequest.username = form.value.name;
      this.authRequest.password = form.value.password;
      this.auth.logIn(this.authRequest).subscribe(
        {
          next: () => this.router.navigateByUrl("/"),
          error: (err) => {
            this.registerError = true;
            console.warn(`Authentication failed: ${err.message}`);
          },
        });
    }
  );
}
}