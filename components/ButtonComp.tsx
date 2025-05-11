import { ActivityIndicator, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import CText from "./TextComp";

interface ButtonsProp {
  loading?: boolean
  text: string;
  type?: "primary" | "secondary";
  className?: string;
  textClass?: string;
  onPress: () => void;
  style?: object;
  icon?: React.ReactNode;
  buttonType?: "feedback" | "pressable"
}

export default function Buttons(props: ButtonsProp) {
  const { loading, style, textClass, text, className, type = "primary", onPress, buttonType } = props;

  const buttonColor = type === "primary" ? "bg-buttons  " : "bg-gray-200  dark:bg-accent2"

  return (
    <View>
      {buttonType === "feedback" ? (

        <>
          <View style={{
            borderRadius: 50,  // Match this with your desired border radius
            overflow: 'hidden',  // This is the key style that contains the ripple
          }}>
            <TouchableNativeFeedback
              style={{ ...style }}
              background={TouchableNativeFeedback.Ripple('#971BB2', false)}
              onPress={onPress}>
              <View className={`${buttonColor} ${className ? className : "py-5 rounded-full"} w-full flex flex-row justify-center items-center gap-x-2`}>
                {props.icon}
                <CText style={{ fontFamily: "bold" }} className={`${textClass ? textClass : "text-[1rem]  text-center"} ${type === "primary" ?
                  "text-white" : "text-black"
                  }`}>{loading ? <><ActivityIndicator /></> : text}</CText>
              </View>
            </TouchableNativeFeedback>
          </View>
        </>
      ) :
        <TouchableOpacity onPress={onPress}>
          <View className={`${buttonColor} ${className ? className : "py-5  rounded-full"}  flex flex-row justify-center items-center gap-x-2`}>
            {props.icon}
            <CText style={{ fontFamily: "bold" }} className={`${textClass ? textClass : "text-[1rem]  text-center"} ${type === "primary" ?
              "text-white" : "text-black"
              }`}>{text}</CText>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
}
