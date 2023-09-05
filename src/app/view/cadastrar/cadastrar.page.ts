import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Posicao } from 'src/app/model/entities/Enum';
import Jogador from 'src/app/model/entities/Jogador';
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

  constructor(private alertController: AlertController,
    private router : Router,
    private firebase: FirebaseService)  { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.idade && this.altura && this.peso && this.posicao && this.universidade){
      let novo : Jogador = new Jogador(this.nome, this.idade, this.altura, this.peso, this.universidade, this.posicao);
      this.firebase.create(novo);
      this.presentAlert("Sucesso!", "Jogador cadastrado.");
      this.router.navigate(["/home"]);
    }else{
     this.presentAlert("Erro", "Por favor preencha todos os campos!");
    }
  }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'CADASTRO',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
