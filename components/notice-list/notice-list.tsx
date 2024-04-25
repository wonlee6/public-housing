import React, { useId, useState } from 'react'
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { FontAwesome6 } from '@expo/vector-icons'

import { NoticeListModel } from '@/store/useLHPublicHouse'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { PublicHousing } from '@/model/public-housing'
import { Button } from '../ui/button'

const titleColor = {
  행복주택: '#7828C8',
  공공임대: '#2A7E3B',
  영구임대: '#CC4E00',
  분양주택: '#D13415',
  국민임대: '#0D74CE',
  매입임대: '#585958'
} as const
type Color = keyof typeof titleColor

const NoticeListItem = React.memo((props: PublicHousing & { isLast: boolean }) => {
  const { AIS_TP_CD_NM, PAN_NT_ST_DT, CLSG_DT, PAN_NM, DTL_URL, isLast } = props
  const color = titleColor[AIS_TP_CD_NM as Color]

  return (
    <View className={`${isLast ? '' : 'mb-3'}`}>
      <CardContent className='flex-col'>
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center justify-between'>
            <View className='rounded-full bg-neutral-100 p-1'>
              <Text className='font-bold text-cyan-500'>LH</Text>
            </View>
            <View className={`ml-2 rounded-full bg-[${color}] px-2 py-1`}>
              <Text className='font-bold text-white'>{AIS_TP_CD_NM}</Text>
            </View>
          </View>
          <View>
            <Text className='text-muted-foreground text-sm'>
              {`접수기간 : ${PAN_NT_ST_DT} ~ ${CLSG_DT}`}
            </Text>
          </View>
        </View>
        <CardDescription className='mt-2'>{PAN_NM}</CardDescription>
      </CardContent>
      <CardFooter className={`justify-end ${isLast ? '' : 'border-b border-zinc-300'}`}>
        <Button
          label='모집 공고문 보러가기'
          labelClasses='text-white'
          size={'sm'}
          onPress={(e) => {
            if (Platform.OS !== 'web') {
              e.preventDefault()
              WebBrowser.openBrowserAsync(DTL_URL as string)
            }
          }}
        />
      </CardFooter>
    </View>
  )
})

const NoticeList = React.memo((props: NoticeListModel) => {
  const { name, count, city, children } = props

  const [state, setState] = useState(false)

  const id = useId()

  const lastLength = children?.length

  return (
    <Card className='mb-2 border-gray-100 bg-white'>
      <CardHeader className='flex-row items-center justify-between'>
        <CardTitle>{`${name} - ${count}`}</CardTitle>
        <TouchableOpacity onPress={() => setState(!state)}>
          <View className='rounded-full bg-slate-100 p-2'>
            <FontAwesome6 name='add' size={24} color='black' />
          </View>
        </TouchableOpacity>
      </CardHeader>
      <View className='rounded-xl bg-white' style={{ display: state ? 'flex' : 'none' }}>
        <FlatList
          data={children}
          renderItem={(itemData) => (
            <NoticeListItem
              {...itemData.item}
              isLast={lastLength === itemData.index + 1 ? true : false}
            />
          )}
          keyExtractor={(item) => `${item.PAN_ID}-${id}`}
        />
      </View>
    </Card>
  )
})

export default NoticeList
