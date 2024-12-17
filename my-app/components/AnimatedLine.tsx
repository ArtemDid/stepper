import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import React from 'react';
import { StyleSheet } from 'react-native';
import {COLORS} from "@/constants/Colors";

interface AnimatedLineProps {
  progress: SharedValue<number>;
  maxHeight: number;
  style?: any;
}

export const AnimatedLine: React.FC<AnimatedLineProps> = ({ progress, maxHeight, style }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    height: progress.value * maxHeight,
  }));

  return <Animated.View style={[styles.animatedLine, animatedStyle, style]} />;
};

const styles = StyleSheet.create({
  animatedLine: {
    position: 'absolute',
    width: 4,
    backgroundColor: COLORS.PRIMARY,
    left: '50%',
    transform: [{ translateX: -2 }],
  },
});
