import React from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useFormContext} from '../context/FormContext';

const form1ValidationSchema = Yup.object().shape({
  emailId: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^\d]*\d){2})(?=(?:[^\W_]*[\W_]){2})[A-Za-z\d\W_]{8,}$/,
      'minimum of 2 capital letters, 2 small letters, 2 numbers, and 2 special characters required',
    )
    .required('Password is required'),
});

const FormScreen1 = ({navigation}: any) => {
  const {setFieldData} = useFormContext();

  return (
    <Formik
      initialValues={{emailId: '', password: ''}}
      validationSchema={form1ValidationSchema}
      onSubmit={values => {
        setFieldData('emailId', values.emailId);
        setFieldData('password', values.password);
        navigation.navigate('FormScreen2', {formData: values});
      }}>
      {({values, handleChange, handleSubmit, errors, touched, handleBlur}) => (
        <View style={styles.container}>
          <Text style={styles.formTitle}>Form 1</Text>
          <Text style={styles.label}>EMail</Text>
          <TextInput
            placeholder="Email"
            value={values.emailId}
            onChangeText={handleChange('emailId')}
            style={styles.inputField}
            onBlur={handleBlur('emailId')}
          />
          {touched.emailId && errors.emailId && (
            <Text style={styles.errorText}>{errors.emailId}</Text>
          )}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            style={styles.inputField}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.pressable, styles.disabled]} disabled>
              <Text>Back</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => handleSubmit()}>
              <Text>Save and Next</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 36,
    backgroundColor: '#323e50',
  },
  formTitle: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginBottom: 10,
    textAlign: 'left',
    paddingLeft: 5,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginTop: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  pressable: {
    backgroundColor: 'blue',
    padding: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: '#9ebacf',
  },
});

export default FormScreen1;
