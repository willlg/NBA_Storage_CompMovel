import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Jogador from 'src/app/model/entities/Jogador';
import { FirebaseService } from 'src/app/model/services/firestore.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  nome!: string;
  idade!: number;
  altura!: number;
  peso!: number;
  universidade!: string;
  posicao: string;
  jogador: Jogador;
  indice: number;
  edicao: boolean = true;
  imagem: any;  
  user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alertController: AlertController, private auth : AuthService
  ) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.jogador = history.state.jogador;
    this.nome = this.jogador.nome;
    this.idade = this.jogador.idade;
    this.altura = this.jogador.altura;
    this.peso = this.jogador.peso;
    this.universidade = this.jogador.universidade;
    this.posicao = this.jogador.posicao;
  }

  
  uploadFile(imagem: any){
    this.imagem = imagem.files;
  }


  habilitar() {
    if (this.edicao) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  editar() {
    if (this.nome && this.idade && this.altura && this.peso && this.universidade && this.posicao) {
      let novo: Jogador = new Jogador(this.nome, this.idade, this.altura, this.peso, this.universidade, this.posicao);
      novo.id = this.jogador.id;
      novo.uid = this.user.uid;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo);
      }else{
        novo.downloadURL = this.jogador.downloadURL;
        this.firebase.update(novo, this.jogador.id);
      }
      this.router.navigate(['/home']);
    } 
    else {
      this.presentAlert('Erro', 'Por favor preencha todos os campos!');
    }
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async confirmarEdicao() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja editar este jogador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.editar();
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmarExclusao() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Você tem certeza que deseja apagar este jogador?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.excluir();
          },
        },
      ],
    });

    await alert.present();
  }


  excluir() {
    this.firebase.delete(this.jogador);
    this.router.navigate(['/home']);
  }
}
