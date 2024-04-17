import React, { useCallback } from 'react'
import { Marker } from 'react-native-maps'
import { Text, View } from 'react-native'
import { getRatioByProvince } from '@/lib/utils'
import useRegion from '@/store/useRegion'

type MarkerModel = {
  count: number
  lat: number
  lng: number
  city: string
}

type InitMarker = {
  markerList: MarkerModel[]
}

export default function InitMarker({ markerList }: InitMarker) {
  const handleMapRatio = useRegion((state) => state.handleMapRatio)

  const handleSelectProvince = useCallback(
    (province: string, lat: number, lng: number) => {
      const ratio = getRatioByProvince(province)
      handleMapRatio(ratio, lat, lng)
    },
    []
  )

  return (
    <>
      {markerList.map((item) => (
        <MarkerComponent
          key={item.city}
          {...item}
          onSelectProvince={handleSelectProvince}
        />
      ))}
    </>
  )
}

const MarkerComponent = React.memo(
  ({
    city,
    count,
    lat,
    lng,
    onSelectProvince
  }: MarkerModel & {
    onSelectProvince: (province: string, lat: number, lng: number) => void
  }) => {
    return (
      <Marker
        coordinate={{
          latitude: lat,
          longitude: lng
        }}
        onPress={() => onSelectProvince(city, lat, lng)}
      >
        <View className='w-[60] shadow-md rounded-sm'>
          <View className='bg-indigo-900 w-full rounded-sm'>
            <Text className='text-yellow-50 text-center p-1'>{city}</Text>
          </View>
          <Text className='bg-white text-center'>{count}</Text>
        </View>
      </Marker>
    )
  }
)
