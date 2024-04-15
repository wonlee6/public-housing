import React from 'react'
import { Marker } from 'react-native-maps'
import { Text, View } from '../Themed'
import { PublicHousing } from '@/model/public-housing'

export default function MarkerComponent({}: PublicHousing) {
  return (
    <Marker
      coordinate={{
        latitude: 123123,
        longitude: 123213
      }}
      // onPress={() => {
      //   handleRegion(city)
      //   onSelectRegion()
      // }}
    >
      <View>
        <View>{/* <Text >{city}</Text> */}</View>
        {/* <Text>{count}</Text> */}
      </View>
    </Marker>
  )
}
