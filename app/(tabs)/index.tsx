import { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import MapView, { MapPressEvent } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { convertCityName } from '@/lib/utils'
import { initRegionLocation } from '@/data/inital-region'
import useRegion from '@/store/useRegion'
import InitMarker from '@/components/map/InitMarker'
import DetailMarker from '@/components/map/DetailMarker'
import usePublicHousingNotice from '@/hooks/usePublicHousingNoti'
import useSelectHouse from '@/store/useSelectHouse'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from '@/components/Themed'
import { ExternalLink } from '@/components/ExternalLink'

type ConvertCount = {
  count: number
  city: string
}

export default function TabOneScreen() {
  const { data, error, isLoading } = usePublicHousingNotice()

  const region = useRegion((state) => state.region)
  const handleRegion = useRegion((state) => state.handleRegion)

  const selectedHouse = useSelectHouse((state) => state.selectedHouse)
  const handleClearHouse = useSelectHouse((state) => state.handleClearHouse)

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

  const filteredHouseURL = useMemo(() => {
    if (!selectedHouse || !data) return ''

    if (selectedHouse && data && data[1].dsList) {
      if (selectedHouse[0].dsSch) {
        const pan_id = selectedHouse[0].dsSch[0].PAN_ID
        const item = data[1].dsList.find((i) => i.PAN_ID === pan_id)
        return item?.DTL_URL
      }
    }
  }, [selectedHouse, data])

  const handlePressMap = useCallback((event: MapPressEvent) => {
    const action = event.nativeEvent.action
    if (typeof action === 'undefined') {
      handleClearHouse()
    }
  }, [])

  if (error) {
    return null
  }

  return (
    <SafeAreaView className='flex-1 relative'>
      {isLoading ? <ActivityIndicator size={'large'} /> : null}
      <MapView
        provider='google'
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region, details) => {
          if (details.isGesture) {
            handleRegion(region)
          }
        }}
        onPress={handlePressMap}
      >
        {!isRatio ? (
          <InitMarker markerList={filteredPublicHousingData} />
        ) : (
          <DetailMarker publicHousingData={data} />
        )}
      </MapView>
      {selectedHouse ? (
        <View className='h-[60px] w-full p-1 flex-row items-center justify-center backdrop-blur-md bg-white/60 absolute bottom-0'>
          <View className='w-1/3 p-1 flex-row justify-center items-center bg-transparent border-r border-r-slate-400 '>
            <View className='bg-cyan-950 rounded-full p-1'>
              <Text className='text-white'>LH</Text>
            </View>
            <View className='ml-1 bg-cyan-700 p-1'>
              <Text className='text-white'>공공분양</Text>
            </View>
          </View>
          <View className='w-2/3 p-1 items-center justify-center bg-transparent'>
            <View className='px-3 py-1 items-center justify-center bg-primary rounded-lg shadow-lg'>
              <ExternalLink disabled={!filteredHouseURL} href={filteredHouseURL!}>
                <View className='pt-1 flex-row items-center justify-center bg-transparent'>
                  <MaterialCommunityIcons
                    name='home-import-outline'
                    style={{ fontSize: 20, color: 'white' }}
                  />
                  <Text className='ml-1 text-white font-bold '>모집 공고문 보러가기</Text>
                </View>
              </ExternalLink>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
