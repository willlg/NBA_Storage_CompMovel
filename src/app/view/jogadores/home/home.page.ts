import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Jogador from 'src/app/model/entities/Jogador';
import { FirebaseService } from 'src/app/model/services/firestore.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public lista_jogadores : Jogador[] = [];
  public user : any;

  constructor(private firebase : FirebaseService,
    private router : Router, private authService : AuthService) {

      this.user = this.authService.getUserLogged();
      console.log(this.authService.getUserLogged());
      this.firebase.read(this.user.uid)
      .subscribe(res => {
        this.lista_jogadores = res.map(jogador =>{
          return{
            id: jogador.payload.doc.id,
            ... jogador.payload.doc.data() as any
          }as Jogador;
        })
      })
    }


  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(jogador : Jogador){
    this.router.navigateByUrl("/detalhar", {state : {jogador:jogador}});
  }

  getJogadoresPorPosicao(posicao: string) {
    return this.lista_jogadores.filter(jogador => jogador.posicao === posicao);
  }  

  logout(){
    this.authService.signOut().then((res)=>{
      this.router.navigate(["signin"]);
    })
  }
  
}
