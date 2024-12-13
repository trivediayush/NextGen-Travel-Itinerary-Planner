import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
// import { Colors } from "./../../constants/Colors";
import moment from 'moment';
import Flightinfo from "../../components/TripDetails/Flightinfo";
import HotelList from "../../components/TripDetails/HotelList";
import PlannedTrip from "../../components/TripDetails/PlannedTrip";

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState([]);
    // const formatData = (data) => {
    //     return JSON.parse(data);
    // };
    const formatData = (data) => {
        try {
          return JSON.parse(data || '{}'); // Prevent errors from null or invalid JSON
        } catch (e) {
          console.error('Error parsing trip data:', e);
          return {}; // Fallback to empty object
        }
      };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        });

        setTripDetails(JSON.parse(trip));
    }, []);
    return (
        tripDetails && (
            <ScrollView>
                <Image
                    source={{
                        uri:
                            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
                            formatData(tripDetails.tripData).locationInfo?.photoRef +
                            "&key=AIzaSyDbnLrPvkLVeSBcoAZ0FuWt5Ql68io9yls",
                    }}
                    style={{
                        wwidth: "100%",
                        height: 330,
                    }}
                />
                <View
                    style={{
                        padding: 15,
                        backgroundColor: Colors.WHITE,
                        height: "100%",
                        marginTop: -30,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontFamily: "outfit-bold",
                        }}
                    >
                        {tripDetails?.travelPlan?.location}
                    </Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                        marginTop: 5
                    }}>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 14,
                                color: Colors.GRAY,
                            }}>
                            {moment(formatData(tripDetails.tripData).startDate).format("DD MMM YYYY")}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "outfit",
                                fontSize: 18,
                                color: Colors.GRAY,
                            }}>- {moment(formatData(tripDetails.tripData).endDate).format("DD MMM YYYY")}
                        </Text>
                    </View>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        color: Colors.GRAY
                    }}>🚌 {formatData(tripDetails.tripData)?.traveler?.title}</Text>

                    {/* FLight Info  */}
                    <Flightinfo flightData={tripDetails?.tripPlan?.flight} />
                    {/* Hotel Info  */}
                    <HotelList hotelList={tripDetails?.tripPlan?.hotels} />
                    {/* Trip Day Planner Info  */}
                    <PlannedTrip details={tripDetails?.tripPlan?.itinerary} />
                </View>



            </ScrollView>
        )
    );
}
