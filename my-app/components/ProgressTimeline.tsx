import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { AnimatedLine } from '@/components/AnimatedLine';
import { STATUS, Step } from '@/app/(tabs)';
import { COLORS } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface ProgressTimelineProps {
  steps: Step[];
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ steps: initialSteps }) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const lineProgress = steps.map(() => useSharedValue(0)); // Shared values для анимации линий

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

  const toggleFirstStepCollapse = () => {
    setIsCollapsed(!isCollapsed);

    lineProgress[0].value = withTiming(isCollapsed ? 3 : 1, { duration: 500 });
  };

  const renderStep = ({ item, index }: { item: Step; index: number }) => {
    const isDone = item.status === STATUS.DONE;
    const isInProgress = item.status === STATUS.IN_PROGRESS;

    const maxHeight = index === 0 && !isCollapsed ? 150 : 90;

    return (
      <>
        {index < steps.length - 1 && (
          <View style={styles.lineContainer}>
            <AnimatedLine progress={lineProgress[index]} maxHeight={maxHeight} />
          </View>
        )}

          <View style={styles.stepContainer}>
            <TouchableOpacity onPress={() => handleStepPress(index)} style={styles.stepRow}>
              <View
                style={[
                  styles.circle,
                  isDone && styles.circleDone,
                  isInProgress && styles.circleInProgress,
                ]}
              >
                {isDone ? (
                  <Text style={styles.checkmark}>✔</Text>
                ) : (
                  <Text style={styles.stepText}>{item.id}</Text>
                )}
              </View>

              <Text
                style={[
                  styles.stepTitle,
                  isDone && styles.titleDone,
                  isInProgress && styles.titleInProgress,
                ]}
              >
                {item.title}


              {index === 0 && (
                <TouchableOpacity onPress={toggleFirstStepCollapse} style={styles.arrowContainer}>
                  <Ionicons
                    name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                    size={20}
                    color={COLORS.PRIMARY}
                  />
                </TouchableOpacity>
              )}
              </Text>
            </TouchableOpacity>
          </View>

        {index === 0 && !isCollapsed && (
          <View style={styles.collapsedContent}>
            <Text style={styles.collapseText}>Number of floors entirely below ground level:</Text>
            <Text style={styles.collapseText}>YOUR ANSWER</Text>
            <Text style={styles.collapseText}>ANSWER</Text>
            <Text style={styles.collapseText}>Floors on which car parking is provided:</Text>
            <Text style={styles.collapseText}>YOUR ANSWER</Text>
            <Text style={styles.collapseText}>ANSWER</Text>
          </View>
        )}
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
    marginVertical: '10%',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
  },
  titleDone: {
    color: COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  titleInProgress: {
    color: COLORS.PRIMARY,
  },
  collapsedContent: {
    marginLeft: 55,
    marginTop: 10,
  },
  collapseText: {
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  arrowContainer: {
    marginLeft: 10,
  },
});
