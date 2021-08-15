import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FocusHistory } from './src/features/focus/FocusHistory';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onTimerEnd = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
    setFocusSubject(null);
  };

  const clearSubject = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  const onClearHistory = () => {
    setFocusHistory([]);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={onTimerEnd}
          clearSubject={clearSubject}
        />
      ) : (
        <View style={{ flex: 0.5 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClearHistory} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.xxl,
    padding: spacing.md,
    backgroundColor: colors.lightBlue,
  },
});
