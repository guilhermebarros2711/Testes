import React, { useState, useCallback } from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StatsScreen() {

  const [chapterCount, setChapterCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  async function loadStats() {

    try {

      const storedChapters =
        await AsyncStorage.getItem('@chapters');

      const storedCharacters =
        await AsyncStorage.getItem('@characters');

      const chapters =
        storedChapters
          ? JSON.parse(storedChapters)
          : [];

      const characters =
        storedCharacters
          ? JSON.parse(storedCharacters)
          : [];

      let totalWords = 0;

      for (const chapter of chapters) {

        const content =
          await AsyncStorage.getItem(
            `@chapter_${chapter.id}`
          );

        if (
          content &&
          content.trim() !== ''
        ) {

          totalWords += content
            .trim()
            .split(/\s+/)
            .length;
        }
      }

      setChapterCount(chapters.length);
      setCharacterCount(characters.length);
      setWordCount(totalWords);

    } catch (error) {
      console.log(error);
    }
  }

  const goal = 10000;

  const percentage = Math.min(
    Math.round((wordCount / goal) * 100),
    100
  );

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.header}>
        Statistics
      </Text>

      <View style={styles.card}>

        <Text style={styles.number}>
          {wordCount}
        </Text>

        <Text style={styles.label}>
          Palavras escritas
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {chapterCount}
        </Text>

        <Text style={styles.label}>
          Capítulos criados
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {characterCount}
        </Text>

        <Text style={styles.label}>
          Personagens cadastrados
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.number}>
          {percentage}%
        </Text>

        <Text style={styles.label}>
          Meta de {goal.toLocaleString()} palavras
        </Text>

      </View>

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

  card: {
    backgroundColor: '#121212',
    padding: 26,
    borderRadius: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  number: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
  },

  label: {
    color: '#8E8E8E',
    fontSize: 16,
    marginTop: 6,
  },

});