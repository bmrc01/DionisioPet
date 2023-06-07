import React from 'react';

export const PreferencesContext = React.createContext({
    toggleTheme: (id: number) => { },
    appTheme: 0,
});