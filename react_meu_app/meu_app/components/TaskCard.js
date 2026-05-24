import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskCard({
  task,
  toggleTask,
  removeTask,
}) {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => toggleTask(task.id)}
      onLongPress={() => removeTask(task.id)}
    >

      <Text
        style={[
          styles.text,
          task.done && styles.doneText,
        ]}
      >
        {task.title}
      </Text>

      <View
        style={[
          styles.status,
          task.done
            ? styles.done
            : styles.pending,
        ]}
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#172033',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 17,
    width: '85%',
  },

  doneText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  status: {
    width: 22,
    height: 22,
    borderRadius: 20,
  },

  done: {
    backgroundColor: '#8B5CF6',
  },

  pending: {
    borderWidth: 3,
    borderColor: '#475569',
  },

});