import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Settings {
    openWithAuth: boolean;

    theme: string;
    notifications: boolean;
    network: string;
    networkShort: string;
    changeNetwork: (network: string) => void;
    alreadyOpened: boolean;
    updateTheme: (newTheme: string) => void;
    markOpened: () => void;
    createdWallet: boolean,
    updateNotifications: (newNotifications: boolean) => void;
    setDefault: () => void;

    isLoading: boolean,
    setLoading: (state: boolean) => void
    loadingTimeout: any,

    toast: {
        show: boolean,
        message: string,
        type: "success" | "error" | "info",
    },
    setToast: (message: string, type: "success" | "error" | "info") => void
    setOpenWithAuth: (val: boolean) => void
}


const AppSettings = create(
    persist<Settings>(
        (set, get) => ({
            openWithAuth: false,
            ek: {
                value: "",
                expiry: 0,
            },
            theme: "light",
            isLoading: false,
            toast: {
                show: false,
                message: "",
                type: "success"
            },
            loadingTimeout: null,
            notifications: true,

            network: "https://mainnet.helius-rpc.com/?api-key=",
            changeNetwork: (network: string) => {
                const net = network == 'mainnet' ? "https://mainnet.helius-rpc.com/?api-key=" : "https://devnet.helius-rpc.com/?api-key="
                set({ network: net })
                set({ networkShort: network })


            },
            networkShort: 'mainnet',

            alreadyOpened: false,
            skippedAiSettings: false,
            createdWallet: false,
            updateTheme: (newTheme: string) => set({ theme: newTheme }),
            markOpened: () => set({ alreadyOpened: true }),
            updateNotifications: (newNotifications: boolean) => set({ notifications: newNotifications }),

            setDefault: () => {
                // reset the default settings
                set(
                    {
                        theme: "light",
                        isLoading: false,
                        loadingTimeout: null,
                        notifications: true,
                        network: "https://mainnet.helius-rpc.com/?api-key=",
                        alreadyOpened: false,
                        createdWallet: false,
                    })
            },
            setToast: (message: string, type: "success" | "error" | "info") => {
                set({ toast: { message, type, show: true } })
                setTimeout(() => set({ toast: { show: false, message: "", type: "success" } }), 1000);
            },

            setOpenWithAuth: (val: boolean) => set({ openWithAuth: val }),
            setLoading: async (state) => {


                const previousTimeout = get().loadingTimeout;
                if (previousTimeout) {
                    clearTimeout(previousTimeout);
                }

                // Update loading state
                set({ isLoading: state });

                if (state) {
                    // Set a new timeout and store its ID
                    const timeoutId = setTimeout(() => {
                        set({ isLoading: false, loadingTimeout: null });
                        get().setToast('An Error occured!!', 'error')
                    }, 20000);

                    set({ loadingTimeout: timeoutId });
                } else {
                    // If manually turning off loading, clear any pending timeout
                    set({ loadingTimeout: null });
                }
                await new Promise(resolve => setTimeout(resolve, 100));

            }

        }),
        {
            name: 'settings', // Storage key
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for React Native
            onRehydrateStorage: () => (state) => {
                console.log("Rehydrating:", state?.network)
            }
        }
    )
);

export default AppSettings;
