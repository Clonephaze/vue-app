import { createStore } from 'vuex';

export interface RootState {
    theme: 'light' | 'dark';
}

const store = createStore<RootState>({
    state: {
        theme: 'light', // default theme
    },
    mutations: {
        setTheme(state, theme: 'light' | 'dark') {
            state.theme = theme;
        },
    },
    actions: {
        toggleTheme({ state, commit }) {
            const newTheme = state.theme === 'light' ? 'dark' : 'light'; // Toggle logic
            commit('setTheme', newTheme); // Commit the new theme
            return Promise.resolve(); // Resolving a promise for the above usage
        },
    },
    getters: {
        isDarkMode: state => state.theme === 'dark',
    }
});

export default store;
