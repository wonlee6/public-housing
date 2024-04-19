import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'

import { convertCityName } from '@/lib/utils'
import { initRegionLocation } from '@/data/inital-region'
import useRegion from '@/store/useRegion'
import InitMarker from '@/components/map/InitMarker'
import DetailMarker from '@/components/map/DetailMarker'
import usePublicHousingNotice from '@/hooks/usePublicHousingNoti'
import useSelectHouse from '@/store/useSelectHouse'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from '@/components/Themed'

type ConvertCount = {
  count: number
  city: string
}

export default function TabOneScreen() {
  const { data, error, isLoading } = usePublicHousingNotice()

  const handleRegion = useRegion((state) => state.handleRegion)
  const region = useRegion((state) => state.region)

  const selectedHouse = useSelectHouse((state) => state.selectedHouse)

  const [isRatio, setIsRatio] = useState(false)

  const filteredPublicHousingData = useMemo(() => {
    if (!isRatio && data && data[1]?.dsList && data[1]?.dsList?.length > 0) {
      const convertHomeData = data[1].dsList.reduce((acc: ConvertCount[], cur) => {
        const curCity = convertCityName(cur.CNP_CD_NM)
        const findItem = acc.find((v) => v.city === curCity)
        if (findItem) {
          return acc.map((i) => (i.city === curCity ? { ...i, count: i.count + 1 } : i))
        } else {
          return acc.concat({ city: curCity, count: 1 })
        }
      }, [])

      return initRegionLocation.map((item) => {
        const findItem = convertHomeData.find((i) => i.city === item.city)
        if (findItem) {
          return {
            ...item,
            count: findItem.count
          }
        }
        return {
          ...item,
          count: 0
        }
      })
    }
    return []
  }, [data, isRatio])

  useEffect(() => {
    if (region.latitudeDelta < 2) {
      setIsRatio(true)
      return
    }
    setIsRatio(false)
  }, [region])

  if (error) {
    return null
  }

  useEffect(() => console.log(selectedHouse), [selectedHouse])

  return (
    <SafeAreaView className='h-full flex-col' edges={{ bottom: 'off', top: 'additive' }}>
      {isLoading ? <ActivityIndicator size={'large'} /> : null}
      <MapView
        provider='google'
        // style={styles.map}
        className={selectedHouse ? 'h-3/4' : 'h-full'}
        region={region}
        onRegionChangeComplete={(region, details) => {
          if (details.isGesture) {
            handleRegion(region)
          }
        }}
      >
        {!isRatio || isLoading ? (
          <InitMarker markerList={filteredPublicHousingData} />
        ) : (
          <DetailMarker publicHousingData={data} />
        )}
      </MapView>
      {selectedHouse ? (
        <View className='h-1/4 p-4 items-center justify-center border border-red-500'>
          <View className='flex-row items-center justify-evenly w-3/4'>
            <TouchableOpacity
              className='p-4 bg-primary rounded-md shadow-md'
              onPress={() => {}}
            >
              <Text className='text-white font-bold'>모집 공고</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='p-4 bg-secondary rounded-md shadow-md'
              onPress={() => {}}
            >
              <Text className='text-white font-bold'>청약 센터</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    backgroundColor: '#006FEE'
  }
})
