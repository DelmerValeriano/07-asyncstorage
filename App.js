import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Pressable,
} from 'react-native';

const App = () => {
  const [inputTexto, setInputText] = useState('');
  const [nombreStorage, setNombreStorage] = useState('');

  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      setNombreStorage(inputTexto);
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre');
      setNombreStorage(nombre);
    } catch (error) {
      console.log(error);
    }
  };
  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setNombreStorage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.contenedor}>
        {nombreStorage ? <Text>Hola {nombreStorage}</Text> : null}

        <TextInput
          placeholder="Escribe tu nombre"
          style={styles.input}
          onChangeText={texto => setInputText(texto)}
        />
        <Button onPress={() => guardarDatos()} title="Guardar" color="#333" />
        {nombreStorage ? (
          <Pressable style={styles.btnEliminar} onPress={() => eliminarDatos()}>
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </Pressable>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 20,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  textoEliminar: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
