import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  const HistoryItem = ({ item }) => (
    <Text style={styles.historyItem(item.status)}>{item.subject}</Text>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
  historyItem: (status) => ({
    color: status > 1 ? colors.red : colors.green,
    fontSize: fontSizes.lg,
  }),
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    alignItems: 'center'
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
