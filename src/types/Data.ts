export interface Fields {
  id?: string;
  building?: string;
  floor?: string;
  dir?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  garagePlace?: string;
  interCom?: string;
  keyNumb?: string;
  role?: string;
}

export type OneOfFields =
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
