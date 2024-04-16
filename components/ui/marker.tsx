import React from 'react'
import { Marker } from 'react-native-maps'
import { Text, View } from '../Themed'
import { PublicHousingDetailModel } from '@/model/public-housing'

type InitMarker = {
  count: number
  lat: number
  lng: number
  city: string
  onSelectProvince: (province: string, lat: number, lng: number) => void
}

type DetailMarker = PublicHousingDetailModel & {
  onSelectProvince: (province: string, lat: number, lng: number) => void
}

const MarkerComponent = (props: InitMarker | DetailMarker) => {
  if ('city' in props) {
    return (
      <Marker
        key={props.city}
        coordinate={{
          latitude: props.lat,
          longitude: props.lng
        }}
        onPress={() => props.onSelectProvince(props.city, props.lat, props.lng)}
      >
        <View className='w-[60] shadow-md rounded-sm'>
          <View className='bg-indigo-900 w-full rounded-sm'>
            <Text className='text-yellow-50 text-center p-1'>{props.city}</Text>
          </View>
          <Text className='text-center'>{props.count}</Text>
        </View>
      </Marker>
    )
  }

  console.log(props[0])
  return null
}

export default React.memo(MarkerComponent)
