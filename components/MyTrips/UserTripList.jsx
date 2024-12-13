import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import moment from 'moment';
import { useRouter } from 'expo-router';

// Define color constants or import them
const Colors = {
    GRAY: '#888',
    PRIMARY: '#1E90FF',
    WHITE: '#FFF',
};

export default function UserTripList({ userTrips = [] }) {
    const router = useRouter();

    // Guard clause for empty or invalid userTrips
    if (!userTrips || userTrips.length === 0) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>
                    No trips available
                </Text>
            </View>
        );
    }

    // Render a single trip item
    const renderTripItem = ({ item }) => {
        // Safely parse tripData
        const tripData = (() => {
            try {
                return item.tripData ? JSON.parse(item.tripData) : {};
            } catch (e) {
                console.error("Failed to parse tripData:", e);
                return {};
            }
        })();

        return (
            <View style={{ marginBottom: 20 }}>
                {/* Trip Image */}
                <Image
                    source={
                        tripData?.locationInfo?.photoRef
                            ? {
                                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo.photoRef}&key=AIzaSyDbnLrPvkLVeSBcoAZ0FuWt5Ql68io9yls`,
                              }
                            : require('./../../assets/images/2.jpg')
                    }
                    style={{
                        width: '100%',
                        height: 240,
                        borderRadius: 15,
                        resizeMode: 'cover',
                    }}
                />

                {/* Trip Details */}
                <View style={{ marginTop: 10 }}>
                    {/* Location Name */}
                    <Text
                        style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 24,
                        }}
                    >
                        {tripData?.locationInfo?.name || 'Unknown Location'}
                    </Text>

                    {/* Start Date and Traveler Info */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'outfit',
                                fontSize: 17,
                                color: Colors.GRAY,
                            }}
                        >
                            {tripData.startDate
                                ? moment(tripData.startDate).format('DD MMM YYYY')
                                : 'Date not set'}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'outfit',
                                fontSize: 17,
                                color: Colors.GRAY,
                            }}
                        >
                            🚌 {tripData.traveler?.title || 'Not specified'}
                        </Text>
                    </View>

                    {/* "See Your Plan" Button */}
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/trip-details',
                                params: { trip: JSON.stringify(item) },
                            })
                        }
                        style={{
                            backgroundColor: Colors.PRIMARY,
                            padding: 15,
                            borderRadius: 15,
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: Colors.WHITE,
                                fontSize: 15,
                                fontFamily: 'outfit-medium',
                                textAlign: 'center',
                            }}
                        >
                            See your plan
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={userTrips}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTripItem}
            contentContainerStyle={{ padding: 20 }}
        />
    );
}
