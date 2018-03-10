var foundData=require('../../data/local_data.js')

Page({
    data:{

    },
    onShow:function(){
        var foundArry=new Array();
        for(var i=wx.getStorageSync("countF");i>0;--i){
            var item=wx.getStorageSync("found"+i);
            foundArry.push(item);
        }
        foundArry=foundArry.concat(foundData.foundList);
        this.setData({
            foundList:foundArry
        });
    }

})