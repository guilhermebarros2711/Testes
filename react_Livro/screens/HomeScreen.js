import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen({
  navigation,
}) {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.header}>
        Eclipse Archive
      </Text>

      <Text style={styles.subheader}>
        Archive Sections
      </Text>

      <TouchableOpacity
  style={styles.card}
  onPress={() =>
    navigation.navigate('Chapters')
  }
>
        <Text style={styles.cardTitle}>
          📖 Capitulos
        </Text>

        <Text style={styles.cardDescription}>
          Acesse os capitulos de Cicatriz Divina.
        </Text>
      </TouchableOpacity>

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
          Explore os "Herois", Deuses e outros personagens da história.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>
          🌍 Worldbuilding
        </Text>

        <Text style={styles.cardDescription}>
          Veja como o mundo se desenvolve fora das telas.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>
          ⚔ Timeline
        </Text>

        <Text style={styles.cardDescription}>
          Conheça toda a história que foi (ou não) contada.
        </Text>
      </TouchableOpacity>

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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },

  subheader: {
    color: '#8A8A8A',
    fontSize: 16,
    marginBottom: 30,
  },

  card: {
    backgroundColor: '#121212',
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,

    borderWidth: 1,
    borderColor: '#2A0D0D',
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cardDescription: {
    color: '#8E8E8E',
    fontSize: 15,
    lineHeight: 22,
  },

});