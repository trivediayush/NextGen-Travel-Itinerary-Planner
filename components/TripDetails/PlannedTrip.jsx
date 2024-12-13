import { View, Text } from 'react-native';
import React from 'react';
import { Colors } from "@/constants/Colors";

export default function PlannedTrip({ details }) {
    console.log("PlannedTrip details: ", details);

    if (!details || Object.keys(details).length === 0) {
        return (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>No trip plan available!</Text>
            </View>
        );
    }

    // Sort the days to ensure consistent order
    const sortedDays = Object.keys(details).sort((a, b) => {
        // Custom sorting logic (e.g., "Day 1", "Day 2", ...)
        const dayNumberA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
        const dayNumberB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
        return dayNumberA - dayNumberB;
    });

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold'
            }}>🏕️ Plan Details</Text>

            {sortedDays.map((day) => {
                const dayDetails = details[day];
                return (
                    <View key={day} style={{ marginTop: 15, marginBottom: 15 }}>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18,
                            marginBottom: 10,
                            color: Colors.GRAY
                        }}>
                            {day.toUpperCase()}
                        </Text>

                        {dayDetails.morning && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>Morning:</Text>
                                <Text style={{ fontFamily: 'outfit', fontSize: 14 }}>{dayDetails.morning}</Text>
                            </View>
                        )}

                        {dayDetails.afternoon && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>Afternoon:</Text>
                                <Text style={{ fontFamily: 'outfit', fontSize: 14 }}>{dayDetails.afternoon}</Text>
                            </View>
                        )}

                        {dayDetails.evening && (
                            <View style={{ marginBottom: 8 }}>
                                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>Evening:</Text>
                                <Text style={{ fontFamily: 'outfit', fontSize: 14 }}>{dayDetails.evening}</Text>
                            </View>
                        )}
                    </View>
                );
            })}
        </View>
    );
}