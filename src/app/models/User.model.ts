export class User {
  constructor(public id: number, public username: string, public password: string, public mail: string, public sexe: string,
              public age: number, public reminderweight: number, public remindermeasurements: number, public isAdmin: boolean) {}
}
