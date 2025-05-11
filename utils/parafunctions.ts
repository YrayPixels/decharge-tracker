import { para } from "@/client/para";

const handleUserRegistration = async (type: "email" | "phone", email?: string, countryCode?: string, phone?: string,) => {
    let userExists = false;
    if (type === "email") {
        if (!email) {
            return false;
        }
    } else {
        if (!countryCode || !phone) {
            return false;
        }
    }

    try {

        if (type === "email") {
            userExists = await para.checkIfUserExists({ email: email ?? "" });
        } else {
            userExists = await para.checkIfUserExistsByPhone({
                countryCode: '+234',
                phone: '8132532430'
            });
        }

        if (userExists) {
            if (type === "email") {
                await para.login({ email: email ?? "" });
            } else {
                await para.initiateUserLoginForPhone({
                    countryCode: '+234',
                    phone: '8132532430'
                });
            }
            return true; // User logged in
        }

        if (type === "email") {
            await para.createUser({ email: email ?? "" });
        } else {
            await para.createUserByPhone({
                countryCode: countryCode ?? "",
                phone: phone ?? ""
            });
        }
        return false

    } catch (error) {
        console.log(error);
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

