export default class Jogador{
    private _id: string;
    public _nome :string;
    public _idade : number;
    public _altura : number;
    public _peso : number;
    public _universidade : string;
    public _posicao : string;
    private _downloadURL: any; 
    private _uid: string;
  
    constructor(nome: string, idade : number, altura : number, peso : number, universidade : string, posicao : string){
        this._nome = nome;
        this._idade = idade;
        this._altura = altura;
        this._peso = peso;
        this._universidade = universidade;
        this._posicao = posicao;
    }

    get downloadURL() : any{
      return this._downloadURL
     }
  
     set downloadURL(downloadURL : any){
      this._downloadURL = downloadURL;
     }
  
  
    public get id(): string {
      return this._id;
    }
    public set id(value: string) {
      this._id = value;
    }
    public get nome(): string {
      return this._nome;
    }
    public set nome(value: string) {
      this._nome = value;
    }
  
    public get idade(): number {
      return this._idade;
    }
    public set idade(value: number) {
      this._idade = value;
    }
  
    public get altura(): number {
        return this._altura;
      }
    public set altura(value: number) {
        this._altura = value;
      }

    public get peso(): number {
        return this._peso;
      }
    public set peso(value: number) {
        this._peso = value;
    }

    public get universidade(): string {
        return this._universidade;
      }
    public set universidade(value: string) {
        this._universidade = value;
    }

    public get posicao(): string {
      return this._posicao;
    }
    public set posicao(value: string) {
      this._posicao = value;
    }

    public get uid(): string {
      return this._uid;
    }
    public set uid(value: string) {
      this._uid = value;
    }
  }