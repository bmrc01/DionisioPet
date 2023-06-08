import React from 'react';


interface AdoptedPetsContextType {
    adoptedPets: string[];
    setAdoptedPets: React.Dispatch<React.SetStateAction<string[]>>;
    addPet: (elemento: string) => void;
}

export const AdoptedPetsContext = React.createContext<AdoptedPetsContextType>({
    adoptedPets: [],
    setAdoptedPets: () => { },
    addPet: () => { }
});
