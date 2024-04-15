import { LatLng } from 'react-native-maps'

export const getCoordinateByAddress = async (address: string): Promise<LatLng> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=kr&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
  )
  const data = await response.json()
  const { lat, lng } = data.results[0].geometry.location
  return {
    latitude: lat,
    longitude: lng
  }
}
