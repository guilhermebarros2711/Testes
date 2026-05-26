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

export default function CharactersScreen() {

  const [characters, setCharacters] = useState([]);

  const [name, setName] = useState('');

  const [race, setRace] = useState('');

  const [power, setPower] = useState('');

  const [description, setDescription] = useState('');

  const [faction, setFaction] = useState('');

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    saveCharacters();
  }, [characters]);

  async function saveCharacters() {

    try {

      const jsonValue =
        JSON.stringify(characters);

      await AsyncStorage.setItem(
        '@characters',
        jsonValue
      );

    } catch (error) {
      console.log(error);
    }
  }

  async function loadCharacters() {

    try {

      const stored =
        await AsyncStorage.getItem(
          '@characters'
        );

      if (stored !== null) {
        setCharacters(JSON.parse(stored));
      }

    } catch (error) {
      console.log(error);
    }
  }

  function addCharacter() {

    if (
      name.trim() === '' ||
      race.trim() === '' ||
      power.trim() === ''
    ) return;

    const newCharacter = {
      id: Date.now(),
      name,
      race,
      power,
      faction,
      description,
    };

    setCharacters((prev) => [
      ...prev,
      newCharacter,
    ]);

    setName('');
    setRace('');
    setPower('');
    setFaction('');
    setDescription('');
  }

  function removeCharacter(id) {

    const filtered = characters.filter(
      (character) => character.id !== id
    );

    setCharacters(filtered);
  }

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.header}>
        Characters
      </Text>

      <TextInput
        placeholder="Nome do personagem..."
        placeholderTextColor="#666"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Raça..."
        placeholderTextColor="#666"
        style={styles.input}
        value={race}
        onChangeText={setRace}
      />

      <TextInput
        placeholder="Poder..."
        placeholderTextColor="#666"
        style={styles.input}
        value={power}
        onChangeText={setPower}
      />

      <TextInput
        placeholder="Facção..."
        placeholderTextColor="#666"
        style={styles.input}
        value={faction}
        onChangeText={setFaction}
      />

      <TextInput
        placeholder="Descrição..."
        placeholderTextColor="#666"
        style={[
          styles.input,
          styles.descriptionInput,
        ]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addCharacter}
      >

        <Text style={styles.buttonText}>
          Adicionar personagem
        </Text>

      </TouchableOpacity>

      {characters.map((character) => (

        <TouchableOpacity
          key={character.id}
          style={styles.card}

          onLongPress={() =>
            removeCharacter(character.id)
          }
        >

          <Text style={styles.name}>
            {character.name}
          </Text>

          <Text style={styles.info}>
            Raça: {character.race}
          </Text>

          <Text style={styles.info}>
            Poder: {character.power}
          </Text>

          <Text style={styles.info}>
            Facção: {character.faction}
          </Text>

          <Text style={styles.description}>
            {character.description}
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

  descriptionInput: {
    height: 120,
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

  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  info: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 6,
  },

  description: {
    color: '#8E8E8E',
    marginTop: 12,
    lineHeight: 22,
  },

});