import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isOk = false;

  constructor(private xauth: AngularFireAuth) { 
    this.xauth.authState.subscribe(user =>{
      if(user){
        this.isOk = true;
      }else{
        this.isOk = false;
      }
    })
  }



  initEmailPass(email, pass){
    return this.xauth.auth.signInWithEmailAndPassword(email, pass).then((user: any)=>{
      if(user.user.emailVerified === false)  {
        alert('por favor verifique su correo');
        this.logOut();
      }
      console.log(user);
    }).catch(()=>{
      alert('error');
    });
  }

  register(email, pass){
    return this.xauth.auth.createUserWithEmailAndPassword(email, pass).then(async (user)=>{
      /* alert('registro completado'); */
      await this.sendMail();
      await this.logOut();
    });
  }

  sendMail(){
    this.xauth.auth.currentUser.sendEmailVerification().then(()=>{
      alert('verifique su correo con el enlace');
    })
  }

  googleAuth(){
    return this.authFuente(new auth.GoogleAuthProvider());
  }

  authFuente(fuente){
    this.xauth.auth.signInWithPopup(fuente).then(()=>{
      alert('estás en la app');
    });
  }

  logOut(){
    return this. xauth.auth.signOut().then(()=>{
      console.log('Salió');
    })
  }

}
