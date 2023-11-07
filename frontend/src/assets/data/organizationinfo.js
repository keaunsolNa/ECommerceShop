export const response = {
  data: [
    {
      id: 1,
      number: 1,
      name: '화이트정보통신',
      startDate: '2020-01-01',
      code: '1000',
      parent: null,
      children: [
        {
          id: 2,
          number: 2,
          name: 'RND',
          startDate: '2020-01-01',
          code: '1100',
          parent: 1,
          children: [
            {
              id: 6,
              number: 6,
              name: 'SaaS사업본부',
              startDate: '2020-01-01',
              code: '1110',
              parent: 2,
              children: [
                {
                  id: 7,
                  number: 7,
                  name: '프론트엔드팀',
                  startDate: '2020-01-01',
                  code: '1111',
                  parent: 6,
                  children: []
                },
                {
                  id: 8,
                  number: 8,
                  name: '백엔드팀',
                  startDate: '2020-01-01',
                  code: '1112',
                  parent: 6,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 3,
          number: 3,
          name: 'CS본부',
          startDate: '2020-01-01',
          code: '1200',
          parent: 1,
          children: []
        },
        {
          id: 4,
          number: 4,
          name: '영업팀',
          startDate: '2020-01-01',
          code: '1300',
          parent: 1,
          children: []
        },
        {
          id: 5,
          number: 5,
          name: '경영지원팀',
          startDate: '2020-01-01',
          code: '1400',
          parent: 1,
          children: []
        }
      ]
    }
  ]
};

export default response;
