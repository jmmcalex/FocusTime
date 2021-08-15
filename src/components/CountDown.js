import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMilis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [millis, setMilis] = useState(minutesToMilis(minutes));

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        clearInterval(interval);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilis(minutesToMilis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMilis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;
  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.text}>
        {formatTime(minute)}: {formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
  },
  countdownContainer: {
    backgroundColor: colors.highlight,
    minWidth: Dimensions.width - spacing.lg,
    maxWidth: Dimensions.width - spacing.lg,
  },
});
