export interface IAddress {
  country: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface Iuser {
  id?: string;
  Uid?: string;
  name: string;
  role: string;
  experience: number;
  description: string;
  imageUrl?: string;
  skills: string[];

  address: {
    currentAddress: IAddress;
    permanentAddress: IAddress;
  };
}


