import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [tarefaAtual, setTarefaAtual] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);

  const salvarDadosLocal = async (listaParaSalvar) => {
    try {
      const listaString = JSON.stringify(listaParaSalvar);
      await AsyncStorage.setItem('minhas_tarefas', listaString);
    } catch (error) {
      console.log('Erro ao salvar dados:', error);
    }
  };

  // Passo 3: O Descompactador (Parser)
  const resgatarDadosLocal = async () => {
    try {
      const textoLido = await AsyncStorage.getItem('minhas_tarefas');
      if (textoLido !== null) {
        const listaInflada = JSON.parse(textoLido);
        setListaTarefas(listaInflada);
      }
    } catch (error) {
      console.log('Erro ao resgatar dados:', error);
    }
  };

  const handleAdicionarTarefa = () => {
    if (tarefaAtual.trim() === '') {
      return;
    }
    
    const novaLista = [...listaTarefas, tarefaAtual];
    setListaTarefas(novaLista);
    salvarDadosLocal(novaLista); 
  };

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