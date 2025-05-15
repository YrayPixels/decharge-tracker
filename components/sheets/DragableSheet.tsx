
import { useThemeContext } from "@/utils/context/ThemeContext";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef } from 'react';

interface DragableSheetProps {
    child: React.ReactNode;
    snapPoints?: string[] | null
    close?: () => void;
}
const DragableSheet = (props: DragableSheetProps) => {
    const { child, snapPoints } = props;
    const bottomSheetRef = useRef<BottomSheet>(null);

    const onChange = (e: any) => {
        if (e < 1) {
            bottomSheetRef.current?.expand;
        }
    }
    const { isDarkMode } = useThemeContext()
    // const renderBackdrop = useMemo(
    //     () => (props:any) => (
    //       <BottomSheetBackdrop
    //         {...props}
    //         disappearsOnIndex={-1}
    //         appearsOnIndex={0}
    //         pressBehavior="close"
    //         // You can customize these styles
    //         style={{
    //             height: "100%",
    //             border: "1px solid black",
    //           backgroundColor: '#0000000',
    //         }}
    //       />
    //     ),
    //     []
    // );
    return (
        <BottomSheet
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            onClose={() => { }}
            ref={bottomSheetRef}
            backgroundStyle={{
                backgroundColor: isDarkMode ? '#131313' : 'white',
                paddingBottom: 20,
            }}
            onChange={(e) => onChange(e)}
            snapPoints={snapPoints ? snapPoints : ["60%"]}
            backdropComponent={(props) =>
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    pressBehavior="collapse"
                    style={{
                        height: "100%",
                        backgroundColor: 'black',
                    }}
                />
            }
            enablePanDownToClose={false}
        >
            <BottomSheetView className="h-full px-4 rounded-t-3xl" >
                {child}
            </BottomSheetView>
        </BottomSheet>

    )
}

export default DragableSheet
