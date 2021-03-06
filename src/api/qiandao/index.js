/*
 * @Author: 刁琪
 * @Date: 2020-07-23 16:24:10
 * @LastEditors: わからないよう
 */

import Request from '../index';

// 获取群周打卡数据
export function getWeekList (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/groupDataWeek', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 获取群月打卡数据
export function getMonthList (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/groupDataMonth', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 个人打卡
export function writeInfo (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/writeInfo', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 获取当前周数
export function getCurrentTime (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/currentTime', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 创建群
export function creatGroup (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/generateGroup', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 获取个人月打卡数据
export function getUserMonthList (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/reduce/dataMonth', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 踢人出群
export function delPerson (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/currentTime', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}

// 退出群组
export function quitGroup (data) {
  return new Promise(function(reslove,reject){
    Request.get('/api/currentTime', {
      params: data
    }).then(res => {
      reslove(res.data)
    })
  })
}


