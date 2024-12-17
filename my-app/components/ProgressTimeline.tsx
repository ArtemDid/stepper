import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSharedValue, withTiming} from 'react-native-reanimated';
import {AnimatedLine} from "@/components/AnimatedLine";
import {STATUS, Step} from "@/app/(tabs)";
import {COLORS} from "@/constants/Colors";

interface ProgressTimelineProps {
  steps: Step[];
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ steps: initialSteps }) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const lineProgress = steps.map(() => useSharedValue(0));

  const handleStepPress = (pressedIndex: number) => {
    const updatedSteps: Step[] = steps.map((step, index) => {
      if (index < pressedIndex) return { ...step, status: STATUS.DONE };
      if (index === pressedIndex) return { ...step, status: STATUS.IN_PROGRESS };
      return { ...step, status: STATUS.PENDING };
    });

    setSteps(updatedSteps);

    lineProgress.forEach((progress, index) => {
      if (index < pressedIndex) {
        progress.value = withTiming(1, { duration: 500 });
      } else {
        progress.value = withTiming(0, { duration: 500 });
      }
    });
  };

  const renderStep = ({ item, index }: { item: Step; index: number }) => {
    const isDone = item.status === STATUS.DONE;
    const isInProgress = item.status === STATUS.IN_PROGRESS;

    return (
      <>
        {index < steps.length - 1 && (
          <View style={styles.lineContainer}>
            <AnimatedLine progress={lineProgress[index]} />
          </View>
        )}

        <TouchableOpacity onPress={() => handleStepPress(index)} style={styles.stepContainer}>
          <View
            style={[
              styles.circle,
              isDone && styles.circleDone,
              isInProgress && styles.circleInProgress,
            ]}
          >
            {isDone ? <Text style={styles.checkmark}>✔</Text> : <Text style={styles.stepText}>{item.id}</Text>}
          </View>

        <Text
          style={[
            styles.stepTitle,
            isDone && styles.titleDone,
            isInProgress && styles.titleInProgress,
          ]}
        >
          {item.title}
        </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStep}
        scrollEnabled={true}
      />
    </View>
  );
};

export default ProgressTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: '50%',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 50,
  },
  lineContainer: {
    position: 'absolute',
    top: 20,
    left: 18,
    width: 4,
    height: 90,
    backgroundColor: COLORS.TEXT_DEFAULT,
    overflow: 'hidden',
    zIndex: -1,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.TEXT_DEFAULT,
    backgroundColor: COLORS.TEXT_DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  circleDone: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  circleInProgress: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.BACKGROUND,
  },
  stepText: {
    fontSize: 14,
    color: COLORS.WHITE,
  },
  checkmark: {
    fontSize: 20,
    color: COLORS.WHITE,
  },
  stepTitle: {
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.TEXT_DEFAULT,
  },
  titleDone: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  titleInProgress: {
    color: COLORS.PRIMARY,
  },
});
