// PhoneFormComponent.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {Input, CheckBox} from 'react-native-elements';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useFormContext} from '../context/FormContext';
import {styles} from './FormScreen1';
import SelectDropdown from 'react-native-select-dropdown';
import ModalData from './Modal';

const validationSchema = Yup.object().shape({
  countryCode: Yup.string().required('Country code is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  acceptTermsAndCondition: Yup.boolean().oneOf(
    [true],
    'You must accept terms and conditions',
  ),
});

const FormScreen3 = ({navigation}: any) => {
  const {setFieldData} = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);
  const countryCodes = ['+91', '+1'];

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          countryCode: null,
          phoneNumber: '',
          acceptTermsAndCondition: false,
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          setFieldData('phoneNumber', values.phoneNumber);
          setFieldData('countryCode', values.countryCode);
          setModalVisible(true);
          console.log(values);
        }}>
        {({
          values,
          handleChange,
          errors,
          touched,
          setFieldTouched,
          setFieldValue,
          isValid,
          handleBlur,
          handleSubmit,
        }) => (
          <View style={styles.container}>
            <Text style={styles.formTitle}>Form 3</Text>
            <Text style={styles.label}>Country Code</Text>
            <SelectDropdown
              data={countryCodes}
              onSelect={(selectedItem: any, index: any) => {
                setFieldValue('countryCode', selectedItem);
                setFieldTouched('countryCode', true);
              }}
            />
            {touched.countryCode && errors.countryCode && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              style={styles.inputField}
              onBlur={handleBlur('phoneNumber')}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <CheckBox
              title="I accept the Terms and Conditions"
              checked={values.acceptTermsAndCondition}
              onPress={() => {
                setFieldValue(
                  'acceptTermsAndCondition',
                  !values.acceptTermsAndCondition,
                );
                setFieldTouched('acceptTermsAndCondition', true);
              }}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedIcon="check-square-o"
              uncheckedIcon="square-o"
              checkedColor="green"
              uncheckedColor="red"
            />
            {touched.acceptTermsAndCondition &&
              errors.acceptTermsAndCondition && (
                <Text style={styles.errorText}>
                  {errors.acceptTermsAndCondition}
                </Text>
              )}
            <Pressable
              onPress={() => navigation.navigate('FormScreen2')}
              style={styles.pressable}>
              <Text>Back</Text>
            </Pressable>
            <Pressable style={styles.pressable} onPress={() => handleSubmit()}>
              <Text>Save and Next</Text>
            </Pressable>
          </View>
        )}
      </Formik>
      <ModalData modalVisible={modalVisible} close={closeModal} />
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default FormScreen3;
