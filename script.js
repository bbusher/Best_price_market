var data = [];
var batchSize = 1000; // 한 번에 가져올 데이터 양
var totalDataCount = 60000; // 총 데이터 개수
var requestsCompleted = 0;

// 로딩될 과일 목록
var fruits = ['사과', '단감', '귤', '고구마', '갓'];

function loadData() {
    // 로딩 아이콘 및 메시지 표시
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loadingMessage').style.display = 'block';

    var baseUrl = 'http://openapi.seoul.go.kr:8088/445971697a6b686936304e6f704667/xml/ListNecessariesPricesService/';
    var batchUrls = [];
    
    // 요청할 URL들을 생성
    for (var i = 0; i < totalDataCount; i += batchSize) {
        // 랜덤으로 과일 선택
        var randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
        batchUrls.push(baseUrl + (i + 1) + '/' + Math.min(i + batchSize, totalDataCount) + '/?ITEM_NAME=' + encodeURIComponent(randomFruit));
    }

    var promises = batchUrls.map(function(url) {
        return fetch(url)
            .then(response => response.text())
            .then(xmlData => {
                processDataFromXML(xmlData);
                requestsCompleted++; // 요청 완료된 개수 증가
                if (requestsCompleted === batchUrls.length) {
                    // 모든 요청이 완료되면 데이터를 정렬하고 상위 6개의 정보만을 선택하여 표시
                    data.sort(function(a, b) {
                        return a.price - b.price; // 오름차순 정렬
                    });
                    displayTopSix();
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('loadingMessage').style.display = 'none';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    Promise.all(promises);
}

function processDataFromXML(xmlData) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlData, "text/xml");

    var markets = xmlDoc.getElementsByTagName("M_NAME");
    var items = xmlDoc.getElementsByTagName("A_NAME");
    var prices = xmlDoc.getElementsByTagName("A_PRICE");

    // 해당 과일만을 data 배열에 추가
    for (var i = 0; i < markets.length; i++) {
        var itemName = items[i].childNodes[0].nodeValue;
        var itemPrice = parseFloat(prices[i].childNodes[0].nodeValue.replace(/[^0-9.-]+/g,""));

        if (fruits.some(fruit => itemName.includes(fruit)) && itemPrice !== 0) {
            data.push({
                market: markets[i].childNodes[0].nodeValue,
                item: itemName,
                price: itemPrice
            });
        }
    }
}

function displayTopSix() {
    var dataDisplayHTML = "";
    for (var i = 0; i < Math.min(6, data.length); i++) {
        var entry = data[i];
        dataDisplayHTML += "<div class='data-item'>";
        dataDisplayHTML += "<div id='itemName'>" + entry.item + "</div>";
        dataDisplayHTML += "<div id='itemPrice'>" + entry.price + "원</div>";
        dataDisplayHTML += "<div id='marketName'>최저가 : " + entry.market + "</div>";
        dataDisplayHTML += "</div>";
    }
    document.getElementById('dataDisplay').innerHTML = dataDisplayHTML;
}

// 초기 데이터 로딩
loadData();
