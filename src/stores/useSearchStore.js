import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchResults: [],
        searchQuery: '',
    }),
    actions: {
        setSearchResults(results, query) {
            this.searchResults = results;
            this.searchQuery = query;
        },

    },
}); 