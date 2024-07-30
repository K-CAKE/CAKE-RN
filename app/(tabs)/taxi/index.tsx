import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useNavigation } from 'expo-router';
import { Animated, Dimensions, Text, View, StyleSheet, Pressable, Keyboard } from 'react-native';
import { useState, useRef } from 'react';
import * as Progress from 'react-native-progress';
import Checkbox from 'expo-checkbox';
//Icon
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

interface IntputProps {
  label: string;
  isChecked: boolean;
  setChecked: any;
  quantity: string;
  setQuantity: any;
}

// 체크박스 컴포넌트
const CustomCheckbox = ({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: any }) => {
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        color={value ? '#F02F04' : 'lightgray'}
        style={styles.checkbox}
      />
      <Text style={value ? styles.clickedLabel : styles.label}>{label}</Text>
    </View>
  );
};
const CheckboxWithInput = ({ label, isChecked, setChecked, quantity, setQuantity }: IntputProps) => {
  return (
    <View>
      <CustomCheckbox label={label} value={isChecked} onValueChange={setChecked} />
      {isChecked && (
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={setQuantity}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      )}
    </View>
  );
};

export default function Page() {
  //progress bar 관련
  const screenWidth = Dimensions.get('window').width;
  const barWidth = 0.85 * screenWidth;
  //navigation
  const navigation = useNavigation();
  //input
  const [Dep, setDep] = useState('');
  const [Arrival, setArrival] = useState('');
  // const [HC, setHC] = useState(0);
  // const [quickBooking, setQuick] = useState(false);
  // luggage checkbox
  const [isCheckedCarryOn, setCheckedCarryOn] = useState(false);
  const [quantityCarryOn, setQuantityCarryOn] = useState('');

  const [isCheckedSmall, setCheckedSmall] = useState(false);
  const [quantitySmall, setQuantitySmall] = useState('');

  const [isCheckedMedium, setCheckedMedium] = useState(false);
  const [quantityMedium, setQuantityMedium] = useState('');

  const [isCheckedLarge, setCheckedLarge] = useState(false);
  const [quantityLarge, setQuantityLarge] = useState('');
  //dropdown picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '1', value: 1, key: 'item1' },
    { label: '2', value: 2, key: 'item2' },
    { label: '3', value: 3, key: 'item3' },
    { label: '4', value: 4, key: 'item4' },
    { label: '5', value: 5, key: 'item5' },
  ]);
  const CustomTickIcon = () => <Feather name="check-circle" size={24} color="#F89B87" />;
  //Handler
  //focus event handler
  const focusAnimation1 = useRef(new Animated.Value(0)).current;
  const focusAnimation2 = useRef(new Animated.Value(0)).current;
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
  const interpolateColor = (animation: any) =>
    animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['lightgray', '#F02F04'], // 색상 변경
    });

  //change text handler
  const handleChangeText = (inputName: string, val: string) => {
    if ('Departure' === inputName) {
      setDep(val);
    } else if ('Arrival' === inputName) {
      setArrival(val);
    }
  };

  const data = [{ key: 'input1' }, { key: 'input2' }, { key: 'button' }];
  // render item
  const renderItem = ({ item }: { item: { key: string } }) => (
    <View style={{ paddingLeft: 30, paddingRight: 30 }}>
      {item.key === 'input1' ? (
        <View style={{ marginBottom: 15 }}>
          {['Departure', 'Arrival'].map((inputName) => (
            <>
              <Text style={styles.title}>{inputName}</Text>
              <Animated.View
                key={inputName}
                style={[
                  styles.inputContainer,
                  inputName === 'Departure'
                    ? { borderBottomColor: interpolateColor(focusAnimation1) }
                    : { borderBottomColor: interpolateColor(focusAnimation2) },
                ]}
              >
                <TextInput
                  style={styles.input}
                  value={inputName === 'Departure' ? Dep : Arrival}
                  onFocus={() =>
                    inputName === 'Departure' ? handleFocus(focusAnimation1) : handleFocus(focusAnimation2)
                  }
                  onBlur={() => (inputName === 'Departure' ? handleBlur(focusAnimation1) : handleBlur(focusAnimation2))}
                  placeholder={inputName === 'Departure' ? 'Enter departure' : 'Enter arrival'}
                  onChangeText={(val) => handleChangeText(inputName, val)}
                />
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                    { flex: 1, alignItems: 'flex-end' },
                  ]}
                  onPress={() => handleChangeText(inputName, '')}
                >
                  <MaterialIcons name="cancel" size={23} color="lightgray" />
                </Pressable>
              </Animated.View>
            </>
          ))}
        </View>
      ) : item.key === 'input2' ? (
        <>
          <View style={{ zIndex: 50, marginBottom: 10 }}>
            <Text style={styles.title}>Headcount</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select number of people"
              style={[styles.dropdown, open ? styles.dropdownOpen : styles.dropdownClosed]}
              dropDownContainerStyle={[{ borderWidth: 2, borderColor: '#F02F04', backgroundColor: 'white' }]}
              TickIconComponent={CustomTickIcon}
              // @ts-ignore
              arrowIconStyle={open ? styles.arrowOpen : styles.arrowClosed}
              selectedItemContainerStyle={{ backgroundColor: '#FEECEB' }}
            />
          </View>
          <View style={{ zIndex: 1, marginBottom: 20 }}>
            <Text style={styles.title}>Luggage Size(based on the height)</Text>
            <CheckboxWithInput
              label="Carry-On(18~22 in)"
              isChecked={isCheckedCarryOn}
              setChecked={setCheckedCarryOn}
              quantity={quantityCarryOn}
              setQuantity={setQuantityCarryOn}
            />
            <CheckboxWithInput
              label="Small(23~24 in)"
              isChecked={isCheckedSmall}
              setChecked={setCheckedSmall}
              quantity={quantitySmall}
              setQuantity={setQuantitySmall}
            />
            <CheckboxWithInput
              label="Medium(25~27 in)"
              isChecked={isCheckedMedium}
              setChecked={setCheckedMedium}
              quantity={quantityMedium}
              setQuantity={setQuantityMedium}
            />
            <CheckboxWithInput
              label="Large(28~32 in)"
              isChecked={isCheckedLarge}
              setChecked={setCheckedLarge}
              quantity={quantityLarge}
              setQuantity={setQuantityLarge}
            />
          </View>
        </>
      ) : item.key === 'button' ? (
        <Pressable
          onPress={() => {
            console.log('next button');
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
            styles.nextButton,
          ]}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
        </Pressable>
      ) : null}
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'Call taxi',
          headerBackVisible: false,
          headerRight: () => (
            <Pressable
              onPress={() => {
                console.log('question button');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <FontAwesome name="question-circle-o" size={24} color="black" />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('home' as never);
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.block}>
        <View style={{ padding: 20, alignSelf: 'center', marginBottom: 10 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}
          >
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <MaterialCommunityIcons name="numeric-1-circle-outline" size={24} color="#FFD4D1" />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <MaterialCommunityIcons name="numeric-2-circle-outline" size={24} color="#FFD4D1" />
            </View>
          </View>
          <Progress.Bar
            progress={0}
            width={barWidth}
            height={13}
            color="#F02F04"
            borderColor="white"
            unfilledColor="#FFD4D1"
            borderRadius={50}
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ListFooterComponent={<View style={{ height: 150 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
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
    borderRadius: 30,
    width: '100%',
    height: 50,
    backgroundColor: '#F02F04',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
