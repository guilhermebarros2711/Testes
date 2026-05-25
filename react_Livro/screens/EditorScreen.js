import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditorScreen({
  route,
}) {

  const { chapter } = route.params;

  const [content, setContent] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    saveContent();
  }, [content]);

  async function saveContent() {

    try {

      await AsyncStorage.setItem(
        `@chapter_${chapter.id}`,
        content
      );

    } catch (error) {
      console.log(error);
    }
  }

  async function loadContent() {

    try {

      const saved =
        await AsyncStorage.getItem(
          `@chapter_${chapter.id}`
        );

      if (saved !== null) {
        setContent(saved);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const wordCount =
    content.trim() === ''
      ? 0
      : content.trim().split(/\s+/).length;

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {chapter.title}
      </Text>

      <Text style={styles.wordCount}>
        {wordCount} palavras
      </Text>

      <TextInput
        multiline
        placeholder="Comece a escrever..."
        placeholderTextColor="#666"
        style={styles.editor}
        value={content}
        onChangeText={setContent}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#050505',
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  wordCount: {
    color: '#ffffff',
    marginBottom: 20,
    fontSize: 15,
  },

  editor: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
    textAlignVertical: 'top',
    lineHeight: 28,
  },

});