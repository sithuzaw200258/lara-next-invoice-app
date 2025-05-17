// useAccountStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAccountStore = create(
    persist(
        (set) => ({
            token: null,
            setToken: (newToken) => set({ token: newToken }),
            logout: () => set({ token: null }),
        }),
        {
            name: 'account-storage', // Key in localStorage
            getStorage: () => localStorage, // optional: defaults to localStorage
        }
    )
);

export default useAccountStore;
