import React from 'react';
import {Modal, View, Text, StyleSheet, Pressable} from 'react-native';
import {useFormContext} from '../context/FormContext';

const ModalData = ({modalVisible, close}: any) => {
  const {formData} = useFormContext();
  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={modalVisible}
        onRequestClose={close}>
        <View style={styles.modal}>
          <Text style={styles.text}>{JSON.stringify(formData)}</Text>
          <Pressable onPress={close} style={styles.pressable}>
            <Text>Click To Close Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  pressable: {
    backgroundColor: 'blue',
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
  },
});

export default ModalData;
