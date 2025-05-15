import Buttons from "@/components/ButtonComp";
import Otpsheet from "@/components/sheets/OtpSheets";
import CText from "@/components/TextComp";
import { useKeyboard } from "@/utils/context/KeyboardContext";
import { useThemeContext } from "@/utils/context/ThemeContext";
import { delay } from "@/utils/miscfunctions.ts";
import { handlePhoneVerification, handleUserRegistration, handleVerification } from "@/utils/parafunctions";
import AppSettings from "@/utils/store/settingsstore";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View } from "react-native";
// import { CountryPickerModal } from "react-native-country-code-select";

/**
  * What should be done here
  * 1. Register User Voice for Authentication 
  * 2. Save User Voice and ask if to create wallet with their voice
  */
function Voicereg() {
  const { isKeyboardVisible } = useKeyboard()
  const [currentState, setCurrentState] = useState<'verify-phrase' | "start-wallet" | "sign-up" | "set-pin" | "">('')
  const [loginType, setLoginType] = useState('number')


  const [isVisible, setIsVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    mobileNumber: "",
    emailAddress: "",
    countryCode: "1",
  })

  const [otpValue, setOtpValue] = useState('')
  const { setLoading, isLoading, setToast } = AppSettings()
  const { isDarkMode } = useThemeContext()




  const mobileNumberSignup = async () => {
    const fields = [];
    if (userDetails.mobileNumber === "") {
      fields.push("Mobile Number");
    }
    if (fields.length > 0) {
      setToast(`${fields.join(',')} required`, 'error')
      return
    }
    setLoading(true)
    delay(1000)



    const response = await handleUserRegistration({
      type: "phone",
      countryCode: userDetails.countryCode,
      phone: userDetails.mobileNumber,
    })

    if (response.status) {
      if (response.action === 'login') {
        router.replace('/dashboard')
      } else {
        setCurrentState('set-pin')
      }
    } else {
      setToast(response.message, 'error')
    }

    // const response = await registerUser(data.username, data.phone_number)
    // if (response.status !== false) {
    //   setCurrentState('set-pin')
    //   setLoading(false)
    // } else {
    //   setToast(response.message, 'error')
    //   setLoading(false)
    // }
    setLoading(false)

  }

  const emailSignup = async () => {

    const fields = [];
    if (userDetails.emailAddress === "") {
      fields.push("Email Address");
    }
    if (fields.length > 0) {
      setToast(`${fields.join(',')} required`, 'error')
      return
    }

    setLoading(true)
    delay(1000)

    const response = await handleUserRegistration({
      type: "email",
      email: userDetails.emailAddress,
    })

    if (response.status) {
      if (response.action === 'login') {
        router.replace('/dashboard')
      } else {
        setCurrentState('set-pin')
      }

    } else {
      setToast(response.message, 'error')
    }




    setLoading(false)
  }


  const verifyOtp = async () => {
    if (otpValue.length < 6) {
      setToast('Invalid Otp', 'error')
      return;
    }
    setLoading(true)
    delay(1000)

    if (loginType === 'number') {
      const response = await handlePhoneVerification(userDetails.countryCode, userDetails.mobileNumber, otpValue)

      if (response) {

        router.replace('/dashboard')
      } else {
        setToast("Invalid Otp", 'error')
      }


    } else {
      const response = await handleVerification(userDetails.emailAddress, otpValue)

      if (response) {
        router.replace('/dashboard')
      } else {
        setToast("Invalid Otp", 'error')
      }
    }
  }


  return (
    <View
      className="bg-grey dark:bg-dark  h-full w-100 flex-1 items-center"
    >
      <View className=" py-5 w-full  px-4 gap-y-10 flex flex-col justify-start ">
        <View className="w-10/12 m-auto">
          <CText style={{ fontFamily: "bold" }} className="text-[1.25em] text-center">Let&apos;s get you started</CText>
          <CText className="text-[1rem] text-center">Your username will be unique and can be used to make transactions.</CText>
        </View>

        <KeyboardAvoidingView className="bg-grey dark:bg-accent rounded-3xl gap-y-3">
          {loginType === 'email' ?
            <View className="flex flex-row px-4 justify-between items-center">
              <TextInput
                style={{ fontFamily: "bold" }}
                className="p-4 py-5 flex-1  text-dark dark:text-white"
                value={userDetails.emailAddress}
                placeholderTextColor={isDarkMode ? "white" : "black"}
                onChangeText={(text) => {
                  setUserDetails({ ...userDetails, emailAddress: text })
                }}
                placeholder={`enter your email address`}
              />
            </View>

            :

            <View className="flex flex-row px-4 justify-between items-center">

              <TextInput
                style={{ fontFamily: "bold" }}
                className="p-4 py-5 w-2/12 text-dark border-e-2 border-buttons dark:text-white"
                value={userDetails.countryCode}
                keyboardType="phone-pad"
                placeholderTextColor={isDarkMode ? "white" : "black"}
                onChangeText={(text) => {
                  setUserDetails({ ...userDetails, countryCode: text })
                }}
                placeholder={`+1`}
              />


              <TextInput
                style={{ fontFamily: "bold" }}
                className="p-4 py-5 flex-1 text-dark dark:text-white"
                value={userDetails.mobileNumber}
                keyboardType="phone-pad"
                placeholderTextColor={isDarkMode ? "white" : "black"}
                onChangeText={(text) => {
                  setUserDetails({ ...userDetails, mobileNumber: text })
                }}
                placeholder={`enter a phone number`}
              />


            </View>

          }


        </KeyboardAvoidingView>
        <View className="gap-y-4">

          <Buttons buttonType="pressable" onPress={() => loginType === 'number' ? mobileNumberSignup() : emailSignup()} className="" text={isLoading ? "loading" : "Sign up"} type="primary" />



          <View className="py-2 flex flex-row justify-center items-center gap-x-2">

            <TouchableOpacity
              className="border-e-2 border-buttons pe-2"
              onPress={() => setLoginType('number')}
            ><CText style={{ fontFamily: 'bold' }} textColor="text-buttons">Sign up with mobile number</CText></TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLoginType('email')}
            ><CText style={{ fontFamily: 'bold' }} textColor="text-buttons">Sign up with email</CText></TouchableOpacity>
          </View>



        </View>


      </View >
      {!isKeyboardVisible &&

        <View className="gap-y-4 absolute bottom-10 ">


          <View className="flex w-full flex-row justify-center items-center gap-x-2">

            <CText className="text-[1.125em] flex items-center flex-row">Already have an Account?</CText>
            <TouchableOpacity
              onPress={() => router.push('/auth/login')}
            >
              <CText style={{ fontFamily: 'bold' }} textColor="text-buttons" className="text-[1.125em]">Log in</CText></TouchableOpacity>
          </View>

          <View className="px-4 my-3">
            <CText className="text-[1rem] text-center">
              I have read, understood and agreed to the <CText style={{ fontFamily: 'bold' }} textColor="text-buttons">Terms&Conditions </CText>and
              <CText style={{ fontFamily: 'bold' }} textColor="text-buttons"> Privacy Policy</CText>

            </CText>
          </View>
        </View>

      }


      {/* <CountryPickerModal

        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        //@ts-ignore
        onSelect={(e) => setSelectedValue(e)}
      /> */}

      <Otpsheet
        open={currentState === 'set-pin'}
        verifyOtp={verifyOtp}
        setOtpValue={(text) => setOtpValue(text)}
      />
      {/*
      <WalletSheet open={currentState === 'start-wallet'} /> */}


    </View >
  );
}

export default Voicereg

