export interface PetInterface {
  name: string;
  race: string;
  vaccinated: boolean;
  lastVaccineDate?: string;
  image: string;
  description?: string;
  tag: string;
  vaccines: { name: string; vaccineDate: string }[];
}
