import { useContext } from 'react';
import { AppContext, AppContextProps } from './Context';

export function useAppContext() {
    const context = useContext(AppContext) as AppContextProps;
    return context;
}
