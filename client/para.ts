import { Environment, ParaMobile } from "@getpara/react-native-wallet";

const Key = process.env.EXPO_PUBLIC_PARA_API_KEY || "";
export const para = new ParaMobile(Environment.BETA, Key, undefined, {
    disableWorkers: true,
});
