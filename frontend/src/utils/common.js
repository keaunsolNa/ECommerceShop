//공통함수 선언

//날짜를 yyyyMMdd 형태로 변환하여 리턴하는 함수
//인자로 2023/12/31 , 2023-4-3 혹은 null 값을 줄 수 있다.
// null 인자를 받는 경우 현재 일자를 리턴한다.
//targetDate : any
export function getDate(targetDate) {
  const date = targetDate ? new Date(targetDate) : new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
  const dd = date.getDay() < 10 ? '0' + date.getDay() : date.getDay();
  return `${yyyy}${mm}${dd}`;
}
