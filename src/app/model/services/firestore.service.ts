import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Jogador from '../entities/Jogador';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'jogadores';

  constructor(private firestore : AngularFirestore) { }

  read(){
    return this.firestore.collection(this.PATH)
    .snapshotChanges();
  }

  create(jogador : Jogador){
    return this.firestore.collection(this.PATH)
    .add({nome: jogador.nome, idade: jogador.idade, altura: jogador.altura, peso: jogador.peso, universidade: jogador.universidade, posicao : jogador.posicao});
  }

  update(jogador: Jogador, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: jogador.nome, idade: jogador.idade, altura: jogador.altura, peso: jogador.peso, universidade: jogador.universidade, posicao : jogador.posicao});
  }

  delete(jogador: Jogador){
    return this.firestore.collection(this.PATH)
    .doc(jogador.id)
    .delete()
  }
}