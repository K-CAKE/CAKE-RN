import { Stack, useNavigation, useRouter } from 'expo-router';
import { Animated, Dimensions, Text, View, StyleSheet, Pressable, Keyboard } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

//Icon
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

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

export default function Step1Screen() {
  //router
  const router = useRouter();
  //progress bar 관련
  const screenWidth = Dimensions.get('window').width;
  const barWidth = 0.85 * screenWidth;
  //navigation
  const navigation = useNavigation();
  //input
  const [Dep, setDep] = useState<string>('');
  const [Arrival, setArrival] = useState<string>('');
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
  async function getNowLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      // setDep(location.coords.longitude + ',' + location.coords.latitude);
      getLocation(location.coords.longitude, location.coords.latitude);
    }
  }

  useEffect(() => {
    getNowLocation();
  }, []);

  async function getLocation(long: number, lat: number) {
    // const url = `http://api.vworld.kr/req/address?service=address&request=getAddress&key=${process.env.EXPO_PUBLIC_GEO_API_KEY}&point=${dep}`;
    // v2현재 404에러 발생, v1으로 진행
    const url = `https://apis.vworld.kr/coord2jibun.do?x=${long}&y=${lat}&output=json&apiKey=${process.env.EXPO_PUBLIC_GEO_API_KEY}`;
    try {
      const { data } = await axios.get(url);
      setDep(data.ADDR);
    } catch (error) {
      console.log(error);
    }
  }
  function resetData() {
    setArrival('');
    setDep('');
    setCheckedCarryOn(false);
    setCheckedSmall(false);
    setCheckedMedium(false);
    setCheckedLarge(false);
    setValue(null);
    setQuantityCarryOn('');
    setQuantitySmall('');
    setQuantityMedium('');
    setQuantityLarge('');
  }
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

  // render item
  const data = [{ key: 'input1' }, { key: 'input2' }, { key: 'button' }];
  const renderItem = ({ item }: { item: { key: string } }) => (
    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
      <NaverMapView style={{ flex: 1 }} />
      {item.key === 'input1' ? (
        <View style={{ borderRadius: 10, marginBottom: 10, backgroundColor: 'white', padding: 20 }}>
          {['Departure', 'Arrival'].map((inputName) => (
            <View key={inputName}>
              <Text style={styles.title}>{inputName}</Text>
              <Animated.View
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
                  onChangeText={(val) => {
                    handleChangeText(inputName, val);
                  }}
                />
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                    { flex: 1, alignItems: 'flex-end' },
                  ]}
                  onPress={() => {
                    handleChangeText(inputName, '');
                  }}
                >
                  <MaterialIcons name="cancel" size={23} color="lightgray" />
                </Pressable>
              </Animated.View>
            </View>
          ))}
        </View>
      ) : item.key === 'input2' ? (
        <>
          <View style={{ zIndex: 50, marginBottom: 10, borderRadius: 10, backgroundColor: 'white', padding: 20 }}>
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
          <View style={{ zIndex: 1, marginBottom: 20, borderRadius: 10, backgroundColor: 'white', padding: 20 }}>
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
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Pressable
            disabled={!Arrival || !Dep} // 출발지 또는 도착지 값 비어 있으면 버튼 비활성화
            onPress={() => {
              router.push({
                pathname: '/taxi/test',
                params: {
                  Dep: Dep as string,
                  Arrival: Arrival as string,
                },
              });
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
        </View>
      ) : null}
    </View>
  );
  return (
    <LinearGradient colors={['#ffd4d1', '#efefef']} locations={[0.0, 0.5]} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'Call taxi',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경색을 흰색 50% 투명도로 설정
          },
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
              <FontAwesome name="question-circle-o" size={26} color="#f02f04" />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                resetData();
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
        <FlatList
          style={{ paddingTop: 120 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ListFooterComponent={<View style={{ height: 300 }} />}
        />
      </View>
    </LinearGradient>
  );
}

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
