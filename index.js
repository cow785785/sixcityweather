let infoList = [];
const cities = ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市"];
const cityselect = document.querySelector("#city-select");
const weatherinfo = document.querySelector("#weather-info");

fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-121E9C6A-7A2F-4C7E-8186-55058290CC46"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // 抓出"台北市"、"新北市"、"桃園市"、"台中市"、"台南市"、"高雄市"資料
    infoList = data.records.location.filter((i) =>
      cities.includes(i.locationName)
    );
    // 建立選單項目
    let options = `<option>請選擇城市</option>`;
    options += infoList.map((i) => `<option>${i.locationName}</option>`);
    cityselect.innerHTML = options;
  })
  .catch(function (error) {
    console.error(error);
  });

// 選單變化時觸發事件
cityselect.addEventListener("change", function () {
  // 取得選擇的城市名稱
  const selectedCity = this.value;
  // 找到對應城市的資料
  const cityData = infoList.find((i) => i.locationName === selectedCity);
  // 如果有找到資料
  if (cityData) {
    const cityName = cityData.locationName;
    const weatherElements = cityData.weatherElement;
    const content = `
      <div>
        <h2>${cityName}</h2>
        <ul>
          <li>天氣狀況：${weatherElements[0].time[0].parameter.parameterName}</li>
          <li>最高溫度：${weatherElements[1].time[0].parameter.parameterName}℃</li>
          <li>最低溫度：${weatherElements[2].time[0].parameter.parameterName}℃</li>
          <li>身體舒適：${weatherElements[3].time[0].parameter.parameterName}</li> 
        </ul>
      </div>
    `;
    // 顯示對應城市的天氣資料
    weatherinfo.innerHTML = content;
  }
});
