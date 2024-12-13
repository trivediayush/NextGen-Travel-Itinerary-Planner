import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import { AI_PROMPT } from './../../constants/Options';
import { CreateTripContext } from './../../context/CreateTripContext';
import { chatSession } from './../../configs/AiModel';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image'

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData && user) {
      GenerateAiTrip();
    }
  }, [tripData, user]);

  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData?.locationInfo?.name || 'your location')
      .replace('{totalDays}', tripData.totalNoOfDays || 'unknown')
      .replace('{totalNight}', (tripData.totalNoOfDays - 1) || 'unknown')
      .replace('{traveler}', tripData.traveler?.title || 'traveler')
      .replace('{budget}', tripData.budget || 'a budget');

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResp = JSON.parse(await result.response.text());

      await addDoc(collection(db, "UserTrips"), {
        userEmail: user.email,
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
      });

      setLoading(false);
      router.push('(tabs)/mytrip');
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
        textAlign: 'center'
      }}>Please Wait.....</Text>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 40
      }}>We are working to generate your dream trip</Text>

      <LottieView
        source={require('./../../assets/images/plane.json')}
        style={{ width: '100%', height: 350 }}
        autoPlay
        loop
      />


      <Text style={{
        fontFamily: 'outfit',
        color: '#808080',
        fontSize: 18,
        textAlign: 'center'
      }}>Do not Go Back</Text>
    </View>
  );
}
