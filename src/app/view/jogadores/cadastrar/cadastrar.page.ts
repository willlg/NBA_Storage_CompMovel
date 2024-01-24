import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { Posicao } from 'src/app/model/entities/Enum';
import Jogador from 'src/app/model/entities/Jogador';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firestore.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage  implements OnInit {
  public nome! :string;
  public idade! : number;
  public altura! : number;
  public peso! : number;
  public universidade! : string;
  public posicao! : Posicao;
  public imagem: any;
  public user: any;

  constructor(private alert: AlertService,
    private router : Router,
    private firebase: FirebaseService, private auth: AuthService)  {
      this.user = this.auth.getUserLogged();
     }

  ngOnInit() {
  }

  public uploadFile(imagem: any){
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(this.nome && this.idade && this.altura && this.peso && this.posicao && this.universidade){
      let novo : Jogador = new Jogador(this.nome, this.idade, this.altura, this.peso, this.universidade, this.posicao);
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        this.firebase.create(novo);
      }
      this.alert.presentAlert("Sucesso!", "Jogador cadastrado.");
      this.router.navigate(["/home"]);
    }else{
     this.alert.presentAlert("Erro", "Por favor preencha todos os campos!");
    }
  }

}
