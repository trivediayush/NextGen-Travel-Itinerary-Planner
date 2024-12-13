import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from './../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = auth.currentUser;
    const router = useRouter();

    useEffect(() => {
        if (user?.email) {
            GetMyTrips();
        }
    }, [user?.email]);

    const GetMyTrips = async () => {
        try {
            setLoading(true);
            setError(null);
            setUserTrips([]);
            
            const q = query(
                collection(db, 'UserTrips'),
                where('userEmail', '==', user?.email)
            );
            
            const querySnapshot = await getDocs(q);
            const trips = [];
            
            querySnapshot.forEach((doc) => {
                // Ensure tripData is properly stringified
                const data = doc.data();
                if (data.tripData && typeof data.tripData === 'object') {
                    data.tripData = JSON.stringify(data.tripData);
                }
                trips.push({ 
                    id: doc.id, 
                    ...data
                });
            });
            
            setUserTrips(trips);
        } catch (error) {
            console.error('Error fetching trips:', error);
            setError('Failed to load trips. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNewTrip = () => {
        // Using Expo Router for navigation
        router.push('/create-trip/search-place');
    };

    return (
        <ScrollView
            style={{
                padding: 25,
                paddingTop: 55,
                backgroundColor: Colors.WHITE,
                height: '100%',
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 35,
                    }}
                >
                    My Trips
                </Text>
                <TouchableOpacity
                    onPress={handleCreateNewTrip}
                    activeOpacity={0.7}
                    style={{
                        padding: 5,
                    }}
                >
                    <Ionicons 
                        name="add-circle" 
                        size={58} 
                        color={Colors.PRIMARY} 
                    />
                </TouchableOpacity>
            </View>

            {error && (
                <View style={{ marginTop: 20 }}>
                    <Text style={{ 
                        color: 'red', 
                        textAlign: 'center',
                        fontFamily: 'outfit-medium'
                    }}>
                        {error}
                    </Text>
                </View>
            )}

            {loading && (
                <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
                </View>
            )}

            {!loading && !error && (
                <>
                    {userTrips.length === 0 ? (
                        <StartNewTripCard onPress={handleCreateNewTrip} />
                    ) : (
                        <UserTripList 
                            userTrips={userTrips} 
                            onRefresh={GetMyTrips} 
                        />
                    )}
                </>
            )}
        </ScrollView>
    );
}