import CText from '@/components/TextComp';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface AnimatedPointProps {
    points: number;
    startPosition: { x: number; y: number };
    endPosition: { x: number; y: number };
    onComplete: () => void;
}

const AnimatedPoint = ({ points, startPosition, endPosition, onComplete }: AnimatedPointProps) => {
    const position = useRef(new Animated.ValueXY(startPosition)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(position, {
                toValue: endPosition,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.2,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            onComplete();
        });
    }, [endPosition, onComplete]);

    const isPositive = points > 0;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        { translateX: position.x },
                        { translateY: position.y },
                        { scale: scale },
                    ],
                    opacity: opacity,
                },
            ]}
        >
            <CText
                style={[
                    styles.text,
                    { color: isPositive ? '#4CAF50' : '#F44336' },
                ]}
            >
                {isPositive ? '+' : ''}{points} DE
            </CText>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1000,
    },
    text: {
        fontSize: 20,
        fontFamily: 'bold',
    },
});

export default AnimatedPoint; 