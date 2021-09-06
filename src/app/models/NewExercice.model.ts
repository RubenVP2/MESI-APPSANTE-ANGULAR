import * as internal from "events";

export class NewExercice {
  constructor(public id_exercice:number, public imagehelp: string, public name: string,
    public nbreps: number, public nbseries : number,
    public restexercices: string, public restseries : string,
    public title: string) { }
}
