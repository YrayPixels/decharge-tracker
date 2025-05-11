
import { Keypair } from "@solana/web3.js";
import { Linking } from "react-native";
import AppSettings from "../store/settingsstore";
import WalletItem from "../store/wallet";


const cleanNumber = (input: any) => {
    // Remove non-digit characters
    let cleaned = input.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.slice(1);
    }
    return cleaned

}

const showToast = (message: string) => {

    AppSettings.getState().setToast(message, 'info')
}








type DateInput = number | string | Date;

interface FormatOptions {
    locale?: string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
}
function formatDate(input: DateInput, options: FormatOptions = {}): string {
    const {
        locale = 'en-US',
        dateStyle = 'medium',
        timeStyle = 'short'
    } = options;

    let date: Date;

    if (typeof input === 'number') {
        // Detect seconds vs milliseconds
        date = input < 1e12 ? new Date(input * 1000) : new Date(input);
    } else if (typeof input === 'string') {
        date = new Date(input);
    } else if (input instanceof Date) {
        date = input;
    } else {
        throw new Error('Unsupported date format');
    }

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    return new Intl.DateTimeFormat(locale, { dateStyle, timeStyle }).format(date);
}

const shortenPub = (pub: string) => {
    return pub.slice(0, 4) + "..." + pub.slice(-4)
}


const keypairSign = async () => {
    const keypair = WalletItem.getState().keypair;
    if (!keypair) {
        return null;
    }
    const secretKeyArray = Object.values(keypair["_keypair"].secretKey)
    const keypairNew = Keypair.fromSecretKey(Uint8Array.from(secretKeyArray));

    return keypairNew;
}


// const signTransactions = async (tx: string) => {
//     const network = AppSettings.getState().network;
//     const connection = new Connection(`${network}${api_key}`)

//     const keyPair = await keypairSign();
//     if (!keyPair || !connection) {
//         return 'Keypair not initialized or connection failed!'

//     }

//     const txBuffer = Buffer.from(tx, "base64");

//     let transaction = Transaction.from(txBuffer);
//     // Correct way to sign
//     transaction.partialSign(keyPair);

//     try {
//         const txid = await connection.sendRawTransaction(transaction.serialize());

//         return txid;
//     } catch (error) {

//         return `Signing failed: ${error instanceof Error ? error.message : String(error)}`;
//     }
// }

const openURL = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        await Linking.openURL(url);
    } else {
        console.warn(`Don't know how to open URI: ${url}`);
    }
};
export {
    cleanNumber,


    formatDate, keypairSign,

    openURL, shortenPub, showToast
};
