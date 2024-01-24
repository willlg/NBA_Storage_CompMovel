import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Jogador from '../entities/Jogador';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = 'jogadores';

  constructor(private firestore : AngularFirestore, private storage: AngularFireStorage) { }

  read(uid : string){
    return this.firestore.collection(this.PATH, ref=> ref.where('uid', '==', uid))
    .snapshotChanges();
  }

  create(jogador : Jogador){
    return this.firestore.collection(this.PATH)
    .add({nome: jogador.nome, idade: jogador.idade, altura: jogador.altura, peso: jogador.peso, universidade: jogador.universidade, posicao : jogador.posicao, uid: jogador.uid});
  }

  update(jogador: Jogador, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: jogador.nome, idade: jogador.idade, altura: jogador.altura, peso: jogador.peso, universidade: jogador.universidade, posicao : jogador.posicao, uid: jogador.uid});
  }

  delete(jogador: Jogador){
    return this.firestore.collection(this.PATH)
    .doc(jogador.id)
    .delete()
  }

  createWithImage(jogador: Jogador){
    return this.firestore.collection(this.PATH)
    .add({nome: jogador.nome, idade: jogador.idade, altura: jogador.altura, peso: jogador.peso, universidade: jogador.universidade, posicao: jogador.posicao, downloadURL : jogador.downloadURL, uid: jogador.uid});
  }

  updateWithImage(jogador: Jogador, id: string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome: jogador.nome, idade: jogador.idade, altura: jogador.altura, peso: jogador.peso, universidade: jogador.universidade, posicao: jogador.posicao, downloadURL : jogador.downloadURL, uid: jogador.uid});
  }

  uploadImage(imagem: any, jogador: Jogador){
    const file = imagem.item(0);
    if(file.type.split('/')[0] !== 'image'){
      console.error('Tipo Não Suportado');
      return;
    }
    const path = `images/${jogador.nome}_${file.name}`;
    const fileRef = this.storage.ref(path);
    let task = this.storage.upload(path, file);
    task.snapshotChanges().pipe(
    finalize(()=>{
      let uploadFileURL = fileRef.getDownloadURL();
      uploadFileURL.subscribe(resp=>{
        jogador.downloadURL = resp;
        if(!jogador.id){
          this.createWithImage(jogador);
        }else{
          this.updateWithImage(jogador, jogador.id);
        }
      })
    })
  ).subscribe();
  }

}