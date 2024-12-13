import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlaces() {

    const navigation=useNavigation();
    const {tripData, setTripData}=useContext(CreateTripContext);
    const router=useRouter();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:'Search Places',

        })
    },[]);

    useEffect(()=>{
      console.log(tripData);
    }),[tripData]

  return (
    <View 
    style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      
      <GooglePlacesAutocomplete
      placeholder = 'Search Place'
      fetchDetails = {true}
      onFail={error=>console.log(error+"\nSanskar")}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setTripData({
          locationInfo: {
            name: data.description,
            coordinates: details?.geometry.location,
            photoRef: details?.photos[0]?.photo_reference,
            url: details?.url
          }
        });

        router.push('/create-trip/select-Traveler')
        
      }}
      query={{
        key: "AIzaSyDbnLrPvkLVeSBcoAZ0FuWt5Ql68io9yls", 
        language: 'en',
      }}

      styles={{
        textInputContainer: {
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 25,
        }
      }}

    />
    </View>
  )
}