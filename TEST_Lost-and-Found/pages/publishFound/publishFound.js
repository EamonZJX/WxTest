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

    onPublishFound:function () {
        var pTime = util.formatTime(new Date());
        var postTime=pTime.toString().substring(2,10);
        inputs["postTime"]=postTime;
        inputs["image"]=savedFilePath;
        inputs["nameId"]="F1";
        var countF=parseInt(wx.getStorageSync("countF"));
        if(!countF){
            wx.setStorageSync("countF",1);
            wx.setStorageSync("found1",inputs);
        }
        else {
            countF += 1;
            inputs["nameId"]="F"+countF;
            wx.setStorageSync("countF", countF);
            wx.setStorageSync("found" + countF, inputs);
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
                            count:1,
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
                            cound:1,
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