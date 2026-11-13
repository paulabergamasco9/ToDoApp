import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
const [tarefaAtual, setTarefaAtual] = useState('');
const [listaTarefas, setListaTarefas] = useState([]);

const handleAdicionarTarefa = () => {
  if (tarefaAtual.trim() === '') {
    return;
  }
  setListaTarefas([...listaTarefas, tarefaAtual]);
  setTarefaAtual('');
}

const salvarTeste = async () => {
    await AsyncStorage.setItem('chave_secreta', 'Felipe');
    console.log('Teste salvo no cofre!');
}

  return (
    <View>
      <Text style={styles.title}>📝 Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={tarefaAtual}
          placeholder="Digite o reparo necessário..." 
          onChangeText={setTarefaAtual}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdicionarTarefa}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
      style={styles.listaBox}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.listaBox}>
          {listaTarefas.map((tarefa, index) => (
            <View key={index} style={styles.cardTarefa}>
              <Text style={styles.textoTarefa}>· {tarefa}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
   
}

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  contadorTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAdd: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 35, 
    marginBottom: 20, 
  },
  inputContainer: { 
    flexDirection: 'row', 
    marginBottom: 20,
    width: '100%',
  },
  input: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    marginRight: 10,
  },
  listaBox: {
    marginTop: 10,
    width: '100%',
  },
  cardTarefa: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
  },
  textoTarefa: { 
    fontSize: 16, 
  },
});0