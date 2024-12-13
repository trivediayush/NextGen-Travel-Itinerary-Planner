export const GetPhotoRef = async (placeName) => {
    if (!placeName) {
        throw new Error("Place name is required.");
    }

    try {
        const apiKey = 'AIzaSyDbnLrPvkLVeSBcoAZ0FuWt5Ql68io9yls'; // Replace with your actual Google API key
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
            placeName
        )}&inputtype=textquery&fields=photos&key=${apiKey}`;

        const resp = await fetch(url);

        if (!resp.ok) {
            throw new Error(`Failed to fetch data: ${resp.status} ${resp.statusText}`);
        }

        const result = await resp.json();

        // Check if a photo reference is available
        if (
            result.candidates &&
            result.candidates[0] &&
            result.candidates[0].photos &&
            result.candidates[0].photos[0]
        ) {
            return result.candidates[0].photos[0].photo_reference;
        } else {
            console.warn("No photo reference found for place:", placeName);
            return null;
        }
    } catch (error) {
        console.error("Error in GetPhotoRef:", error);
        throw error;
    }
};
