$( document ).ready(function() {
  listFuc();

  // sendData();
});

const getToday= () => {
  let toDate = new Date();
  let toYear = toDate.getFullYear();
  let toMonth = ("0" + (1 + toDate.getMonth())).slice(-2);
  let todayday = ("0" + toDate.getDate()).slice(-2);
  return toYear + "-" + toMonth + "-" + todayday;
}

const WeekendColor = (param) => {
  if(param == '토'){
      $(`div[name=${param}]`).css({"color" : "blue"});
  }
  if(param == '일'){
      $(`div[name=${param}]`).css({"color" : "red"});
  }
}
const listFuc = () => {

  drawCal(getToday());

  // click event
  $('.selectDay li').on('click', function(){
    $('.selectDay li').attr('class', 'unselected');
    $(this).attr('class', 'selected');

    let $testYMD = $(`<p>${$(this).attr('name')}</p>`);
    $('.test .selectedDayVal').html($testYMD);
    // drawCal(showDate());
})


/* year selectbox */
const yearLabel = document.querySelector('.yearLabel');
const yItems = document.querySelectorAll('.yearItem');

const handleSelect_year = (item) => {
  yearLabel.parentNode.classList.remove('active');
  yearLabel.innerHTML = item.textContent;

  let $testYMD = $(`<p>${item.value}</p>`);
                  $('.test .selectedYearVal').html($testYMD);

                  drawSelectedCal(`${item.value}-${$('.test .selectedMonthVal p').text()}-01`);
}


yItems.forEach(yitem => {
	yitem.addEventListener('click', () => handleSelect_year(yitem))
})

yearLabel.addEventListener('click', () => {
  if(yearLabel.parentNode.classList.contains('active')) {
    yearLabel.parentNode.classList.remove('active');
  } else {
  	yearLabel.parentNode.classList.add('active');
  }
})

/* month selectbox */
const monthLabel = document.querySelector('.monthLabel');
const mItems = document.querySelectorAll('.monthItem');

const handleSelect_month = (item) => {
  monthLabel.parentNode.classList.remove('active');
  monthLabel.innerHTML = item.textContent;
  if (item.value == 13){
    item.value =1
  }
  let $testYMD = $(`<p class="selectedM">${item.value}</p>`);
  $('.test .selectedMonthVal').html($testYMD);

  drawSelectedCal(`${$('.test .selectedYearVal p').text()}-${item.value}-01`);
}

mItems.forEach(mItem => {
	mItem.addEventListener('click', () => handleSelect_month(mItem))
})

monthLabel.addEventListener('click', () => {
  if(monthLabel.parentNode.classList.contains('active')) {
  	monthLabel.parentNode.classList.remove('active');
  } else {
  	monthLabel.parentNode.classList.add('active');
  }
})

}


const drawCal = (monthName) => {
  const todaydate = new Date(monthName);

  const todayYear = todaydate.getFullYear();
  const todayMonth_ = todaydate.getMonth();
  const todayMonth = ("0" + (1 + todaydate.getMonth())).slice(-2); //for String

  const befLast = new Date(todayYear, todayMonth_, -1);
  const beforeLast = new Date(todayYear, todayMonth_, 0);
  const todayLast = new Date(todayYear, todayMonth_ + 1, 0);
  const afterFirst = new Date(todayYear, todayMonth_ + 1, 1);
  const afterSecond = new Date(todayYear, todayMonth_ + 1, 2);

  const befDate = beforeLast.getDate();
  const befWeek = beforeLast.getDay();

  const todDate = todayLast.getDate();
  const todWeek = todayLast.getDay();

  const aftDate = afterFirst.getDate();
  const aftWeek = afterFirst.getDay();

  const yearSelectBox = [todayYear-3, todayYear-2, todayYear-1, todayYear, todayYear+1, todayYear+2]
  const monthSelectBox = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']

  const beforeDates = [befLast.getDate(), befDate ];
  const todayDates = [...Array(todDate + 1).keys()].slice(1);
  const afterDates = [aftDate, afterSecond.getDate()];

  console.log(yearSelectBox, monthSelectBox)
  console.log(beforeDates, todayDates, afterDates )

  // make Year
  for(let y = 0; y < yearSelectBox.length; y++){
    let $createYear =
    $(`<li class="yearItem" value="${yearSelectBox[y]}">${yearSelectBox[y]}년</li>`);
    $('.yearList').append($createYear);
  }

  // default is Today
  let $defaultYear = $(`<div >${todayYear}년</div>`);
                     $('.yearLabel').append($defaultYear);

  // click test Area
  let $testY = $(`<p>${todayYear}</p>`);
               $('.test .selectedYearVal').html($testY);

  // make Month
  for(let m=0; m<12; m++){
    let monthData = new Date(todayYear, todayMonth + m).getMonth()
    let $createMonth =
    $(`<li class="monthItem" value="${monthData+1}">${monthSelectBox[m]}</li>`);
    $('.monthList').append($createMonth);
  }

  // default is Today
  let $defaultMonth = $(`<div >${todayMonth_+1}월</div>`);
                      $('.monthLabel').append($defaultMonth);

  // click test Area
  let $testM = $(`<p>${todayMonth_+1}</p>`);
               $('.test .selectedMonthVal').html($testM);

  // make Day And Week
  let week = ['일', '월', '화', '수', '목', '금', '토'];
  const beforeWeeks = [week[befLast.getDay()], week[befWeek]]

  const todayWeeks = [];
  for(let i=0; i<todayDates.length; i ++){
    const todayWeeks_ = week[new Date(todayYear, todayMonth_, todayDates[i]).getDay()]
    todayWeeks.push(todayWeeks_)
  }

  const afterWeeks = [week[aftWeek], week[afterSecond.getDay()]];

  for(let b=0; b< beforeDates.length; b++){
    let $drawBeforeDates =
    $(`<ul>
        <li class="unselected" name=${beforeLast.getFullYear()}-${beforeLast.getMonth()+1}-${beforeDates[b]}>${beforeDates[b]}</li>
        <div name=${beforeWeeks[b]}>${beforeWeeks[b]}</div>
      </ul>`);
      $('.selectDay').append($drawBeforeDates);
  }

  for(let t =0; t< todayDates.length; t++){
      let $drawTodayDates =
          $(`<ul>
              <li class="unselected" name=${todayYear}-${todayMonth}-${todayDates[t]}>${todayDates[t]}</li>
              <div name=${todayWeeks[t]}>${todayWeeks[t]}</div>
            </ul>`);
      $('.selectDay').append($drawTodayDates);
      WeekendColor(todayWeeks[t])

      if(todaydate.getDate() == todayDates[t]){
          $(`li[name=${todayYear}-${todayMonth}-${todayDates[t]}]`).attr('class', 'selected');

          //test area
          let $testD = $(`<p>${todaydate.getDate()}</p>`);
          $('.test .selectedDayVal').html($testD);
      }
  }

  for(let a=0; a<afterDates.length; a++){
    let $drawAfterDates =
    $(`<ul>
        <li class="unselected" name=${afterFirst.getFullYear()}-${afterFirst.getMonth()+1}-${afterDates[a]}>${afterDates[a]}</li>
        <div name=${afterWeeks[a]}>${afterWeeks[a]}</div>
      </ul>`);
    $('.selectDay').append($drawAfterDates);
    WeekendColor(afterWeeks[a]);
  }


}

// selected Month

const drawSelectedCal = (selectedMonthParam) => {
  const selectedDate = new Date(selectedMonthParam);

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth_ = selectedDate.getMonth();
  const selectedMonth = ("0" + (1 + selectedDate.getMonth())).slice(-2); //for String

  const befSel = new Date(selectedYear, selectedMonth_, -1);
  const beforeSel = new Date(selectedYear, selectedMonth_, 0);
  const selectedLast = new Date(selectedYear, selectedMonth_ + 1, 0);
  const aftFirSel = new Date(selectedYear, selectedMonth_ + 1, 1);
  const afterSndSel = new Date(selectedYear, selectedMonth_ + 1, 2);

  // 지난달 일 & 요일
  const befDateSel = beforeSel.getDate();
  const befWeekSel = beforeSel.getDay();
  // console.log(`지난 달 : ${befDateSel}일, ${befWeekSel}요일로 변환`)

  // 이번달 일 & 요일
  const stdDate = selectedLast.getDate();
  const stdWeek = selectedLast.getDay();
  // console.log(`이번 달 : ${selectedMonth}월(String) ${stdDate}일, ${stdWeek}요일로 변환`)

  // 다음달 일 & 요일
  const aftDateSel = aftFirSel.getDate();
  const aftWeekSel = aftFirSel.getDay();
  // console.log(`다음 달 : ${aftDateSel}일, ${aftWeekSel}요일로 변환`)

  // Make Array

  const befStdDates = [befSel.getDate(), befDateSel ];
  const todStdDates = [...Array(stdDate + 1).keys()].slice(1);
  const aftStdDates = [aftDateSel, afterSndSel.getDate()];

  // console.log(yearSelectBox, monthSelectBox)
  // console.log(befStdDates, todStdDates, aftStdDates )

  // click test Area
  let $testY = $(`<p>${selectedYear}</p>`);
               $('.test .selectedYearVal').html($testY);

  // make Day And Week
  let week = ['일', '월', '화', '수', '목', '금', '토'];
  const befSelWeeks = [week[befSel.getDay()], week[befWeekSel]]

  const selectedWeeks = [];
  for(let i=0; i<todStdDates.length; i ++){
    const selectedWeeks_ = week[new Date(selectedYear, selectedMonth_, todStdDates[i]).getDay()]
    selectedWeeks.push(selectedWeeks_)
  }

  const aftSelWeeks = [week[aftWeekSel], week[afterSndSel.getDay()]];

  for(let b=0; b< befStdDates.length; b++){
    let $drawBeforeSelectedDates =
    $(`<ul>
        <li class="unselected" name=${beforeSel.getFullYear()}-${beforeSel.getMonth()+1}-${befStdDates[b]}>${befStdDates[b]}</li>
        <div name=${befSelWeeks[b]}>${befSelWeeks[b]}</div>
      </ul>`);
      $('.selectDay').html($drawBeforeSelectedDates);
  }

  for(let t =0; t< todStdDates.length; t++){
      let $drawSelectedDates =
          $(`<ul>
              <li class="unselected" name=${selectedYear}-${selectedMonth}-${todStdDates[t]}>${todStdDates[t]}</li>
              <div name=${selectedWeeks[t]}>${selectedWeeks[t]}</div>
            </ul>`);
      $('.selectDay').append($drawSelectedDates);
      WeekendColor(selectedWeeks[t])

      if(selectedDate.getDate() == todStdDates[t]){
          // $(`li[name=${todayYear}-${todayMonth}-${todStdDates[t]}]`).attr('class', 'selected');
      }
      //test area
      let $testD = $(`<p>${selectedDate.getDate()}</p>`);
      $('.test .selectedDayVal').html($testD);
  }

  for(let a=0; a<aftStdDates.length; a++){
    let $drawAfterSelectedDates =
    $(`<ul>
        <li class="unselected" name=${aftFirSel.getFullYear()}-${aftFirSel.getMonth()+1}-${aftStdDates[a]}>${aftStdDates[a]}</li>
        <div name=${aftSelWeeks[a]}>${aftSelWeeks[a]}</div>
      </ul>`);
    $('.selectDay').append($drawAfterSelectedDates);
    WeekendColor(aftSelWeeks[a]);
  }

}

const showDate =() => {
  let selectY= $('.test .selectedYearVal p').text()
  let selectM= $('.test .selectedMonthVal p').text()
  let daytest = $('.test .selectedDayVal p').text()
  let dateTest = `"${selectY}-${selectM.padStart(2,'0')}-${daytest.padStart(2,'0')}"`
  console.log(dateTest)
  return dateTest
}
