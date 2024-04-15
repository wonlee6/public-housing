import { StyleSheet } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { useEffect } from 'react'

const address = 'http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1'
const serviceKey = encodeURIComponent(
  'bBK2bBnLbgwrwg0itzyfXAKjsyykQIsax93WkB9GMvVWkJtsGd5a+/nk19SC8n0gaCd/Y6P7iwBwmiQriEeWcQ=='
)
const pageSize = `${encodeURIComponent('PG_SZ')}=${encodeURIComponent('50')}`
const page = `${encodeURIComponent('PAGE')}=${encodeURIComponent('1')}`
const 공고중 = `${encodeURIComponent('PAN_SS')}=${encodeURIComponent('공고중')}`
const startDate = `${encodeURIComponent('PAN_ST_DT')}=${encodeURIComponent('20240401')}`
const url = `${address}?serviceKey=${serviceKey}&${pageSize}&${page}&${공고중}&${startDate}`

export default function TabOneScreen() {
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <EditScreenInfo path='app/(tabs)/index.tsx' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
