import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup

  constructor(public route:Router, public formBuilder:FormBuilder, public loadingCtrl:LoadingController, public authService:AutheticationService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email :['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
      ]],
      password:['',[
      Validators.required,
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8])(?=.*[A-Z]).{8,}")
      ]]

    
    })


  }
  get errorControl(){
    return this.loginForm?.controls;
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      const user = await this.authService
        .loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        )
        .catch((error) => {
          console.log(error);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.route.navigate(['/home']);
      } else {
        console.log('Provide correct values');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithGoogle() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    
    try {
      const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      if (credential.user) {
        loading.dismiss();
        this.route.navigate(['/home']);
      } else {
        console.log('Unable to login with Google.');
      }
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }

  async loginWithFacebook() {
    try {
      // Iniciar sesión con Facebook
      const credential = await this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  
      // Obtener los datos del usuario
      const user = await credential.user;
  
      // Manejar los datos del usuario
      // ...
  
      // Redirigir a la página de inicio
      this.route.navigate(['/home']);
    } catch (error) {
      // Maneja los errores de inicio de sesión
      // ...
    }
  }



}
