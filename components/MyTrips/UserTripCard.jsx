import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Colors } from '@/constants/Colors'

export default function UserTripCard(trip) {
  const formatData = (data) => {
    try {
      return JSON.parse(data || '{}'); // Prevent errors from null or invalid JSON
    } catch (e) {
      console.error('Error parsing trip data:', e);
      return {}; // Fallback to empty object
    }
  };

  const tripData = formatData(trip.tripData);

  return (
    <View style={{
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    }}>
      <Image 
        source={{
          uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
               (tripData.locationInfo?.photoRef || '') +
               '&key=AIzaSyDbnLrPvkLVeSBcoAZ0FuWt5Ql68io9yls'
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />
      <View>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>
          {tripData?.travelPlan?.location || 'No location provided'}
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>
          {moment(tripData.startDate).format('DD MMM YYYY')}
        </Text>
        <Text>Traveling: {tripData?.traveler?.title || 'No traveler info'}</Text>
      </View>
    </View>
  );
}
