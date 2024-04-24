import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/react/shallow'

import { View } from '@/components/Themed'
import useLHPublicHouse from '@/store/useLHPublicHouse'
import NoticeList from '@/components/notice-list/notice-list'

export default function TabTwoScreen() {
  const publicHouse = useLHPublicHouse(useShallow((state) => state.publicHouse))

  return (
    <SafeAreaView className='flex-auto' edges={{ bottom: 'off' }}>
      <View className='flex-1 bg-zinc-100 p-2'>
        <FlatList
          data={publicHouse}
          renderItem={(itemData) => <NoticeList {...itemData.item} />}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  )
}
