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

export default function ChaptersScreen({
  navigation,
}) {

  const [chapters, setChapters] = useState([]);

  const [newChapter, setNewChapter] = useState('');

  useEffect(() => {
    loadChapters();
  }, []);

  useEffect(() => {
    saveChapters();
  }, [chapters]);

  async function saveChapters() {

    try {

      const jsonValue =
        JSON.stringify(chapters);

      await AsyncStorage.setItem(
        '@chapters',
        jsonValue
      );

    } catch (error) {
      console.log(error);
    }
  }

  async function loadChapters() {

    try {

      const stored =
        await AsyncStorage.getItem('@chapters');

      if (stored !== null) {
        setChapters(JSON.parse(stored));
      }

    } catch (error) {
      console.log(error);
    }
  }

  function addChapter() {

    if (newChapter.trim() === '') return;

    const newItem = {
      id: Date.now(),
      title: newChapter,
    };

    setChapters((prev) => [
      ...prev,
      newItem,
    ]);

    setNewChapter('');
  }

  function removeChapter(id) {

    const filtered = chapters.filter(
      (chapter) => chapter.id !== id
    );

    setChapters(filtered);
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.header}>
        Capítulo
      </Text>

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Novo capítulo..."
          placeholderTextColor="#777"
          style={styles.input}
          value={newChapter}
          onChangeText={setNewChapter}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={addChapter}
        >

          <Text style={styles.buttonText}>
            +
          </Text>

        </TouchableOpacity>

      </View>

      {chapters.map((chapter) => (

        <TouchableOpacity
          key={chapter.id}
          style={styles.chapterCard}

          onPress={() =>
            navigation.navigate(
              'Editor',
              { chapter }
            )
          }

          onLongPress={() =>
            removeChapter(chapter.id)
          }
        >

          <Text style={styles.chapterTitle}>
            {chapter.title}
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

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 10,
  },

  input: {
    flex: 1,
    backgroundColor: '#121212',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    borderRadius: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  button: {
    backgroundColor: '#5E1111',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  chapterCard: {
    backgroundColor: '#121212',
    padding: 24,
    borderRadius: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  chapterTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

});