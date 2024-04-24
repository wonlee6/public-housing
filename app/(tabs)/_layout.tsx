import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarMapIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true)
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '지도',
          tabBarIcon: ({ color }) => <TabBarMapIcon name='map' color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: '공고목록',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='file-document-outline'
              color={color}
              size={24}
              style={{ marginBottom: -3 }}
            />
          )
        }}
      />
      <Tabs.Screen
        name='three'
        options={{
          title: 'QnA',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='comment-search-outline'
              color={color}
              size={24}
              style={{ marginBottom: -3 }}
            />
          )
        }}
      />
    </Tabs>
  )
}
