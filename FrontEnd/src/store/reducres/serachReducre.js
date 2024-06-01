import { createSlice } from "@reduxjs/toolkit";

const initialState={
    quickSearchQuery: {},    //FieldName : "query",
    // Filter
    country:null,
    topic:null,
    sector:null,
    pestle:null,
    region:null,
    searchQuery:'' //Search
}

const SearchSlice  =createSlice({
    name:'search',
    initialState,
    reducers:{
        saveQuickSearchQuery(state,action){
            return{
                ...state,
                quickSearchQuery:{
                    ...action.payload
                }
            }
        },

        saveFilterCountry(state,action){
            console.log("action.payload ==='country'", action.payload);
            if (action.payload ==='country'){
                return  {
                    ...state,
                    country: null
                }
            }else{
                return{
                    ...state,
                    country : action.payload 
                }
            }
        },

        saveFilterTopic(state, action) {
            if (action.payload === 'topic') {
                return {
                    ...state,
                    topic: null
                };
            } else {
                return {
                    ...state,
                    topic: action.payload
                }
            }
        },
        
        saveFilterSector(state, action) {
            if (action.payload === 'sector') {
                return {
                    ...state,
                    sector: null
                };
            } else {
                return {
                    ...state,
                    sector: action.payload
                }
            }
        },

        saveFilterPestle(state, action) {
            if (action.payload === 'pestle') {
                return {
                    ...state,
                    pestle:null
                };
            } else {
                return {
                    ...state,
                    pestle: action.payload
                }
            }
        },
        
        saveFilterRegion(state, action) {
            if (action.payload === 'region') {
                return {
                    ...state,
                    region: null
                };
            } else {
                return {
                    ...state,
                    region: action.payload
                }
            }
        },

        saveSearchQuery(state, action) {
                return {
                    ...state,
                    searchQuery: action.payload
                }
        },

    }
})

export const{
    saveQuickSearchQuery,
    saveFilterCountry,
    saveFilterPestle,
    saveFilterRegion,
    saveFilterSector,
    saveFilterTopic,
    saveSearchQuery
}=SearchSlice  .actions;

export default SearchSlice  .reducer