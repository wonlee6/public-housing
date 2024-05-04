import { create } from 'zustand'
import { LatLng, Region } from 'react-native-maps'
import { Dimensions } from 'react-native'

type State = {
  region: Region
}

type Action = {
  handleRegion: (region: Region) => void
  handleMapRatio: (provinceInfo: LatLng & { ratio: number }) => void
  handleSelectMarker: (latLng: LatLng) => void
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
  handleMapRatio: (provinceInfo) =>
    set(() => ({
      region: {
        latitude: provinceInfo.latitude,
        longitude: provinceInfo.longitude,
        latitudeDelta: provinceInfo.ratio,
        longitudeDelta: provinceInfo.ratio
      }
    })),
    handleSelectMarker: (latLng) => 
      set((state) => ({
        region: {
          latitude: latLng.latitude,
          longitude: latLng.longitude, 
          latitudeDelta: state.region.latitudeDelta, 
          longitudeDelta: state.region.longitudeDelta
        }
      }))
}))

export default useRegion
