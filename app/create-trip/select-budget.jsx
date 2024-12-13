import React, { useState, useEffect, useContext, useCallback, memo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from './../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard';
import { CreateTripContext } from './../../context/CreateTripContext';
import { Colors } from '../../constants/Colors';

// Memoized OptionCard wrapper for better performance
const MemoizedOptionCard = memo(OptionCard);

// Memoized option item component
const BudgetOption = memo(({ item, selectedOption, onSelect }) => (
  <TouchableOpacity
    style={styles.optionButton}
    onPress={() => onSelect(item)}
  >
    <MemoizedOptionCard option={item} selectedOption={selectedOption} />
  </TouchableOpacity>
));

export default function SelectBudget() {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Memoized header setup
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  // Memoized trip data update
  useEffect(() => {
    if (selectedOption) {
      setTripData(prevData => ({
        ...prevData,
        budget: selectedOption.title,
      }));
    }
  }, [selectedOption, setTripData]);

  // Memoized handlers
  const handleOptionSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleContinue = useCallback(() => {
    if (!selectedOption) {
      ToastAndroid.show('Select Your Budget', ToastAndroid.LONG);
      return;
    }
    router.push('/create-trip/review-trip'); // Update with your actual route
  }, [selectedOption, router]);

  // Memoized render item function
  const renderItem = useCallback(({ item }) => (
    <BudgetOption
      item={item}
      selectedOption={selectedOption}
      onSelect={handleOptionSelect}
    />
  ), [selectedOption, handleOptionSelect]);

  // Memoized key extractor
  const keyExtractor = useCallback((item) => `budget-option-${item.id}`, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titleText}>
          Budget
        </Text>
        <View style={styles.optionsContainer}>
          <Text style={styles.subtitleText}>
            Choose Spending habits for your trip
          </Text>
          <FlatList
            data={SelectBudgetOptions}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flex: 1,
    paddingTop: 75,
    paddingHorizontal: 25,
  },
  titleText: {
    fontFamily: 'outfit-bold',
    fontSize: 35,
    marginTop: 20,
  },
  optionsContainer: {
    marginTop: 20,
    flex: 1,
  },
  subtitleText: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  optionButton: {
    marginVertical: 10,
  },
  continueButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginVertical: 20,
  },
  continueButtonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 20,
  },
});