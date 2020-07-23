
import Request from '../index';

export function writeInfo (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/writeInfo', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}