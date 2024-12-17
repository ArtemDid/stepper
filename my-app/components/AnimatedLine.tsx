import Animated, {SharedValue, useAnimatedStyle} from "react-native-reanimated";
import React from "react";
import {StyleSheet} from "react-native";

export const AnimatedLine = ({ progress }: { progress: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    height: progress.value * 90,
  }));

  return <Animated.View style={[styles.animatedLine, animatedStyle]} />;
};


const styles = StyleSheet.create({
  animatedLine: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#f97316',
  },
})
