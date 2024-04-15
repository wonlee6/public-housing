import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import MarkerComponent from '@/components/ui/marker'
import { mock_up_public_housing } from '@/data/public-housing'
import { PublicHousing, PublicHousingModel } from '@/model/public-housing'
import { getCoordinateByAddress } from '@/lib/utils'

const address = 'http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1'
const serviceKey = encodeURIComponent(process.env.EXPO_PUBLIC_API_KEY!)
const pageSize = `${encodeURIComponent('PG_SZ')}=${encodeURIComponent('50')}`
const page = `${encodeURIComponent('PAGE')}=${encodeURIComponent('1')}`
const 공고중 = `${encodeURIComponent('PAN_SS')}=${encodeURIComponent('공고중')}`
const startDate = `${encodeURIComponent('PAN_ST_DT')}=${encodeURIComponent('20240401')}`
const url = `${address}?serviceKey=${serviceKey}&${pageSize}&${page}&${공고중}&${startDate}`

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

type convertCount = {
  count: number
  city: string
}

// const address = "http://apis.data.go.kr/B552555/lhLeaseNoticeDtlInfo1/getLeaseNoticeDtlInfo1";
// const serviceKey = encodeURIComponent(
//     "bBK2bBnLbgwrwg0itzyfXAKjsyykQIsax93WkB9GMvVWkJtsGd5a+/nk19SC8n0gaCd/Y6P7iwBwmiQriEeWcQ=="
// );
// const pageSize = `${encodeURIComponent("SPL_INF_TP_CD")}=${encodeURIComponent("050")}`;
// const page = `${encodeURIComponent("CCR_CNNT_SYS_DS_CD")}=${encodeURIComponent("02")}`;
// const 공고중 = `${encodeURIComponent("PAN_ID")}=${encodeURIComponent("0000060620")}`;
// const startDate = `${encodeURIComponent("UPP_AIS_TP_CD")}=${encodeURIComponent("05")}`;
// // const startDate2 = `${encodeURIComponent("AIS_TP_CD")}=${encodeURIComponent("01")}`;
// const url = `${address}?serviceKey=${serviceKey}&${pageSize}&${page}&${공고중}&${startDate}`;

export default function TabOneScreen() {
  const [publicHousingData, setPublicHousingData] = useState<PublicHousingModel | null>(
    null
  )

  useEffect(() => {
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setPublicHousingData(data))
  }, [])

  useLayoutEffect(() => {
    setPublicHousingData(mock_up_public_housing)
  }, [])

  // AIS_TP_CD_NM, CNP_CD_NM
  const filteredPublicHousing = useMemo(() => {
    if (!publicHousingData) return []
    // console.log(publicHousingData[0].dsList[0])
    return publicHousingData[0].dsList.reduce(
      (acc: convertCount[], cur: PublicHousing) => {
        const findItem = acc.find((v) => v.city === cur.CNP_CD_NM)
        if (findItem) {
          return acc.map((i) =>
            i.city === cur.CNP_CD_NM ? { ...i, count: i.count + 1 } : i
          )
        }
        return [...acc, { city: cur.CNP_CD_NM, count: 1 }]
      },
      []
    )
  }, [publicHousingData])

  const handleGetCoordinate = async () => {
    // const aw = await getCoordinateByAddress()
  }
  useEffect(() => {
    console.log(filteredPublicHousing)
    if (filteredPublicHousing.length > 0) {
    }
  }, [filteredPublicHousing])

  return (
    <View style={styles.container}>
      <MapView
        provider='google'
        style={styles.map}
        initialRegion={{
          latitude: 36,
          longitude: 127.8,
          latitudeDelta: 5.9, // 위도 범위
          longitudeDelta: 5.9 * ASPECT_RATIO // 경도 범위,
        }}
      >
        {/* {filteredPublicHousing.map((item: PublicHousingModel) => (
          <MarkerComponent {...item} />
        ))} */}
      </MapView>
      {/* <EditScreenInfo path='app/(tabs)/index.tsx' /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  }
})
