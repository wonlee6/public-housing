import { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import { convertCityName } from '@/lib/utils'
import { initRegionLocation } from '@/data/inital-region'
import useRegion from '@/store/useRegion'
import InitMarker from '@/components/map/InitMarker'
import DetailMarker from '@/components/map/DetailMarker'
import usePublicHousingNotice from '@/hooks/usePublicHousingNoti'

type ConvertCount = {
  count: number
  city: string
}

export default function TabOneScreen() {
  // const [publicHousingData, setPublicHousingData] =
  //   useState<PublicHousingModel>(mock_up_public_housing)

  const { data, error, isLoading } = usePublicHousingNotice()

  if (error) {
    return null
  }

  const handleRegion = useRegion((state) => state.handleRegion)
  const region = useRegion((state) => state.region)

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

  return (
    <MapView
      provider='google'
      style={styles.map}
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
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
