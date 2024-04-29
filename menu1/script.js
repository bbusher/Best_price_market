var data = [];
var batchSize = 1000; // 한 번에 가져올 데이터 양
var totalDataCount = 60000; // 총 데이터 개수
var requestsCompleted = 0;

function loadData(selectedItem) {

    data = [];

    requestsCompleted = 0;

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
                console.log(xmlData); // XML 데이터 확인용 출력
                processDataFromXML(xmlData, selectedItem); // 선택된 품목으로 데이터 처리
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

function processDataFromXML(xmlData, selectedItem) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlData, "text/xml");

    var markets = xmlDoc.getElementsByTagName("M_NAME");
    var items = xmlDoc.getElementsByTagName("A_NAME");
    var prices = xmlDoc.getElementsByTagName("A_PRICE");

    // 선택된 품목에 해당하는 항목을 data 배열에 추가
    for (var i = 0; i < markets.length; i++) {
        var itemName = items[i].childNodes[0].nodeValue;
        var itemPrice = parseFloat(prices[i].childNodes[0].nodeValue.replace(/[^0-9.-]+/g,""));

        if (itemName.includes(selectedItem) && itemPrice !== 0) {
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
    for (var i = 0; i < Math.min(1, data.length); i++) {
        var entry = data[i];
        dataDisplayHTML += "<div class='data-item'>";
        dataDisplayHTML += "<div id='itemName'>" + entry.item + "</div>";
        dataDisplayHTML += "<div id='itemPrice'>" + entry.price + "원</div>";
        dataDisplayHTML += "<div id='marketName'>최저가 : " + entry.market + "</div>";
        dataDisplayHTML += "</div>";
    }
    document.getElementById('dataDisplay').innerHTML = dataDisplayHTML;
}

function updateSubcategories() {
    var categorySelect = document.getElementById("categorySelect");
    var itemSelect = document.getElementById("itemSelect");
    var selectedCategory = categorySelect.value;

    itemSelect.innerHTML = ""; // 중분류 메뉴 초기화

    if (selectedCategory === "1kg") {
        var options = ["감자 1kg"];
    } else if (selectedCategory === "1개") {
        var options = ["가지 1개", "갈치 1마리", "계란 10개"];
    } else if (selectedCategory === "1통") {
        var options = ["간장 1통"];
    }

    options.forEach(function(option) {
        var optionElement = document.createElement("option");
        optionElement.textContent = option;
        optionElement.value = option;
        itemSelect.appendChild(optionElement);
    });
}

// 페이지 로드시 한번 실행하여 초기화
updateSubcategories();