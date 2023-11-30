// Form2Screen.js
import React from 'react';
import {View, Text, Button, TextInput, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useFormContext} from '../context/FormContext';
import {styles} from './FormScreen1';

const form2ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Only alphabets are allowed')
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('First name is required'),
  lastName: Yup.string().min(10, 'Too short'),
  address: Yup.string()
    .min(10, 'Minimum length is 10')
    .required('Address is required'),
});

const FormScreen2 = ({navigation}: any) => {
  const {setFieldData} = useFormContext();

  return (
    <Formik
      initialValues={{firstName: '', lastName: '', address: ''}}
      validationSchema={form2ValidationSchema}
      onSubmit={(values, {setSubmitting}) => {
        // Handle form submission
        setFieldData('firstName', values.firstName);
        setFieldData('lastName', values.lastName);
        setFieldData('address', values.address);
        navigation.navigate('FormScreen3');
      }}>
      {({
        values,
        handleChange,
        handleSubmit,
        errors,
        touched,
        isValid,
        handleBlur,
      }) => (
        <View style={styles.container}>
          <Text style={styles.formTitle}>Form 2</Text>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            style={styles.inputField}
          />
          {touched.firstName && errors.firstName && (
            <Text style={{color: 'red'}}>{errors.firstName}</Text>
          )}
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="Last Name (Optional)"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            style={styles.inputField}
          />
          {touched.lastName && errors.lastName && (
            <Text style={{color: 'red'}}>{errors.lastName}</Text>
          )}
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholder="Address"
            value={values.address}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            style={styles.inputField}
          />
          {touched.address && errors.address && (
            <Text style={{color: 'red'}}>{errors.address}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => navigation.navigate('FormScreen1')}
              style={styles.pressable}>
              <Text>Back</Text>
            </Pressable>
            <Pressable onPress={() => handleSubmit()} style={styles.pressable}>
              <Text>Save and Next</Text>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default FormScreen2;
