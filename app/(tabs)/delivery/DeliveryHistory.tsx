import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = () => (
  <Card style={{ backgroundColor: '#FFD4D1' }}> 
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={(props) => (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar.Icon
            {...props}
            icon={() => (
              <MaterialIcons name="delivery-dining" size={24} color="white" />
            )}
            style={{ backgroundColor: '#F02F04' }}  
          />
        </View>
      )}
      right={(props) => (
        <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
      )}
    />
  </Card>
);

export default MyComponent;
