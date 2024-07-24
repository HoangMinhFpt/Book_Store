// features/genres/genreSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllGenre } from '../../services/GenreManage';

export const fetchGenres = createAsyncThunk('genres/fetchGenres', async () => {
    const response = await getAllGenre();
    return response.data;
});

const genreSlice = createSlice({
    name: 'genres',
    initialState: { data: [], status: 'idle', error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default genreSlice.reducer;
