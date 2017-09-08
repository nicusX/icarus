const AWS = require('aws-sdk');
const request = require('request');

export const complete = <T>(cb: (err: any, res: T) => any, p: Promise<T>) =>
  p.then(res => cb(null, res)).catch(err => cb(err, null));

export const dynamoPut = (params): Promise<any> => {
  const dynamo = new AWS.DynamoDB.DocumentClient();

  return new Promise<any>((respond, reject) => {
    dynamo.put(params, (err, res) => {
      if (err != null) {
        reject(err);
      } else {
        respond(res);
      }
    });
  });
}

export const dynamoGet = (params): Promise<any> => {
  const dynamo = new AWS.DynamoDB.DocumentClient();

  return new Promise<any>((respond, reject) => {
      dynamo.get(params, (err, data) => {
        if (err != null) {
          reject(err);
        } else {
          respond(data.Item);
        }
      });
  });
};

export const doHttp = (options: any): Promise<any> => {
  return new Promise<any>((respond, reject) => {
    request(options, (err, res, body) => {
      if (res != null && res.statusCode == 200) {
        respond(body);
      } else {
        console.log("Failure: " + body);
        if (err == null) {
          reject(body);
        } else {
          reject(err);
        }
      }
    });
  });
};