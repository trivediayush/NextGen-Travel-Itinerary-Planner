const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = 'AIzaSyBNk7k8fgWXLfpCnn_lUWnDplusSv3dZmw';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : New York, NY, USA, for 3 Days and 2 Night for A Couple with a Moderate budget with a Flight details , Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, Hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days and 2 night with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot provide real-time flight and hotel pricing or booking URLs, as these change constantly.  I also cannot access and display images directly.  This JSON provides a framework; you'll need to use flight comparison websites (e.g., Kayak, Expedia, Google Flights) and hotel booking sites (e.g., Booking.com, Expedia, Hotels.com) to find current pricing and book.\n\n```json\n{\n  \"tripDetails\": {\n    \"location\": \"New York, NY, USA\",\n    \"duration\": \"3 Days, 2 Nights\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Moderate\"\n  },\n  \"flights\": [\n    {\n      \"airline\": \"Placeholder Airline\", \n      \"flightNumber\": \"Placeholder Flight Number\",\n      \"departure\": \"Your Departure City\",\n      \"arrival\": \"New York (JFK/LGA/EWR)\",\n      \"departureDate\": \"YYYY-MM-DD\",\n      \"returnDate\": \"YYYY-MM-DD\",\n      \"price\": \"$$$\", \n      \"bookingUrl\": \"Your Booking URL (replace with actual)\" \n    }\n  ],\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"address\": \"123 Example Street, New York, NY 10001\",\n      \"price\": \"$$$ per night\",\n      \"imageUrl\": \"Replace with image URL\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7128,\n        \"longitude\": -74.0060\n      },\n      \"rating\": 4.0,\n      \"description\": \"A centrally located hotel with comfortable rooms.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"Times Square\",\n          \"placeDetails\": \"Iconic intersection with bright lights and Broadway shows.\",\n          \"imageUrl\": \"Replace with image URL\",\n          \"geoCoordinates\": {\n            \"latitude\": 40.7580,\n            \"longitude\": -73.9855\n          },\n          \"ticketPricing\": \"N/A\",\n          \"travelTime\": \"15 mins (by subway)\"\n        }\n      ]\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"address\": \"456 Another Street, New York, NY 10002\",\n      \"price\": \"$$$ per night\",\n      \"imageUrl\": \"Replace with image URL\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7128,\n        \"longitude\": -74.0060\n      },\n      \"rating\": 4.5,\n      \"description\": \"Boutique hotel in a trendy neighborhood.\",\n      \"nearbyPlaces\":[\n        {\n          \"placeName\": \"Central Park\",\n          \"placeDetails\": \"Large urban park with walking paths, museums, and attractions\",\n          \"imageUrl\": \"Replace with image URL\",\n          \"geoCoordinates\": {\n            \"latitude\": 40.7829,\n            \"longitude\": -73.9654\n          },\n          \"ticketPricing\": \"N/A\",\n          \"travelTime\": \"30 mins (by subway)\"\n        }\n      ]\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"morning\": \"Arrive in NYC, check into hotel. Walk around Times Square.\",\n      \"afternoon\": \"Visit a Broadway show (book in advance).\",\n      \"evening\": \"Dinner near Times Square\"\n    },\n    \"day2\": {\n      \"morning\": \"Visit Central Park (walk, rent a bike, or take a horse-drawn carriage)\",\n      \"afternoon\": \"Visit the Metropolitan Museum of Art or the American Museum of Natural History.\",\n      \"evening\": \"Dinner in a different neighborhood (e.g., Greenwich Village or SoHo).\"\n    },\n    \"day3\": {\n      \"morning\": \"Explore a specific neighborhood (e.g., Greenwich Village, Chinatown, Little Italy).\",\n      \"afternoon\": \"Visit the Statue of Liberty and Ellis Island (Ferry required, book in advance).\",\n      \"evening\": \"Depart from NYC.\"\n    }\n  }\n}\n```\n\nRemember to replace the placeholder values with actual information you obtain from travel websites.  Consider adding more detail to your itinerary based on your interests (e.g., specific museums, restaurants, etc.).  Book flights and hotels well in advance, especially if traveling during peak season.\n"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
