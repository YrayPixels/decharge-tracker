import { para } from "@/client/para";
import { cleanNumber } from "./miscfunctions.ts/extrafunctions";

const handleUserRegistration = async ({ type, email, countryCode, phone, }: { type: "email" | "phone", email?: string, countryCode?: string, phone?: string, }) => {


    let userExists = false;
    if (type === "email") {
        if (!email) {
            return {
                status: false,
                message: "Invalid Input",
            };
        }
    } else {
        if (!countryCode || !phone) {
            return {
                status: false,
                message: "Invalid Input",
            };
        }
    }

    try {

        if (type === "email") {
            userExists = await para.checkIfUserExists({ email: email ?? "" });
        } else {
            userExists = await para.checkIfUserExistsByPhone({
                countryCode: countryCode ?? "",
                phone: cleanNumber(phone ?? "")
            });
        }

        if (userExists) {
            if (type === "email") {
                await para.login({ email: email ?? "" });
            } else {
                await para.initiateUserLoginForPhone({
                    countryCode: countryCode ?? "",
                    phone: cleanNumber(phone ?? "")
                });
            }
            return {
                status: true,
                message: "User Registered Already",
                action: "login",
            }; // User logged in
        }

        if (type === "email") {
            await para.createUser({ email: email ?? "" });

        } else {
            await para.createUserByPhone({
                countryCode: countryCode ?? "",
                phone: phone ?? ""
            });

        }

        return {
            status: true,
            message: "User Registered Successfully",
            action: "verification",
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "Something went wrong",
        };
    }
};


const handleVerification = async (email: string, verificationCode: string) => {
    const biometricsId = await para.verifyEmailBiometricsId({ verificationCode });

    if (biometricsId) {
        await para.registerPasskey({ email, biometricsId });
        return true;
    }

    return false;
};

const handlePhoneVerification = async (countryCode: string, phone: string, verificationCode: string) => {
    const biometricsId = await para.verifyPhoneBiometricsId({ verificationCode });

    if (biometricsId) {
        await para.registerPasskey({ phone, countryCode, biometricsId });
        return true;
    }

    return false;
};


export { handlePhoneVerification, handleUserRegistration, handleVerification };

