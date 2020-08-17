/*
 * @Author: 刁琪
 * @Date: 2020-07-23 16:24:10
 * @LastEditors: わからないよう
 */

import Request from '../index';

export function getWeekList (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/groupDataWeek', {
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