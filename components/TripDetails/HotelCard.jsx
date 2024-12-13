
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({ item }) {
    console.log('HotelCard item:', item); // Debugging log
    console.log('Hotel Name:', item?.hotelName); // Check hotelName specifically

    const [photoRef, setPhotoRef] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchGooglePhotoRef = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!item?.hotelName) {
                    throw new Error('Hotel name is required');
                }

                console.log('Fetching photo reference for hotel:', item.hotelName);

                const result = await GetPhotoRef(item.hotelName);

                if (isMounted) {
                    if (!result) {
                        console.warn('No photo reference found for:', item.hotelName);
                        throw new Error('No photo reference found');
                    }
                    setPhotoRef(result);
                }
            } catch (err) {
                if (isMounted) {
                    console.error('Error fetching photo reference:', err);
                    setError(err.message || 'An error occurred');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchGooglePhotoRef();

        return () => {
            isMounted = false;
        };
    }, [item?.hotelName]);

    if (!item) {
        console.error('No item provided to HotelCard.');
        return null;
    }

    const redirectToBookingPage = () => {
        const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(
            item?.hotelName
        )}`;
        Linking.openURL(bookingUrl).catch(err =>
            console.error('Failed to open Booking.com URL:', err)
        );
    };

    const cardStyle = {
        marginRight: 20,
        width: 180,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    };

    const imageStyle = {
        width: 180,
        height: 120,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    };

    const renderImage = () => {
        if (isLoading) {
            return (
                <View
                    style={[
                        imageStyle,
                        {
                            backgroundColor: '#f0f0f0',
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    ]}
                >
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            );
        }

        if (error || !photoRef) {
            console.warn('Using fallback image for:', item.hotelName);
            return (
                <Image
                    source={require('../../assets/images/1.jpg')}
                    style={imageStyle}
                />
            );
        }

        return (
            <Image
                source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=AIzaSyDbnLrPvkLVeSBcoAZ0FuWt5Ql68io9yls`,
                }}
                style={imageStyle}
                onError={() => setError('Failed to load image')}
            />
        );
    };

    return (
        <View style={cardStyle}>
            {renderImage()}
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={redirectToBookingPage}>
                    <Text
                        style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 16,
                            marginBottom: 5,
                            color: '#000', // Keep original text color
                        }}
                    >
                        {item?.hotelName || 'Hotel name not available'}
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontFamily: 'outfit' }}>
                        ⭐ {item?.rating || 'N/A'}
                    </Text>
                    {/* <Text style={{ fontFamily: 'outfit' }}>
                        💵 {item?.price || 'N/A'}
                    </Text> */}
                </View>
            </View>
        </View>
    );
}


