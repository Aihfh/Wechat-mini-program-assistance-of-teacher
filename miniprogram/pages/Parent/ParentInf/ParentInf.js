const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		loginOk:true,
    nickName:"",
		avatarUrl:"",
		ava : ''
	},
	updatePinfo(){
		db.collection('Parent').where({
			avatarUrl : this.data.ava
		}).get().then(res=>{
      this.setData({
				datalist : res.data
			})
			console.log(this.data.datalist[0].Pname)
			var name1 = this.data.datalist[0].Pname
			var avatarUrl = this.data.datalist[0].avatarUrl
			var phone = this.data.datalist[0].Pphone
			var class1 = this.data.datalist[0].cclass
			var id = this.data.datalist[0]._id
		  wx.navigateTo({
				url: '../PupInfo/PupInfo?avatarUrl='+avatarUrl+'&phone='+phone+'&name='+name1+'&class1='+class1+'&id='+id
		  })
		})
   
	
	},
  //点击登录
  

  //退出登录
  exit(){
    wx.showModal({
      content:"确定退出吗"
    }).then(res=>{
      if(res.confirm){
      console.log("用户点击了确定");
      this.setData({
        loginOk:false
      })
      //清空登录的缓存
			wx.setStorageSync('userInfo', null)
			wx.navigateTo({
				url: '../../Login1/Login1',
			})
      }else if(res.cancel){
        console.log("用户点击了取消");
      }
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options){
		var l1ist = wx.getStorageSync('userInfo')
		this.setData({
			ava : l1ist.avatarUrl
		})
		// console.log("这里的options",options);
    // this.setData({
    //   nickName:options.nickName,
		// 	avatarUrl:options.avatarUrl,
		// 	})
  },
   //在传递参数的页面文件js中



	
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady(){
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow(){
		let userInfo = wx.getStorageSync('userInfo')
    console.log("我的缓存信息",userInfo)
    if(userInfo){
      this.setData({
        loginOk:true,
        nickName:userInfo.nickName,   //从缓存中拿数据
        avatarUrl:userInfo.avatarUrl
      })
    }else{
      this.setData({
        loginOk:false
      })
    }
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload(){

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh(){

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
