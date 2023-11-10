// 清除所有景點的內容
function searchAttractionsClear() {
    const table = document.getElementById("attractions");
    table.innerHTML = `
        <tr>
            <th>景點名稱</th>
            <th>開放時間</th>
            <th>地址</th>
        </tr>
    `
}

//分頁邏輯
let currentPage = 1;
function changePage(offset) {
    currentPage += offset;
    if (currentPage < 1) {
        currentPage = 1;
    }

    // 調用獲取數據的函數
    searchAttractions();
}

// 搜尋城市
function searchAttractions() {
    const city = document.getElementById("citySelect").value;
    const spotName = document.getElementById("spotName").value;
    const apiUrl = `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${city}?%24top=10&%24format=JSON`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 把地名都找出來
            const filteredAttractions = data.filter(attraction => {
                return attraction.ScenicSpotName.includes(spotName);
            });

            // 分頁邏輯
            const itemsPerPage = 3;
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageAttractions = filteredAttractions.slice(startIndex, endIndex);

            // 輸出的格式
            const table = document.getElementById("attractions");
            table.innerHTML = `
                <tr>
                    <th>景點名稱</th>
                    <th>開放時間</th>
                    <th>地址</th>
                </tr>
            `;

            // 輸出格式內容
            pageAttractions.forEach(attraction => {
                table.innerHTML += `
                    <tr>
                        <td>${attraction.ScenicSpotName}</td>
                        <td>${attraction.OpenTime}</td>
                        <td class="attraction-address">${attraction.Address}</td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert("no info")
        });
}

// 初始化地圖
function initMap(latitude, longitude, name) {
    const map = L.map('mapid').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(name)
        .openPopup();
}

// default地圖
// function showDefaultMap() {
//     const defaultLatitude = 25.033;
//     const defaultLongitude = 121.565;
//     const defaultName = "台北";
//     initMap(defaultLatitude, defaultLongitude, defaultName);
// }

// 文檔加載後顯示默認地圖
// document.addEventListener("DOMContentLoaded", function() {
//     showDefaultMap();
// });

// 輸入景點名稱並顯示地圖
function showOnMap() {
    const city = document.getElementById("citySelect").value;
    const spotName = document.getElementById("spotName").value;
    const apiUrl = `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${city}?%24top=100&%24format=JSON`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            //把地名都找出來
            const filteredAttractions = data.filter(attraction => {
                return attraction.ScenicSpotName.includes(spotName);
            });
            //輸出的格式
            const table = document.getElementById("attractionShowOnMap");
            table.innerHTML = `
                <tr>
                    <th>景點名稱</th>
                    <th>開放時間</th>
                    <th>地址</th>
                </tr>
            `;
            //輸出格式內容
            filteredAttractions.forEach(attraction => {
                table.innerHTML += `
                    <tr>
                        <td>${attraction.ScenicSpotName}</td>
                        <td>${attraction.OpenTime}</td>
                        <td>${attraction.Address}</td>
                    </tr>
                `;

                initMap(attraction.Position.PositionLat, attraction.Position.PositionLon, attraction.ScenicSpotName);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alter("no info")
        });
}


function showOnMapClear() {
    //清除input的輸入
    const inputElement = document.getElementById("spotName");
    if(inputElement) {
        inputElement.value ='';
    }

    //清除特定景點的內容
    const table = document.getElementById("attractionShowOnMap");
    table.innerHTML = `
        <tr>
            <th>景點名稱</th>
            <th>開放時間</th>
            <th>地址</th>
        </tr>
    `;
    // 刪除地圖
    const mapElement = document.getElementById("mapid");
    if (mapElement) {
        mapElement.remove();
    }
}



// footer
const date = new Date();
const currentDate = date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

document.getElementById("copyright").innerHTML = `&copy ${currentDate} All Rights Reserved`;