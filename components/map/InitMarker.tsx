import React, { useCallback } from 'react'
import { Marker } from 'react-native-maps'
import { Text, View } from 'react-native'
import { getMapInfoByProvince } from '@/lib/utils'
import useRegion from '@/store/useRegion'

type MarkerModel = {
  count: number
  lat: number
  lng: number
  city: string
  name: string
}

type InitMarker = {
  markerList: MarkerModel[]
  isRatio: boolean
}

export default function InitMarker({ markerList, isRatio }: InitMarker) {
  const handleMapRatio = useRegion((state) => state.handleMapRatio)

  const handleSelectProvince = useCallback((province: string) => {
    const provinceInfo = getMapInfoByProvince(province)
    handleMapRatio(provinceInfo)
  }, [])

  return (
    <>
      {markerList.map((item) => (
        <MarkerComponent
          key={item.city}
          {...item}
          onSelectProvince={handleSelectProvince}
          isRatio={isRatio}
        />
      ))}
    </>
  )
}

const MarkerComponent = React.memo(
  (
    props: MarkerModel & {
      onSelectProvince: (province: string) => void
      isRatio: boolean
    }
  ) => {
    const { city, name, count, lat, lng, isRatio, onSelectProvince } = props
    return (
      <>
        {isRatio ? null : (
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng
            }}
            onPress={() => onSelectProvince(name)}
          >
            <View className='w-[60] rounded-sm shadow-md'>
              <View className='w-full rounded-sm bg-indigo-900'>
                <Text className='p-1 text-center text-yellow-50'>{name}</Text>
              </View>
              <Text className='bg-white text-center'>{count}</Text>
            </View>
          </Marker>
        )}
      </>
    )
  }
)
