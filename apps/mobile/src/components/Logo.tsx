import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={[styles.line, styles.lineLeft]} />
        <View style={[styles.line, styles.lineRight]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  line: {
    position: 'absolute',
    width: 12,
    height: 100,
    backgroundColor: '#6366F1',
    borderRadius: 6,
  },
  lineLeft: {
    transform: [{ rotate: '45deg' }],
    left: 34,
    top: -10,
  },
  lineRight: {
    transform: [{ rotate: '-45deg' }],
    left: 34,
    top: -10,
  },
}); 