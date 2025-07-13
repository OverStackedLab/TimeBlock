import { MaterialCommunityIcons } from '@expo/vector-icons';
import { makeStyles, useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const TIMER_PRESETS = [
  { name: '5 min', duration: 5 * 60 },
  { name: '10 min', duration: 10 * 60 },
  { name: '25 min', duration: 25 * 60 },
  { name: '30 min', duration: 30 * 60 },
];

const RADIUS = 130;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PomodoroTimer() {
  const [currentPresetIndex, setCurrentPresetIndex] = useState(2); // Default to 25 min
  const [secondsLeft, setSecondsLeft] = useState(TIMER_PRESETS[2].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState('Write an article');
  const [editMode, setEditMode] = useState(false);
  const styles = useStyles();
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const currentPreset = TIMER_PRESETS[currentPresetIndex];
  const progress =
    (currentPreset.duration - secondsLeft) / currentPreset.duration;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [secondsLeft]);

  useEffect(() => {
    setSecondsLeft(currentPreset.duration);
    setIsRunning(false);
  }, [currentPresetIndex]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const resetTimer = () => {
    setSecondsLeft(currentPreset.duration);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentPresetIndex(index);
        }}
        style={styles.scrollView}
        contentContainerStyle={{
          alignItems: 'flex-end',
        }}>
        {TIMER_PRESETS.map((preset, index) => (
          <View key={index} style={[styles.timerSlide, { width }]}>
            <View style={styles.timerWrapper}>
              <Svg width={280} height={280} viewBox="0 0 280 280">
                <Circle
                  cx="140"
                  cy="140"
                  r={RADIUS}
                  stroke={theme.colors.grey3}
                  strokeWidth={STROKE_WIDTH}
                  fill="none"
                />
                <AnimatedCircle
                  cx="140"
                  cy="140"
                  r={RADIUS}
                  stroke={theme.colors.primary}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
                  strokeDashoffset={
                    index === currentPresetIndex
                      ? strokeDashoffset
                      : CIRCUMFERENCE
                  }
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90 140 140)"
                />
              </Svg>
              <Text style={styles.timerText}>
                {index === currentPresetIndex
                  ? formatTime(secondsLeft)
                  : formatTime(preset.duration)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {TIMER_PRESETS.map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={[
              styles.dot,
              dotIndex === currentPresetIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
      <View style={styles.fixedControlsContainer}>
        <Pressable
          style={styles.controlButton}
          onPress={() => setIsRunning(!isRunning)}>
          <MaterialCommunityIcons
            name={isRunning ? 'pause' : 'play'}
            size={32}
            color={theme.colors.white}
          />
        </Pressable>
        <Pressable style={styles.resetButton} onPress={resetTimer}>
          <MaterialCommunityIcons
            name="refresh"
            size={32}
            color={theme.colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 0.5,
  },
  timerSlide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 40,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 20,
  },
  taskContainer: {
    width: '100%',
    marginBottom: 80,
  },
  taskDisplay: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    color: theme.colors.white,
    fontSize: 16,
  },
  taskInput: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    padding: 12,
    color: theme.colors.white,
    fontSize: 16,
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    position: 'absolute',
    fontSize: 56,
    color: theme.colors.primary,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 0.25,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.grey3,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
  },
  fixedControlsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 60,
    paddingTop: 20,
    flex: 0.25,
  },
  controlButton: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 999,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  resetButton: {
    backgroundColor: theme.colors.grey4,
    padding: 20,
    borderRadius: 999,
    shadowColor: theme.colors.grey4,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
}));
