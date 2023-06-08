import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimerScreen = ({ route }) => {
  const totalSeconds = route.params?.totalSeconds;
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(prevElapsedSeconds => prevElapsedSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const remainingSeconds = Math.max(totalSeconds - elapsedSeconds, 0);
    const minutesRemaining = Math.floor(remainingSeconds / 60);
    const secondsRemaining = remainingSeconds % 60;
    setTimeRemaining({ minutes: minutesRemaining, seconds: secondsRemaining });
  }, [totalSeconds, elapsedSeconds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time remaining:</Text>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{timeRemaining.minutes.toString().padStart(2, '0')}</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.timer}>{timeRemaining.seconds.toString().padStart(2, '0')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
  },
  colon: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default TimerScreen;
