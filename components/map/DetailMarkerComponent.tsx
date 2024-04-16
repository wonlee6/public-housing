import React from 'react'
import { Marker } from 'react-native-maps'

export default function DetailMarkerComponent(props: any) {
  console.log(props)
  return null

  return (
    <Marker
      key={props.city}
      coordinate={{
        latitude: props.lat,
        longitude: props.lng
      }}
    >
      {/* <View className='w-[60] shadow-md rounded-sm'>
      <View className='bg-indigo-900 w-full rounded-sm'>
        <Text className='text-yellow-50 text-center p-1'>{props.city}</Text>
      </View>
      <Text className='text-center'>{props.count}</Text>
    </View> */}
    </Marker>
  )
}
