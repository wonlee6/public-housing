# 공공주택 앱

### 공공데이터 포털에서 한국주택토지공사(LH) API 이용한 프로젝트   


![test1](https://github.com/wonlee6/public-housing/assets/21251988/c2f2994e-04b6-4bc5-8bc3-95d50c3168f0)

- API를 가져온 후 각 지역에 맞게 필터링하여 보여준다. Ex) 서울 2, 경기: 3 ...
- Map 확대할 경우(범위에 따라) Marker를 보여준다.
> 주소를 토대로 위도와 경도를 얻은 위치에 Marker를 만든다.   
> Marker에는 심플한 주택 정보를 보여준다. (이름, 주택종류, 주택이름, 기간)
- 공고문 바로가기 버튼을 통해 실제 공고 Url로 이동한다.


![test2](https://github.com/wonlee6/public-housing/assets/21251988/495a4f3e-8e50-4c31-9e9c-383d22cdee8d)

- 지도가 아닌 리스트 형식으로 원하는 정보를 쉽게 볼 수 있다.

## 만드는데 사용한 라이브러리
- React Native (Expo)
- Tanstack-query
- Zustand
- Nativewind (tailwindcss)
- react-native-maps

## 사용된 API
1. [한국토지주택공사_분양임대공고문 조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15058530)
2. [한국토지주택공사_분양임대공고별 상세정보 조회 서비스](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15057999)

처음 필터링된 데이터는 1번 API를 활용하고, Marker를 만들기 위해 사용한 API는 2번
