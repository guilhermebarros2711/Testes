import React, { useState, useCallback } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({
  navigation,
}) {

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
        storedChapters !== null
          ? JSON.parse(storedChapters)
          : [];

      const characters =
        storedCharacters !== null
          ? JSON.parse(storedCharacters)
          : [];

      setChapterCount(chapters.length);
      setCharacterCount(characters.length);

      let totalWords = 0;

      for (const chapter of chapters) {

        const content =
          await AsyncStorage.getItem(
            `@chapter_${chapter.id}`
          );

        if (content && content.trim() !== '') {
          totalWords += content
            .trim()
            .split(/\s+/)
            .length;
        }
      }

      setWordCount(totalWords);

    } catch (error) {
      console.log(error);
    }
  }

  return (

    <ScrollView style={styles.screen}>

      <View style={styles.container}>

        <Text style={styles.header}>
          Eclipse Archive
        </Text>

        <Text style={styles.subheader}>
          Cicatriz Divina
        </Text>

        <View style={styles.statsContainer}>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {wordCount}
            </Text>
            <Text style={styles.statLabel}>
              Palavras
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {chapterCount}
            </Text>
            <Text style={styles.statLabel}>
              Capítulos
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {characterCount}
            </Text>
            <Text style={styles.statLabel}>
              Personagens
            </Text>
          </View>

        </View>

        <Text style={styles.sectionTitle}>
          MANUSCRIPT
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('Chapters')
          }
        >

          <Text style={styles.cardTitle}>
            📖 Chapters
          </Text>

          <Text style={styles.cardDescription}>
            Organize capítulos e cenas da história.
          </Text>

        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          STORY ELEMENTS
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('Characters')
          }
        >

          <Text style={styles.cardTitle}>
            👤 Characters
          </Text>

          <Text style={styles.cardDescription}>
            Personagens, poderes e descrições.
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('World')
          }
        >

          <Text style={styles.cardTitle}>
            🌍 Locations & Lore
          </Text>

          <Text style={styles.cardDescription}>
            Reinos, dimensões, inferno e facções.
          </Text>

        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          PLANNING
        </Text>

        <TouchableOpacity style={styles.card}>

          <Text style={styles.cardTitle}>
            ⚔ Timeline
          </Text>

          <Text style={styles.cardDescription}>
            Organize eventos importantes da história.
          </Text>

        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          PROGRESS
        </Text>

        <TouchableOpacity style={styles.card}>

          <Text style={styles.cardTitle}>
            📊 Statistics
          </Text>

          <Text style={styles.cardDescription}>
            Palavras, capítulos e progresso geral.
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    backgroundColor: '#050505',
  },

  container: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  header: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  subheader: {
    color: '#8A8A8A',
    fontSize: 16,
    marginBottom: 28,
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  statLabel: {
    color: '#8E8E8E',
    fontSize: 13,
  },

  sectionTitle: {
    color: '#6B6B6B',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 15,
  },

  card: {
    backgroundColor: '#121212',
    padding: 22,
    borderRadius: 22,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardDescription: {
    color: '#8E8E8E',
    fontSize: 14,
    lineHeight: 22,
  },

});