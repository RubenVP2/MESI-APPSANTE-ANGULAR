export class Feedback {
  constructor(public id: number, public id_user: number, public nature: string,
    public title: string, public description: string, public mail: string, public etat: string, public sexe: string,
    public date: Date, public username: string) { }
}
