import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome6 } from '@expo/vector-icons'
import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useState } from 'react'

const titleColor = {
  행복주택: '#7828C8',
  공공임대: '#2A7E3B',
  영구임대: '#CC4E00',
  분양주택: '#D13415',
  국민임대: '#0D74CE'
} as const
type Color = keyof typeof titleColor

export default function TabTwoScreen() {
  const [state, setState] = useState(false)

  return (
    <SafeAreaView className='flex-auto' edges={{ bottom: 'off' }}>
      <View className='flex-1 gap-4 bg-zinc-100 p-2'>
        <Card className='border-gray-100 bg-white'>
          <CardHeader className='flex-row items-center justify-between'>
            <CardTitle>서울특별시 - 0</CardTitle>
            <TouchableOpacity onPress={() => setState(!state)}>
              <View className='rounded-full bg-slate-100 p-2'>
                <FontAwesome6 name='add' size={24} color='black' />
              </View>
            </TouchableOpacity>
          </CardHeader>
          <View className='bg-white' style={{ display: state ? 'flex' : 'none' }}>
            <CardContent className='flex-col'>
              <View className='w-1/3 flex-row items-center'>
                <View className='rounded-full bg-neutral-100 p-1'>
                  <Text className='font-bold text-cyan-500'>LH</Text>
                </View>
                <View className='ml-2 rounded-full bg-[#7828C8] px-2 py-1'>
                  <Text className='font-bold text-white'>행복주택</Text>
                </View>
              </View>
              <View className='pt-2'>
                <Text className='text-base'>천호역 효성해링턴타워</Text>
              </View>
            </CardContent>
            <CardFooter>
              <Text className='text-muted-foreground text-sm'>
                접수기간 : 2024.04.15 ~ 2024.04.30
              </Text>
            </CardFooter>
          </View>
        </Card>
      </View>
    </SafeAreaView>
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
