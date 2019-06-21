jest.mock('@google-cloud/firestore');

const getMocks = () => {
  let __mockReq = {
    headers: {},
    get: function(header) {
      return this.headers[header];
    },
    method: '',
    body: {},
    query: {},
    params: {},
  };

  let __mockRes = {
    set: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    end: jest.fn(),
    status: jest.fn(),
  };

  return {
    req: __mockReq,
    res: __mockRes,
  };
};

describe('Test getMedia', () => {

  test('it should return the media array', async () => {
    const mockObjectRef = [
      [
        { 
          id: 'picture1.jpg',
          data: () => ({
            directory: 'picture',
            url: 'https://domain.com/picture1.jpg',
            size: 45000,
            createdAt: '',
          }),
        },
        { 
          id: 'picture2.jpg',
          data: () => ({
            directory: 'picture',
            url: 'https://domain.com/picture2.jpg',
            size: 45000,
            createdAt: '',
          }),
        },
        { 
          id: 'picture3.jpg',
          data: () => ({
            directory: 'picture',
            url: 'https://domain.com/picture3.jpg',
            size: 45000,
            createdAt: '',
          }),
        },
      ]
    ];
    require('@google-cloud/firestore').__setMockResultArray(mockObjectRef);
    const parameters = {
      header: {},
      query: {
        userId: '0okm9ijn8uhb',
        websiteId: '5tgb6yhn-7ujm-8ikl-cde3',
      },
      body: {},
    };
    let mocks = getMocks();
    mocks.req.method = 'GET';
    mocks.req.query = parameters.query;
    const microservice = require('./index');
    await microservice.getMedia(mocks.req, mocks.res);
    expect(mocks.res.status.mock.calls[0][0]).toBe(202);
    expect(mocks.res.send.mock.calls.length).toBe(1);
  });

});