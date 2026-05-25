import React, { useState, useEffect, useCallback } from 'react';

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

import TaskCard from './components/TaskCard';

export default function App() {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Estudar React Native',
      done: true,
      category: 'Programação',
      color: '#8B5CF6',
    },
    {
      id: 2,
      title: 'Fazer atividade da escola',
      done: false,
      category: 'Escola',
      color: '#3B82F6',
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const saveTasks = useCallback(async (tasksToSave) => {

    try {

      const jsonValue = JSON.stringify(tasksToSave);

      await AsyncStorage.setItem(
        '@tasks',
        jsonValue
      );

    } catch (error) {
      console.log(error);
    }

  }, []);

  const loadTasks = useCallback(async () => {

    try {

      const storedTasks = await AsyncStorage.getItem('@tasks');

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }

    } catch (error) {
      console.log(error);
    }

  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks, saveTasks]);

  function addTask() {

    if (newTask.trim() === '') return;

    const colors = [
      '#8B5CF6',
      '#3B82F6',
      '#10B981',
      '#F59E0B',
      '#EF4444',
    ];

    const categories = [
      'Programação',
      'Escola',
      'Saúde',
      'Pessoal',
      'Trabalho',
    ];

    const randomIndex = Math.floor(
      Math.random() * categories.length
    );

    const newItem = {
      id: Date.now(),
      title: newTask,
      done: false,
      category: categories[randomIndex],
      color: colors[randomIndex],
    };

    setTasks((prev) => [...prev, newItem]);

    setNewTask('');
  }

  function toggleTask(id) {

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function removeTask(id) {

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.done
  ).length;

  const progress =
    tasks.length > 0
      ? (completedTasks / tasks.length) * 100
      : 0;

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        StudyFlow 📚
      </Text>

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

          <Text style={styles.addButtonText}>
            +
          </Text>

        </TouchableOpacity>

      </View>

      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />

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

});