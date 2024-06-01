import { configureStore } from '@reduxjs/toolkit';
import searchReducre from './reducres/serachReducre';

const store = configureStore({
    reducer: {
        searchQuery:searchReducre
    }
})

export default store;