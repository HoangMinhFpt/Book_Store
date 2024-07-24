// features/authors/authorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllAuthor } from '../../services/AuthorManage';

export const fetchAuthors = createAsyncThunk('authors/fetchAuthors', async () => {
    const response = await getAllAuthor();
    return response.data;
});

const authorSlice = createSlice({
    name: 'authors',
    initialState: { data: [], status: 'idle', error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAuthors.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchAuthors.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authorSlice.reducer;
