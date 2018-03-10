var lostData=require('../../data/local_data.js')

Page({
    data:{

    },
    onShow:function(){
        var lostArry=new Array();
        for(var i=wx.getStorageSync("countL");i>0;--i){
            var item=wx.getStorageSync("lost"+i);
            lostArry.push(item);
        }
        lostArry=lostArry.concat(lostData.lostList);
        this.setData({
            lostList:lostArry
        });
    }

})