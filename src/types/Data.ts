export type Fields =
  | 'id'
  | 'building'
  | 'floor'
  | 'dir'
  | 'firstName'
  | 'lastName'
  | 'phoneNumber'
  | 'garagePlace'
  | 'interCom'
  | 'keyNumb'
  | 'role';

export type User = Record<Fields, string>;
export type UserData = Partial<Record<Fields, string>>;
