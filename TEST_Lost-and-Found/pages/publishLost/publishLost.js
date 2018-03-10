var util = require('../../utils/util.js');
var inputs={};
var savedFilePath="";

Page({
    data:{
        preview:null
    }
    ,
    onLoad:function () {

    },

    bindBlur:function(e){
            inputs[e.currentTarget.id]=e.detail.value
    },

    onPublishLost:function () {
        var pTime = util.formatTime(new Date());
        var postTime=pTime.toString().substring(2,10);
        inputs["postTime"]=postTime;
        inputs["image"]=savedFilePath;
        inputs["nameId"]="L1";
        var countL=parseInt(wx.getStorageSync("countL"));
        if(!countL){
            wx.setStorageSync("countL",1);
            wx.setStorageSync("lost1",inputs);
        }
        else {
            countL += 1;
            inputs["nameId"]="L"+countL;
            wx.setStorageSync("countL", countL);
            wx.setStorageSync("lost" + countL, inputs);
        }
        wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 750,
            success:function(){
                setTimeout(function(){
                    savedFilePath=null;
                    wx.reLaunch({
                        url: "../my/my"
                    })
                },750)
            }
        })
    },

    onImageUp:function () {
        var that=this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#000000",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        wx.chooseImage({
                            sizeType: ['original', 'compressed'],
                            sourceType: ['album'],
                            success: function (res) {
                                console.log(res);
                                var tempFilePaths = res.tempFilePaths;
                                wx.saveFile({
                                    tempFilePath: tempFilePaths[0],
                                    success: function(res) {
                                        savedFilePath = res.savedFilePath;
                                        that.setData({
                                            preview:savedFilePath
                                        });
                                    }
                                })
                            }
                        })
                    } else if (res.tapIndex == 1) {
                        wx.chooseImage({
                            sizeType: ['original', 'compressed'],
                            sourceType: ['camera'],
                            success: function (res) {
                                console.log(res);
                                var tempFilePaths = res.tempFilePaths;
                                wx.saveFile({
                                    tempFilePath: tempFilePaths[0],
                                    success: function(res) {
                                        savedFilePath = res.savedFilePath;
                                        that.setData({
                                            preview:savedFilePath
                                        });
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    }

})