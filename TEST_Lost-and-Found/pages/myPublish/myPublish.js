//长按删除已发布内容
Page({
    data:{

    },

  onShow:function (event) {
      var myArry=new Array();

      var numL=wx.getStorageSync("countL");
      for(var i=numL;i>0;--i){
          var myLost=wx.getStorageSync("lost"+i);
          myArry.push(myLost);
      }

      var numF=wx.getStorageSync("countF");
      for(var j=numF;j>0;--j){
          var myFound=wx.getStorageSync("found"+j);
          myArry.push(myFound);
      }
    this.setData({
        myList:myArry
    })
  },

  onDelete:function (e) {
      var that=this;
      var touchTime = this.data.touch_end - this.data.touch_start;
      if(touchTime>350){
          wx.showModal({
              title:'确认',
              content:'是否删除该发布？',
              success:function(res){
                  if(res.confirm){
                      var name=e.currentTarget.id;
                      var kind=name.substring(0,1);
                      var num=parseInt(name.substring(1,name.length));
                      console.log(num);
                      if(kind=='L'){
                          wx.removeStorageSync("lost"+num);
                          wx.setStorageSync("countL", num-1);
                      }
                      else if(kind=='F'){
                          wx.removeStorageSync("found"+num);
                          wx.setStorageSync("countF", num-1);
                      }
                      var myArry=new Array();

                      var numL=wx.getStorageSync("countL");
                      for(var i=numL;i>0;--i){
                          var myLost=wx.getStorageSync("lost"+i);
                          myArry.push(myLost);
                      }

                      var numF=wx.getStorageSync("countF");
                      for(var j=numF;j>0;--j){
                          var myFound=wx.getStorageSync("found"+j);
                          myArry.push(myFound);
                      }
                      that.setData({
                          myList:myArry
                      })
                  }
              }
          })
      }
  },

    touchStart: function (e) {
        this.setData({
            touch_start: e.timeStamp
        })
    },
    touchEnd: function (e) {
        this.setData({
            touch_end: e.timeStamp
        })
    }
})