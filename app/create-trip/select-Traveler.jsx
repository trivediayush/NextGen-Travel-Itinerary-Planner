import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors'; // Ensure correct path
import { SelevctTravelerList } from './../../constants/Options.js'
import { CreateTripContext } from './../../context/CreateTripContext';
import OptionCard from './../../components/CreateTrip/OptionCard.jsx'; // Update import for Options.js

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Set up navigation header
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  // Update tripData when selectedTraveler changes
  useEffect(() => {
    if (selectedTraveler) {
      setTripData({
        ...tripData,
        traveler: selectedTraveler,
      });
    }
  }, [selectedTraveler]);

  useEffect(() => {
    console.log(tripData); // Debugging tripData
  }, [tripData]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE, // Correct color reference
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: 'outfit-bold',
          marginTop: 20,
          color: Colors.light.text, // Correct light mode text color
        }}
      >
        Who's Traveling
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 23,
            color: Colors.light.text, // Correct text color
          }}
        >
          Choose your travelers
        </Text>

        <FlatList
          data={SelevctTravelerList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} selectedOption={selectedTraveler} /> {/* Correct component name */}
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
      >
      <Link href={'/create-trip/select-dates'}
      style={{
        width:'100%',
        textAlign:'center',
      }}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.WHITE,
            fontFamily: 'outfit-medium',
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </Link>
      </TouchableOpacity>
      
    </View>
  );
}
