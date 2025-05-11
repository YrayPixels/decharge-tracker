import Buttons from "@/components/ButtonComp";
import CText from "@/components/TextComp";
import { useThemeContext } from "@/utils/context/ThemeContext";
import { delay } from "@/utils/miscfunctions.ts";
import { cleanNumber } from "@/utils/miscfunctions.ts/extrafunctions";
import AppSettings from "@/utils/store/settingsstore";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View } from "react-native";
// import { CountryPickerModal } from "react-native-country-code-select";



/**
  * What should be done here
 Login Page
  */
function Login() {

  const [userDetails, setUserDetails] = useState({
    username: "",
    countryCode: "1",
    mobileNumber: "",
    wallet_address: "",
    emailAddress: "",
  })

  const [loginType, setLoginType] = useState('number')

  const [otpValue, setOtpValue] = useState('')
  // const { setUser, user, session } = UserItem();
  // const { keypair, updateKeypair, publicKey } = WalletItem()
  const { setLoading, isLoading, setToast, openWithAuth } = AppSettings()
  const [currentState, setCurrentState] = useState<'verify-phrase' | "start-wallet" | "sign-up" | "set-pin" | "">('')

  const [selectedValue, setSelectedValue] = useState(
    { "callingCode": ["234"], "countryInitials": "NG", "name": "Nigeria", "region": "Africa", "subregion": "Western Africa" }
  );

  const [fingerPrintSigning, setFingerPrintSigning] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useThemeContext()


  // useEffect(() => {
  //   (async () => {
  //     if (user && !session) {
  //       setUserDetails({
  //         ...userDetails,
  //         mobileNumber: user.mobileNumber
  //       })
  //     }
  //   })()

  // }, [user])

  const Login = async () => {
    if (loginType === 'number') {



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
      const data = {
        phone_number: "+" + selectedValue.callingCode + cleanNumber(userDetails.mobileNumber)
      }

      console.log(data)
    } else {

      console.log(userDetails.emailAddress)
    }

    // const response = await getCode(data.phone_number)
    // if (response.status !== false) {

    //   setUserDetails({ ...userDetails, username: response.data.username, wallet_address: response.data.wallet_address })
    //   setCurrentState('set-pin')
    //   setLoading(false)
    // } else {
    //   setToast(response.message, 'error')
    //   setLoading(false)
    // }
  }

  // const verifyOtp = async () => {
  //   if (otpValue.length < 6) {
  //     setToast('Invalid Otp', 'error')
  //     return;
  //   }
  //   setLoading(true)
  //   const response = await verifyCode(otpValue, userDetails.username)
  //   if (response.status !== false) {
  //     setToast("Verification Successfull", 'success')

  //     //check if the publick key stored is the same as the address coming, route to dashboard
  //     if (publicKey !== null && (publicKey.toString() === userDetails.wallet_address)) {
  //       setUser({
  //         username: userDetails.username,
  //         mobileNumber: userDetails.mobileNumber,
  //         pin: "",
  //       })
  //       router.replace('/dashboard')
  //       return;
  //     } else {
  //       setUser({
  //         username: userDetails.username,
  //         mobileNumber: userDetails.mobileNumber,
  //         pin: "",
  //       })
  //       setCurrentState('start-wallet')
  //       setLoading(false)
  //       return;
  //     }


  //   } else {
  //     setToast(response.message, 'error')
  //     setLoading(false)
  //   }
  // }

  return (
    <View
      className="relative bg-grey dark:bg-dark h-full w-100 flex justify-center items-center"
    >
      <View className=" py-5 w-full px-4 gap-y-10 flex-col justify-center ">


        {!fingerPrintSigning ?
          <>

            <View className="flex flex-col justify-center items-center gap-y-4">

              <View className="w-full flex justify-center items-center">
                <View className=" rounded-full">
                  <CText style={{ fontFamily: "bold" }} textColor="text-buttons" className="text-[3rem]  text-center border-b-4 border-buttons">
                    DECHARGE
                  </CText>
                </View>
              </View>
              <View className="w-8/12 m-auto">
                <CText className="text-[1em] text-center">Welcome back!</CText>
              </View>
            </View>

            <KeyboardAvoidingView className="bg-grey dark:bg-accent  rounded-3xl gap-y-3">
              <View className="bg-white  dark:bg-accent h-fit py-3 rounded-2xl" >
                {/* <TextInput
              style={{ fontFamily: "bold" }}
              className=" p-4 py-5"
              value={userDetails.username}
              onChangeText={(text) => {
                setUserDetails({ ...userDetails, username: text })
              }}
              placeholder={`enter a username`}
            />
            <View className="border-b border-gray-200" /> */}
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

              </View>
            </KeyboardAvoidingView>

            <View className="gap-y-4">

              <Buttons buttonType="pressable" onPress={() => Login()} className="" text={isLoading ? "loading" : "Login"} type="primary" />
              <View className="py-2 flex flex-row justify-center items-center gap-x-2">

                <TouchableOpacity
                  className="border-e-2 border-buttons pe-2"
                  onPress={() => setLoginType('number')}
                ><CText style={{ fontFamily: 'bold' }} textColor="text-buttons">Login with mobile number</CText></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setLoginType('email')}
                ><CText style={{ fontFamily: 'bold' }} textColor="text-buttons">Login with email</CText></TouchableOpacity>
              </View>
              <View className="py-2 flex flex-row justify-center items-center gap-x-2">
                <CText className="text-center">Don&apos;t have an Account?</CText>
                <TouchableOpacity
                  onPress={() => router.replace('/auth/username')}
                ><CText style={{ fontFamily: 'bold' }} textColor="text-buttons">Sign up</CText></TouchableOpacity>
              </View>


            </View>
          </>
          :
          <>
            <View className="flex flex-col justify-center items-center gap-y-2">

              <View className="w-full flex justify-center items-center">
                <View className="h-[10.125rem] w-[10.125rem]  rounded-full">
                  <Image source={require('@/assets/images/icon.png')} style={{ width: "100%", height: "100%" }}
                    contentFit="contain"
                  />
                </View>
              </View>
            </View>

            <View className="w-10/12 m-auto  flex justify-center gap-y-10 items-center">
              <TouchableOpacity onPress={() => { }} className="bg-purple py-5 flex flex-row justify-center items-center gap-x-3  rounded-full overflow-hidden w-full">
                {/* <View className="h-[1.5rem] w-[1.5rem]  rounded-full">
                  <Image source={require('@/assets/images/biometric2.png')} style={{ width: "100%", height: "100%" }}
                    contentFit="contain"
                  />
                </View> */}

                <CText className="text-white text-[1.5em] font-bold">Unlock with Biometric</CText>
              </TouchableOpacity>
              <View className="">
                <CText style={{ fontFamily: "bold" }} className="text-[1em] text-center">Tap to login with your biometrics</CText>
                <TouchableOpacity onPress={() => setFingerPrintSigning(false)}>
                  <CText textColor="text-purple" className="text-[1em] text-center">or login with mobile number</CText>
                </TouchableOpacity>
              </View>
            </View>

          </>


        }
      </View >




      {/* <CountryPickerModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        //@ts-ignore
        onSelect={(e) => setSelectedValue(e)}
      /> */}

      {/*
      <Otpsheet
        open={currentState === 'set-pin'}
        verifyOtp={verifyOtp}
        setOtpValue={(text) => setOtpValue(text)}
      />

      <WalletSheet open={currentState === 'start-wallet'} /> */}



    </View >
  );
}

export default Login

