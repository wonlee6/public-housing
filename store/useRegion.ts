import { create } from 'zustand'
import { Region } from 'react-native-maps'
import { Dimensions } from 'react-native'

type State = {
  region: Region
}

type Action = {
  handleRegion: (region: Region) => void
  handleMapRatio: (ratio: number, lat: number, lng: number) => void
}

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

const useRegion = create<State & Action>()((set) => ({
  region: {
    latitude: 36,
    longitude: 127.8,
    latitudeDelta: 5.9, // 위도 범위
    longitudeDelta: 5.9 * ASPECT_RATIO // 경도 범위,
  },
  handleRegion: (region) => set(() => ({ region })),
  handleMapRatio: (ratio, lat: number, lng: number) =>
    set((state) => ({
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: state.region ? state.region.latitudeDelta * ratio : 1,
        longitudeDelta: state.region ? state.region.longitudeDelta * ratio : 1
      }
    }))
}))

export default useRegion
