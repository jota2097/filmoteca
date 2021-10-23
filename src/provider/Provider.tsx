import React, { createContext, useState } from 'react';
import {
    createMuiTheme,
    ThemeProvider as MuiThemeProvider,
    Theme
} from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';
import { IUserMovies } from '../interfaces/IUserMoviesModel';

interface ThemeProviderProps {
    children: React.ReactNode
    theme: Theme,
}

const ThemeDispatchContext = React.createContext<any>(null);
const defaultValueAppContext: IUserMovies = { wishlist: [], alreadySeen: [] };

const Provider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
    const [state, setState] = useState(defaultValueAppContext);
    const themeInitialOptions = {
        paletteType: 'light'
    }

    const [themeOptions, dispatch] = React.useReducer((state: any, action: any) => {
        switch (action.type) {
            case 'changeTheme':
                return {
                    ...state,
                    paletteType: action.payload
                }
            default:
                throw new Error();
        }
    }, themeInitialOptions);

    const memoizedTheme = React.useMemo(() => {
        return createMuiTheme({
            ...theme,
            palette: {
                type: themeOptions.paletteType
            }
        })
    }, [theme, themeOptions.paletteType]);

    const [themeOptions2, dispatch2] = React.useReducer((state: any, action: any) => {

        return {
            ...state
        }

    }, defaultValueAppContext);
    return (
        <MuiThemeProvider theme={memoizedTheme}>
            <ThemeDispatchContext.Provider value={dispatch}>
                <AppContext.Provider value={{ state, setState }}>
                    {children}
                </AppContext.Provider>
            </ThemeDispatchContext.Provider>
        </MuiThemeProvider>
    )
}

export default Provider
export const AppContext = createContext(defaultValueAppContext);

export const useChangeTheme = () => {
    const dispatch = React.useContext(ThemeDispatchContext);
    const theme = useTheme();
    const changeTheme = React.useCallback(() =>
        dispatch({
            type: 'changeTheme',
            payload: theme.palette.type === 'light' ? 'dark' : 'light'
        }),
        [theme.palette.type, dispatch]);

    return changeTheme;
}
