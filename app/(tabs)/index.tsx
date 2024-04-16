import { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import MarkerComponent from '@/components/ui/marker'
import { mock_up_public_housing } from '@/data/public-housing'
import { PublicHousingModel } from '@/model/public-housing'
import { convertCityName, getRatioByProvince } from '@/lib/utils'
import { initRegionLocation } from '@/data/inital-region'
import useRegion from '@/store/useRegion'

type convertCount = {
  count: number
  city: string
}

export default function TabOneScreen() {
  const [publicHousingData, setPublicHousingData] =
    useState<PublicHousingModel>(mock_up_public_housing)

  // const { data, error, isLoading, isPending } = usePublicHousingNotice()

  const region = useRegion((state) => state.region)
  const handleRegion = useRegion((state) => state.handleRegion)
  const handleMapRatio = useRegion((state) => state.handleMapRatio)
  useEffect(() => console.log(region), [region])

  const filteredPublicHousingData = useMemo(() => {
    if (publicHousingData && publicHousingData[1] && publicHousingData[1].dsList) {
      const convertHomeData = publicHousingData[1].dsList.reduce(
        (acc: convertCount[], cur) => {
          const curCity = convertCityName(cur.CNP_CD_NM)
          const findItem = acc.find((v) => v.city === curCity)
          if (findItem) {
            return acc.map((i) => (i.city === curCity ? { ...i, count: i.count + 1 } : i))
          } else {
            return acc.concat({ city: curCity, count: 1 })
          }
        },
        []
      )

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
  }, [publicHousingData])

  const handleSelectProvince = useCallback(
    (province: string, lat: number, lng: number) => {
      const ratio = getRatioByProvince(province)
      handleMapRatio(ratio, lat, lng)
    },
    []
  )

  // useEffect(() => console.log('result', data?.houseDetailData[0]?.[1].dsCtrtPlc), [data])

  return (
    <MapView
      provider='google'
      style={styles.map}
      region={region}
      onRegionChangeComplete={(region) => handleRegion(region)}
    >
      {filteredPublicHousingData.map((item) => (
        <MarkerComponent
          key={item.city}
          {...item}
          onSelectProvince={handleSelectProvince}
        />
      ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
