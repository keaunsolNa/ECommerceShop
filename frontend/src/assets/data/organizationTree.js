export const organizationTree = {
  data: {
    id: '1',
    name: '화이트 정보',
    children: [
      {
        id: '2',
        name: '정밀기구운영총괄',
        children: [
          {
            id: '6',
            name: '구미생산본부',
            children: [
              { id: '17', name: 'Casting팀' },
              { id: '19', name: '사출/도장팀' },
              { id: '20', name: '조립팀' },
              { id: '51', name: 'TPM팀' }
            ]
          },
          {
            id: '11',
            name: '천진법인',
            children: [
              { id: '47', name: '제조그룹' },
              { id: '48', name: '경영지원그룹' },
              { id: '92', name: '제조기획팀' },
              { id: '94', name: '품질경영팀' }
            ]
          },
          {
            id: '49',
            name: '환경안전팀'
          }
        ]
      },
      {
        id: '3',
        name: '경영본부',
        children: [
          {
            id: '118',
            name: '전략기획그룹',
            children: [
              { id: '31', name: '전사기획팀' },
              { id: '122', name: '전사재무팀' },
              { id: '123', name: '전사인사팀' }
            ]
          },
          {
            id: '119',
            name: '관리지원그룹',
            children: [
              { id: '32', name: '인사팀' },
              { id: '33', name: '회계팀' },
              { id: '34', name: '정보팀' }
            ]
          }
        ]
      },
      {
        id: '37',
        name: '영업본부',
        children: [
          {
            id: '13',
            name: '한국고객팀'
          },
          {
            id: '24',
            name: '해외고객팀'
          },
          {
            id: '39',
            name: '영업기획팀'
          },
          {
            id: '62',
            name: '전략고객팀'
          }
        ]
      },
      {
        id: '45',
        name: '서울연구소',
        children: [
          {
            id: '74',
            name: '서울연구1팀'
          },
          {
            id: '128',
            name: '서울연구2팀'
          },
          {
            id: '129',
            name: '서울연구3팀',
            children: [{ id: '12665', name: '연구소 부속' }]
          },
          {
            id: '13011',
            name: '서울연구특수팀'
          }
        ]
      },
      {
        id: '117',
        name: 'CSR본부',
        children: [
          {
            id: '120',
            name: '공연기획팀'
          },
          {
            id: '127',
            name: '전시기획팀'
          }
        ]
      },
      {
        id: '147',
        name: '임원',
        children: [
          {
            id: '15433',
            name: '서울연구6팀'
          }
        ]
      },
      {
        id: '152',
        name: '중국마케팅본부',
        children: [
          {
            id: '154',
            name: '중국고객팀',
            children: [
              {
                id: '153',
                name: '영업기획팀'
              }
            ]
          }
        ]
      }
    ]
  }
};

export default organizationTree;
