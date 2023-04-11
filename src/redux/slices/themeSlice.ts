import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeSlice {
    theme: 'light' | 'dark';
};

const initialState: ThemeSlice = {
    theme: 'light'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;