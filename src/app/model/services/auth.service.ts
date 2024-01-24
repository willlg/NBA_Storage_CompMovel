import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from 'src/app/model/services/firestore.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, browserPopupRedirectResolver, GoogleAuthProvider, GithubAuthProvider, } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(private firebase: FirebaseService, private fireAuth: AngularFireAuth, private ngZone: NgZone) { 
    this.fireAuth.authState.subscribe(user=>{
      if(user){
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados));
      }else{
        localStorage.setItem('user', 'null');
      }
    });
  }

  public signIn(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  public signUpWithEmailPassword(email: string, password: string){
    return this.fireAuth.createUserWithEmailAndPassword(email,password);
  }

  public recoverPasword(email: string){
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  //métodos gerais
  public signOut(){
    return this.fireAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      });
  }

  public isLoggedIn() : boolean{
    const user : any = JSON.parse(localStorage.getItem('user') || 'null');
    return (user!==null) ? true : false;
  }

  public getUserLogged(){
    const user : any = JSON.parse(localStorage.getItem('user') || 'null');
    if(user != null){
      return user;
    }else{
      return null;
    }
  }

  public signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

  public signInWithGitHub() {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider, browserPopupRedirectResolver);
  }

}