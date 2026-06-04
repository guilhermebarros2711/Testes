import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [remember, setRemember] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.title}>
            Olá,{"\n"}Bem-vindo outra vez.
          </Text>

          <Text style={styles.subtitle}>ESTAMOS FELIZ QUE VOLTOU!!</Text>

          <TextInput
            style={styles.input}
            placeholder="digite seu e-mail..."
            placeholderTextColor="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="digite sua senha..."
            placeholderTextColor="#777"
            secureTextEntry={true}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.remember}
              onPress={() => setRemember(!remember)}
            >
              <View style={styles.checkbox}>
                {remember ? <Text style={styles.check}>✓</Text> : null}
              </View>

              <Text style={styles.smallText}>lembre de mim</Text>
            </TouchableOpacity>

            <Text style={styles.smallText}>Esqueceu a senha?</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signup}>Não tem uma conta?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.right}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1EC",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "90%",
    height: "76%",
    backgroundColor: "#fff",
    borderRadius: 32,
    flexDirection: "row",
    overflow: "hidden",
  },

  left: {
    width: "43%",
    paddingLeft: 45,
    justifyContent: "center",
  },

  right: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 64,
    fontWeight: "900",
    lineHeight: 66,
    color: "#000",
  },

  subtitle: {
    fontSize: 18,
    letterSpacing: 1.4,
    marginTop: 8,
    marginBottom: 38,
    color: "#111",
  },

  input: {
    width: 440,
    height: 80,
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 42,
    paddingHorizontal: 35,
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
  },

  row: {
    width: 440,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 45,
  },

  remember: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 21,
    height: 21,
    backgroundColor: "#0864D9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  check: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  smallText: {
    fontSize: 15,
    color: "#111",
  },

  button: {
    backgroundColor: "#0864D9",
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 10,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "500",
  },

  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
  },

  signup: {
    fontSize: 15,
    color: "#111",
  },

  link: {
    color: "#0864D9",
    textDecorationLine: "underline",
    marginLeft: 5,
  },

  image: {
    width: 620,
    height: 620,
    transform: [{ translateX: -80 }],
  },
});