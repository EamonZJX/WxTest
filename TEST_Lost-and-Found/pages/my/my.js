Page({
    data:{

    },
    onShow:function () {
        var numL=wx.getStorageSync("countL");
        var numF=wx.getStorageSync("countF");
        var num=numL+numF;
        if(!num){
            num=0;
        }
        this.setData({
            count:num
        });
    },

    onFound:function() {
        wx.navigateTo({
            url: "../publishFound/publishFound"
        });
    },
    
    onLost:function(){
        wx.navigateTo({
          url: "../publishLost/publishLost"
        });
    },

    onMyPublish:function(){
        wx.navigateTo({
            url:"../myPublish/myPublish"
        });
    }
})