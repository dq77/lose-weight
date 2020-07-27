
import Request from '../index';

export function getList (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/writeInfo', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

export function writeInfo (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/writeInfo', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

export function getCurrentTime (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/currentTime', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}