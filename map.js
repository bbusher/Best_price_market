var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심좌표
    level: 9 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커를 표시할 위치와 title 객체 배열입니다
var positions = [
{
    title: '신창시장',
    latlng: new kakao.maps.LatLng(37.64166375, 127.0368074)
},
{
    title: '오목교중앙시장',
    latlng: new kakao.maps.LatLng(37.5162407, 126.8521196)
},
{
    title: '백학시장',
    latlng: new kakao.maps.LatLng(37.5636422, 127.0179968)
},
{
    title: '신중앙시장',
    latlng: new kakao.maps.LatLng(37.567408, 127.019775)
},
{
    title: '미성동도깨비시장',
    latlng: new kakao.maps.LatLng(37.4730961, 126.9282982)
},
{
    title: '가리봉시장',
    latlng: new kakao.maps.LatLng(37.4816974, 126.8896107)
},
{
    title: '장미원골목시장',
    latlng: new kakao.maps.LatLng(37.6214973, 127.0197188)
},
{
    title: '풍납시장',
    latlng: new kakao.maps.LatLng(37.53803, 127.1177)
},
{
    title: '새마을시장',
    latlng: new kakao.maps.LatLng(37.50912, 127.0849)
},
{
    title: '노룬산골목시장',
    latlng: new kakao.maps.LatLng(37.5364704, 127.0651649)
},
{
    title: '용문시장',
    latlng: new kakao.maps.LatLng(37.53611, 126.9602)
},
{
    title: '창신골목시장',
    latlng: new kakao.maps.LatLng(37.57595, 127.01313)
},
{
    title: '강남개포시장',
    latlng: new kakao.maps.LatLng(37.4893166, 127.0682304)
},
{
    title: '영동전통시장',
    latlng: new kakao.maps.LatLng(37.50995, 127.0237)
},
{
    title: '대명여울빛거리시장',
    latlng: new kakao.maps.LatLng(37.45406, 126.902)
},
{
    title: '은행나무시장',
    latlng: new kakao.maps.LatLng(37.45127, 126.9088)
},
{
    title: '자양골목시장',
    latlng: new kakao.maps.LatLng(37.5331937, 127.0800687)
},
{
    title: '동원시장',
    latlng: new kakao.maps.LatLng(37.58983, 127.0899)
},
{
    title: '장위전통시장',
    latlng: new kakao.maps.LatLng(37.61128, 127.051)
},
{
    title: '숭인시장',
    latlng: new kakao.maps.LatLng(37.636522, 127.0243777)
},
{
    title: '상계중앙시장',
    latlng: new kakao.maps.LatLng(37.65997, 127.0699)
},
{
    title: '대림시장',
    latlng: new kakao.maps.LatLng(37.586321, 126.9181293)
},
{
    title: '인왕시장',
    latlng: new kakao.maps.LatLng(37.591492, 126.9437898)
},
{
    title: '망원시장',
    latlng: new kakao.maps.LatLng(37.55728, 126.9059)
},
{
    title: '목동깨비시장(목3동시장)',
    latlng: new kakao.maps.LatLng(37.5482188, 126.8668398)
},
{
    title: '남구로시장',
    latlng: new kakao.maps.LatLng(37.4899178, 126.8880199)
},
{
    title: '남문시장',
    latlng: new kakao.maps.LatLng(37.43579, 126.9043)
},
{
    title: '비단길현대시장',
    latlng: new kakao.maps.LatLng(37.45984, 126.9043)
},
{
    title: '관악신사시장(신림4동)',
    latlng: new kakao.maps.LatLng(37.4730961, 126.9282982)
},
{
    title: '청담삼익시장',
    latlng: new kakao.maps.LatLng(37.5223, 127.0577)
},
{
    title: '길동복조리시장',
    latlng: new kakao.maps.LatLng(37.5398309, 127.1466106)
},
{
    title: '창동골목시장',
    latlng: new kakao.maps.LatLng(37.6391144, 127.0391018)
},
{
    title: '쌍문시장',
    latlng: new kakao.maps.LatLng(37.648124, 127.0333592)
},
{
    title: '화양제일골목시장',
    latlng: new kakao.maps.LatLng(37.5425828, 127.0689288)
},
{
    title: '답십리현대시장',
    latlng: new kakao.maps.LatLng(37.56679, 127.0587)
},
{
    title: '답십리시장',
    latlng: new kakao.maps.LatLng(37.5731499, 127.058307)
},
{
    title: '중곡제일골목시장',
    latlng: new kakao.maps.LatLng(37.56286, 127.08921)
},
{
    title: '아현시장',
    latlng: new kakao.maps.LatLng(37.55627, 126.9551)
},
{
    title: '관악중부시장',
    latlng: new kakao.maps.LatLng(37.4834441, 126.9546877)
},
{
    title: '신림중앙시장',
    latlng: new kakao.maps.LatLng(37.4828149, 126.9111573)
},
{
    title: '우리시장',
    latlng: new kakao.maps.LatLng(37.4957573, 126.899936)
},
{
    title: '대신시장',
    latlng: new kakao.maps.LatLng(37.51122, 126.9175)
},
{
    title: '금남시장',
    latlng: new kakao.maps.LatLng(37.5484, 127.0225)
},
{
    title: '공릉동 도깨비시장',
    latlng: new kakao.maps.LatLng(37.6224913, 127.0749977)
},
{
    title: '대조시장',
    latlng: new kakao.maps.LatLng(37.6114624, 126.931706)
},
{
    title: '마포농수산물시장',
    latlng: new kakao.maps.LatLng(37.5651, 126.8981)
},
{
    title: '신영시장',
    latlng: new kakao.maps.LatLng(37.53304, 126.836)
},
{
    title: '목사랑시장(목4동시장)',
    latlng: new kakao.maps.LatLng(37.5374773, 126.8655701)
},
{
    title: '송화(벽화)시장',
    latlng: new kakao.maps.LatLng(37.5693579,126.8414585)
},
{
    title: '고척근린시장',
    latlng: new kakao.maps.LatLng(37.51658, 127.0319)
},
{
    title: '대림중앙시장',
    latlng: new kakao.maps.LatLng(37.49159, 126.8997)
},
{
    title: '신원시장(신림1동)',
    latlng: new kakao.maps.LatLng(37.4730961, 126.9282982)
},
{
    title: '남부종합시장',
    latlng: new kakao.maps.LatLng(37.49495, 126.9849)
},
{
    title: '둔촌역전통시장',
    latlng: new kakao.maps.LatLng(37.52749, 127.1351)
},
{
    title: '암사종합시장',
    latlng: new kakao.maps.LatLng(37.55087, 127.1288)
},
{
    title: '성동용답상가시장',
    latlng: new kakao.maps.LatLng(37.5624393, 127.0517675)
},
{
    title: '행당시장상점가',
    latlng: new kakao.maps.LatLng(37.56007, 127.0328)
},
{
    title: '백련시장',
    latlng: new kakao.maps.LatLng(37.57702, 126.9231)
},
{
    title: '포방터시장',
    latlng: new kakao.maps.LatLng(37.597669, 126.9499708)
},
{
    title: '상도전통시장',
    latlng: new kakao.maps.LatLng(37.50189, 126.9484)
},
{
    title: '남성역골목시장',
    latlng: new kakao.maps.LatLng(37.48367, 126.9733)
},
{
    title: '화곡본동시장',
    latlng: new kakao.maps.LatLng(37.5547483, 126.8536521)
},
{
    title: '영일시장',
    latlng: new kakao.maps.LatLng(37.51612, 126.9007)
},
{
    title: '광장시장',
    latlng: new kakao.maps.LatLng(37.5702657, 127.0006316)
},
{
    title: '통인시장',
    latlng: new kakao.maps.LatLng(37.58087, 126.9698)
},
{
    title: '서울중앙시장',
    latlng: new kakao.maps.LatLng(37.56739, 127.0198)
},
{
    title: '약수시장 골목형 상가',
    latlng: new kakao.maps.LatLng(37.5534974, 127.0110796)
},
{
    title: '후암시장',
    latlng: new kakao.maps.LatLng(37.550079, 126.9760976)
},{
    title: '영등포전통시장',
    latlng: new kakao.maps.LatLng(37.52095, 126.9066)
},
{
    title: '돈암제일시장',
    latlng: new kakao.maps.LatLng(37.5917623, 127.015963)
},
{
    title: '영천시장',
    latlng: new kakao.maps.LatLng(37.57092, 126.9611)
},
{
    title: '구로시장',
    latlng: new kakao.maps.LatLng(37.4886639, 126.8859003)
},
{
    title: '남성시장',
    latlng: new kakao.maps.LatLng(37.4882432, 126.9798002)
},
{
    title: '성대전통시장',
    latlng: new kakao.maps.LatLng(37.4958249, 126.9330114)
},
{
    title: '인헌시장',
    latlng: new kakao.maps.LatLng(37.47485605, 126.9647927)
},
{
    title: '고분다리전통시장',
    latlng: new kakao.maps.LatLng(37.542391, 127.133465)
},
{
    title: '정릉시장',
    latlng: new kakao.maps.LatLng(37.6084371, 127.0094371)
},
{
    title: '돌곶이시장',
    latlng: new kakao.maps.LatLng(37.6100091, 127.0630384)
},
{
    title: '마천중앙시장',
    latlng: new kakao.maps.LatLng(37.4968025,127.1496026)
},
{
    title: '사가정시장',
    latlng: new kakao.maps.LatLng(37.581058,127.0894048)
},
{
    title: '중랑동부시장',
    latlng: new kakao.maps.LatLng(37.5919724,127.0779293)
},
{
    title: '연서시장',
    latlng: new kakao.maps.LatLng(37.61931,126.9215)
},
{
    title: '증산종합시장',
    latlng: new kakao.maps.LatLng(37.58147,126.9051)
},
{
    title: '만리시장',
    latlng: new kakao.maps.LatLng(37.55185,126.963)
},
{
    title: '이촌종합시장',
    latlng: new kakao.maps.LatLng(37.52086,126.96612)
},{
    title: '남부골목시장',
    latlng: new kakao.maps.LatLng(37.53317,126.86)
},
{
    title: '까치산시장',
    latlng: new kakao.maps.LatLng(37.53153,126.8479)
},
{
    title: '남대문시장',
    latlng: new kakao.maps.LatLng(37.558908,126.9772351)
},
{
    title: '뚝도시장',
    latlng: new kakao.maps.LatLng(37.5476552,127.0580148)
},
{
    title: '청량리종합시장',
    latlng: new kakao.maps.LatLng(37.580239,127.0419341)
},
{
    title: '경동시장',
    latlng: new kakao.maps.LatLng(37.5791791,127.0398099)
},
{
    title: '마포?공덕시장',
    latlng: new kakao.maps.LatLng(37.54992705,126.9592897)
},
{
    title: '우림시장',
    latlng: new kakao.maps.LatLng(37.47029,126.9205)
},
{
    title: '수유재래시장',
    latlng: new kakao.maps.LatLng(37.6311585,127.0215578)
},
{
    title: '방학동도깨비시장',
    latlng: new kakao.maps.LatLng(37.66547,127.0353)
},
{
    title: '도곡시장',
    latlng: new kakao.maps.LatLng(37.49988,127.03856)
},
{
    title: '백년시장',
    latlng: new kakao.maps.LatLng(37.6411479,127.0265128)
},
{
    title: '솔샘시장',
    latlng: new kakao.maps.LatLng(37.6188965,127.0191439)
},
{
    title: '방이시장',
    latlng: new kakao.maps.LatLng(37.5005659,127.1070404)
},
{
    title: '양재시장',
    latlng: new kakao.maps.LatLng(37.4807942,127.0391172)
}
];

// 마커 이미지의 이미지 주소입니다
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

for (var i = 0; i < positions.length; i ++) {

// 마커 이미지의 이미지 크기 입니다
var imageSize = new kakao.maps.Size(24, 35);

// 마커 이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[i].latlng, // 마커를 표시할 위치
    title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image : markerImage // 마커 이미지
});
}
