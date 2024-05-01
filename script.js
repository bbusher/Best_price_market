var data = {};
var batchSize = 1000; // 한 번에 가져올 데이터 양
var totalDataCount = 5000; // 총 데이터 개수
var requestsCompleted = 0;

function loadData() {
    // 로딩 아이콘 및 메시지 표시
    document.getElementById('loader').style.display = 'block';
    document.getElementById('loadingMessage').style.display = 'block';

    var baseUrl = 'http://openapi.seoul.go.kr:8088/445971697a6b686936304e6f704667/xml/ListNecessariesPricesService/';
    var batchUrls = [];
    
    // 요청할 URL들을 생성
    for (var i = 0; i < totalDataCount; i += batchSize) {
        batchUrls.push(baseUrl + (i + 1) + '/' + Math.min(i + batchSize, totalDataCount) + '/');
    }

    var promises = batchUrls.map(function(url) {
        return fetch(url)
            .then(response => response.text())
            .then(xmlData => {
                processDataFromXML(xmlData);
                requestsCompleted++; // 요청 완료된 개수 증가
                if (requestsCompleted === batchUrls.length) {
                    // 모든 요청이 완료되면 데이터를 정렬하고 각 항목의 최저가를 표시
                    displayLowestPrices();
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

    var yearsMonths = xmlDoc.getElementsByTagName("P_YEAR_MONTH");
    var markets = xmlDoc.getElementsByTagName("M_NAME");
    var items = xmlDoc.getElementsByTagName("A_NAME");
    var prices = xmlDoc.getElementsByTagName("A_PRICE");

    // 'P_YEAR_MONTH'가 2024년 4월인 데이터를 처리하여 data 객체에 저장
    for (var i = 0; i < items.length; i++) {
        var yearMonth = yearsMonths[i].childNodes[0].nodeValue;
        var itemName = items[i].childNodes[0].nodeValue;
        var itemPrice = parseFloat(prices[i].childNodes[0].nodeValue.replace(/[^0-9.-]+/g,""));

        if (yearMonth === '2024-04' && (itemName.includes('감자 1kg') || itemName.includes('대파 1kg') || itemName.includes('콩나물 500g') || itemName.includes('양파 1망')|| itemName.includes('포도(샤인머스켓) 1kg')|| itemName.includes('사과 1개')|| itemName.includes('복숭아 1개')|| itemName.includes('닭고기 1kg')|| itemName.includes('돼지고기 100g')|| itemName.includes('고등어 1마리'))) {
            if (itemPrice !== 0 && (!data[itemName] || data[itemName].price > itemPrice)) {
                data[itemName] = {
                    market: markets[i].childNodes[0].nodeValue,
                    price: itemPrice
                };
            }
        }
    }
}

function displayLowestPrices() {
    var dataDisplayHTML = "";

    // 각 과일에 대한 최저가 정보를 HTML로 변환하여 표시
    Object.keys(data).forEach(itemName => {
        var item = data[itemName];
        dataDisplayHTML += "<div class='data-item'>";
        dataDisplayHTML += "<div id='itemName'>" + itemName + "</div>";
        dataDisplayHTML += "<div id='itemPrice'>" + item.price + "원</div>";
        dataDisplayHTML += "<div id='marketName'>최저가 : " + item.market + "</div>";
        dataDisplayHTML += "</div>";
    });

    document.getElementById('dataDisplay').innerHTML = dataDisplayHTML;
}

// 초기 데이터 로딩
loadData();