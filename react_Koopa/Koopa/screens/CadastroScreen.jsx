import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function CadastroScreen() {
  const [focused, setFocused] = useState("");

  return (
    <LinearGradient
      colors={["#000000", "#120035", "#00D4FF"]}
      style={styles.container}
    >
      <BlurView intensity={35} tint="dark" style={styles.card}>
        <Text style={styles.title}>Crie sua conta</Text>

        <View style={styles.row}>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#9a9a9a"
            style={[
              styles.inputSmall,
              focused === "nome" && styles.focused,
            ]}
            onFocus={() => setFocused("nome")}
            onBlur={() => setFocused("")}
          />

          <TextInput
            placeholder="Sobrenome"
            placeholderTextColor="#9a9a9a"
            style={[
              styles.inputSmall,
              focused === "sobrenome" && styles.focused,
            ]}
            onFocus={() => setFocused("sobrenome")}
            onBlur={() => setFocused("")}
          />
        </View>

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#9a9a9a"
          style={[
            styles.input,
            focused === "email" && styles.focused,
          ]}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused("")}
        />

        <TextInput
          placeholder="(99) 99999-9999"
          placeholderTextColor="#9a9a9a"
          style={[
            styles.input,
            focused === "telefone" && styles.focused,
          ]}
          onFocus={() => setFocused("telefone")}
          onBlur={() => setFocused("")}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Criar Conta
          </Text>
        </TouchableOpacity>

        <Text style={styles.socialText}>
          Ou cadastre com:
        </Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}></Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          Ao criar uma conta, você concorda com nossos
          Termos & Serviços
        </Text>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: 520,
    padding: 35,
    borderRadius: 40,
    overflow: "hidden",
  },

  title: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "700",
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputSmall: {
    width: "48%",
    height: 65,
    borderRadius: 18,
    backgroundColor: "#595959",
    color: "#fff",
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  input: {
    height: 65,
    borderRadius: 18,
    backgroundColor: "#595959",
    color: "#fff",
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  focused: {
    backgroundColor: "#767676",
  },

  button: {
    height: 70,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
  },

  socialText: {
    color: "#ddd",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialButton: {
    width: "48%",
    height: 60,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  socialIcon: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  terms: {
    marginTop: 20,
    color: "#bdbdbd",
    fontSize: 12,
    textAlign: "center",
  },
});