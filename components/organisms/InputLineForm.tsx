import React from 'react';
import { View, Text, TextInput, Animated, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

interface InputLineFormProps {
  title: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSetGeo?: () => void;
  searchResult: (text: string) => void;
  focusAnimation: Animated.Value;
}

export const InputLineForm = (props: InputLineFormProps) => {
  const interpolateColor = (animation: any) =>
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['lightgray', '#F02F04'], // 색상 변경
    });

  const handleFocus = (animation: any) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = (animation: any) => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <Animated.View style={[styles.inputContainer, { borderBottomColor: interpolateColor(props.focusAnimation) }]}>
        <TextInput
          style={styles.input}
          value={props.value}
          onFocus={() => handleFocus(props.focusAnimation)}
          onBlur={() => handleBlur(props.focusAnimation)}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          onEndEditing={() => props.searchResult(props.value)}
        />
        {props.onSetGeo && (
          <Entypo name="location" size={23} color="lightgray" onPress={props.onSetGeo} style={{ marginRight: 5 }} />
        )}
        <MaterialIcons
          name="cancel"
          size={23}
          color="lightgray"
          onPress={() => {
            props.onChangeText('');
            props.searchResult('');
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  inputContainer: {
    borderBottomWidth: 2,
    marginBottom: 10,
    flexDirection: 'row',
  },
  input: {
    alignSelf: 'center',
    height: 40,
    flex: 10,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 8,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 15,
  },
  dropdownOpen: {
    borderColor: '#F02F04',
    borderWidth: 2,
  },
  dropdownClosed: {
    borderColor: 'lightgray',
  },
  arrowOpen: {
    tintColor: '#F89B87',
  },
  arrowClosed: {
    tintColor: 'lightgray',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    color: 'lightgray',
  },
  clickedLabel: {
    fontSize: 16,
    color: 'black',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  nextButton: {
    borderRadius: 13,
    width: '88%',
    height: 50,
    backgroundColor: '#F02F04',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
