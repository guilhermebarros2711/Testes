import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
 TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('');
useEffect(() => {
  loadTasks();
}, []);

useEffect(() => {
  saveTasks();
}, [tasks]);

async function saveTasks() {

  try {

    const jsonValue = JSON.stringify(tasks);

    await AsyncStorage.setItem(
      '@tasks',
      jsonValue
    );

  } catch (error) {
    console.log(error);
  }
}

async function loadTasks() {

  try {

    const storedTasks = await AsyncStorage.getItem('@tasks');

    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }

  } catch (error) {
    console.log(error);
  }
}
  function addTask() {

    if (newTask.trim() === '') {
      return;
    }

    const newItem = {
      id: Date.now(),
      title: newTask,
      done: false,
    };

    setTasks([...tasks, newItem]);

    setNewTask('');
  }

  function toggleTask(id) {

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }
function removeTask(id) {

  const filteredTasks = tasks.filter(
    (task) => task.id !== id
  );

  setTasks(filteredTasks);
}
  const completedTasks = tasks.filter(task => task.done).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>StudyFlow 📚</Text>

      <View style={styles.progressCard}>
       <Text style={styles.progressText}>
  {Math.round(progress)}% concluído
</Text>
        <View style={styles.progressBarBackground}>

  <LinearGradient
    colors={['#6366F1', '#8B5CF6']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
      width: `${progress}%`,
      height: '100%',
      borderRadius: 20,
    }}
  />

</View>
      </View>

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Nova tarefa..."
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>

      {tasks.map((task) => (

        <TouchableOpacity
          key={task.id}
          style={styles.taskCard}
          onPress={() => toggleTask(task.id)}
          onLongPress={() => removeTask(task.id)}
        >

          <Text
            style={[
              styles.taskText,
              task.done && styles.completedText,
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

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  progressCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },

  progressText: {
    color: '#FFFFFF',
    marginBottom: 15,
    fontSize: 16,
  },

  progressBarBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#334155',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    borderRadius: 15,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#8B5CF6',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  taskCard: {
    backgroundColor: '#172033',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskText: {
    color: '#FFFFFF',
    fontSize: 17,
    width: '85%',
  },

  completedText: {
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