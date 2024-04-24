import { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import MapView, { MapPressEvent } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { convertCityName } from '@/lib/utils'
import { initRegionLocation } from '@/data/inital-region'
import useRegion from '@/store/useRegion'
import InitMarker from '@/components/map/InitMarker'
import usePublicHousingNotice from '@/hooks/usePublicHousingNoti'
import useSelectHouse from '@/store/useSelectHouse'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from '@/components/Themed'
import { ExternalLink } from '@/components/ExternalLink'
import DetailM from '@/components/map/DetailM'

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
    if (data && data[1]?.dsList && data[1]?.dsList?.length > 0) {
      const filterData = data[1].dsList.filter((i) => invalidType(i.SPL_INF_TP_CD))
      const convertHomeData = filterData.reduce((acc: ConvertCount[], cur) => {
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
  }, [data])

  useEffect(() => {
    if (region.latitudeDelta < 2) {
      setIsRatio(true)
      return
    }
    setIsRatio(false)
  }, [region])

  const handlePressMap = useCallback((event: MapPressEvent) => {
    const action = event.nativeEvent.action
    if (typeof action === 'undefined') {
      handleClearHouse()
    }
  }, [])

  const filteredHouseData = useMemo(() => {
    if (!data) return []
    return data[1].dsList?.filter((i) => invalidType(i.SPL_INF_TP_CD)) ?? []
  }, [data])

  const filteredSelectedHouse = useMemo(() => {
    if (!selectedHouse || !data) return null

    return data[1].dsList?.find((i) => i.PAN_ID === selectedHouse)
  }, [selectedHouse, data])

  if (error) {
    return null
  }

  return (
    <SafeAreaView className='relative flex-1'>
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
          <DetailM publicHousingData={filteredHouseData} />
        )}
      </MapView>
      {filteredSelectedHouse ? (
        <View className='absolute bottom-0 h-[70px] w-full flex-row items-center justify-center bg-white/60 p-1 backdrop-blur-md'>
          <View className='w-1/3 flex-row items-center justify-center border-r border-r-slate-400 bg-transparent p-1 '>
            <View className='rounded-full bg-neutral-100 p-1'>
              <Text className='font-bold text-cyan-500'>LH</Text>
            </View>
            <View className='ml-1 rounded-lg bg-[#7828C8] px-2 py-1'>
              <Text className='font-semibold text-white'>
                {filteredSelectedHouse.AIS_TP_CD_NM}
              </Text>
            </View>
          </View>
          <View className='w-2/3 flex-col items-center justify-center bg-transparent p-1'>
            <View className='items-center justify-center rounded-lg bg-primary px-3 py-1 shadow-lg'>
              <ExternalLink
                disabled={!filteredSelectedHouse}
                href={filteredSelectedHouse.DTL_URL}
              >
                <View className='flex-row items-center justify-center bg-transparent pt-1'>
                  <MaterialCommunityIcons
                    name='home-import-outline'
                    style={{ fontSize: 20, color: 'white' }}
                  />
                  <Text className='ml-1 font-bold text-white '>모집 공고문 보러가기</Text>
                </View>
              </ExternalLink>
            </View>
            <View className='mt-1 bg-transparent'>
              <Text>{`기간 : ${filteredSelectedHouse.PAN_NT_ST_DT} ~ ${filteredSelectedHouse.CLSG_DT}`}</Text>
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

function invalidType(SPL_INF_TP_CD: string) {
  switch (SPL_INF_TP_CD) {
    case '050': // 분양주택
    case '051': // 분양주택-전환
    case '060': // 공공임대
    case '061': // 임대주택
    case '062': // 영구임대
    case '063': // 행복주택
    case '131': // 청년매입임대
    case '132': // 신혼부부매입임대
    case '133': // 집주인리모델링
    case '135': // 다가구매입임대
    case '136': // 장기미임대
    case '390': // 신혼희망타운
    case '1315': // 청년매입임대수시
    case '1325': // 신혼부부매입임대수시
      return true
    default:
      return false
  }
}
