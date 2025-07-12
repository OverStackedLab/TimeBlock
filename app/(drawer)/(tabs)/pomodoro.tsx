import { MaterialCommunityIcons } from '@expo/vector-icons';
import { makeStyles, useTheme } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const POMODORO_TIME = 25 * 60; // 25 minutes
const RADIUS = 100;
const STROKE_WIDTH = 10;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState('Write an article');
  const [editMode, setEditMode] = useState(false);
  const styles = useStyles();
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const progress = (POMODORO_TIME - secondsLeft) / POMODORO_TIME;
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        {editMode ? (
          <TextInput
            value={task}
            onChangeText={setTask}
            onBlur={() => setEditMode(false)}
            autoFocus
            style={styles.taskInput}
          />
        ) : (
          <Pressable
            onPress={() => setEditMode(true)}
            style={styles.taskDisplay}>
            <Text style={styles.taskText}>Block: {task}</Text>
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={theme.colors.white}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.timerWrapper}>
        <Svg width={220} height={220} viewBox="0 0 220 220">
          <Circle
            cx="110"
            cy="110"
            r={RADIUS}
            stroke={theme.colors.grey3}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <AnimatedCircle
            cx="110"
            cy="110"
            r={RADIUS}
            stroke={theme.colors.primary}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 110 110)"
          />
        </Svg>
        <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
      </View>

      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map(i => (
          <View
            key={i}
            style={[styles.dot, i === 2 && styles.activeDot]} // hardcoded current round
          />
        ))}
      </View>

      <Pressable
        style={styles.controlButton}
        onPress={() => setIsRunning(!isRunning)}>
        <MaterialCommunityIcons
          name={isRunning ? 'pause' : 'play'}
          size={32}
          color={theme.colors.white}
        />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
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
    fontSize: 48,
    color: theme.colors.primary,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
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
  controlButton: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 999,
    marginBottom: 40,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
}));
