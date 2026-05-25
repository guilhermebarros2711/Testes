import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function TaskCard({
  task,
  toggleTask,
  removeTask,
}) {

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (

    <Animated.View style={animatedStyle}>

      <TouchableOpacity
        style={styles.card}

        onPress={() => {

          scale.value = withSpring(0.95);

          setTimeout(() => {
            scale.value = withSpring(1);
          }, 120);

          toggleTask(task.id);
        }}

        onLongPress={() => removeTask(task.id)}
      >

        <View style={styles.leftContent}>

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
              styles.categoryBadge,
              {
                backgroundColor: task.color,
              },
            ]}
          >

            <Text style={styles.categoryText}>
              {task.category}
            </Text>

          </View>

        </View>

        <View
          style={[
            styles.status,
            task.done
              ? styles.done
              : styles.pending,
          ]}
        />

      </TouchableOpacity>

    </Animated.View>

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

  leftContent: {
    width: '85%',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 17,
  },

  doneText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  categoryBadge: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
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