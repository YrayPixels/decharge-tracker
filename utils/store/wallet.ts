import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keypair, PublicKey } from '@solana/web3.js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Wallet {
    keypair: Keypair | null;
    publicKey: PublicKey | null;
    updateKeypair: (keypair: Keypair | null) => void;
    setDefault: () => void;
}

const WalletItem = create(
    persist<Wallet>(
        (set, get) => ({
            publicKey: null,
            keypair: null,
            updateKeypair: (keypair: Keypair | null) => set({ keypair, publicKey: keypair?.publicKey }),
            setDefault: () => {
                set({ keypair: null, publicKey: null });
            }
        }),
        {
            name: 'wallet', // Storage key
            storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for React Native
            onRehydrateStorage: () => (state) => {
                // console.log("Rehydrating:", state);
            }
        }
    )
);

export default WalletItem;
