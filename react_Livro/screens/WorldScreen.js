import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorldScreen() {

  const [worlds, setWorlds] = useState([]);

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  useEffect(() => {
    loadWorlds();
  }, []);

  useEffect(() => {
    saveWorlds();
  }, [worlds]);

  async function saveWorlds() {

    try {

      const jsonValue =
        JSON.stringify(worlds);

      await AsyncStorage.setItem(
        '@worlds',
        jsonValue
      );

    } catch (error) {
      console.log(error);
    }
  }

  async function loadWorlds() {

    try {

      const stored =
        await AsyncStorage.getItem('@worlds');

      if (stored !== null) {
        setWorlds(JSON.parse(stored));
      }

    } catch (error) {
      console.log(error);
    }
  }

  function addWorldInfo() {

    if (
      title.trim() === '' ||
      content.trim() === ''
    ) return;

    const newInfo = {
      id: Date.now(),
      title,
      content,
    };

    setWorlds((prev) => [
      ...prev,
      newInfo,
    ]);

    setTitle('');
    setContent('');
  }

  function removeWorld(id) {

    const filtered = worlds.filter(
      (item) => item.id !== id
    );

    setWorlds(filtered);
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.header}>
        Worldbuilding
      </Text>

      <TextInput
        placeholder="Título..."
        placeholderTextColor="#666"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Descreva o mundo..."
        placeholderTextColor="#666"
        style={[
          styles.input,
          styles.contentInput,
        ]}
        multiline
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addWorldInfo}
      >

        <Text style={styles.buttonText}>
          Adicionar
        </Text>

      </TouchableOpacity>

      {worlds.map((item) => (

        <TouchableOpacity
          key={item.id}
          style={styles.card}

          onLongPress={() =>
            removeWorld(item.id)
          }
        >

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.content}>
            {item.content}
          </Text>

        </TouchableOpacity>

      ))}

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  header: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#121212',
    color: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  contentInput: {
    height: 160,
    textAlignVertical: 'top',
  },

  button: {
    backgroundColor: '#5E1111',
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#121212',
    padding: 24,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  content: {
    color: '#A1A1AA',
    lineHeight: 24,
    fontSize: 15,
  },

});