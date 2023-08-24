const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		select: false,
		modalHidden:true,
		class1:'教学班级',
		loginOk:true,
    nickName:"",
		avatarUrl:"",
	},
	
formSubmit(e){
		console.log(e);
		var Tname= e.detail.value.name;
		var Tphone = e.detail.value.phone
		var Tcla = this.data.class1
		wx.setStorageSync('class1', Tcla)
		wx.setStorageSync('Tname', Tname)
		db.collection('Teacher').add({
			data:{
			Tname : Tname,
			Tphone : Tphone,
			avatarUrl : this.data.avatarUrl,
			Tclass : this.data.class1
			}
		}).then(res=>{
			this.setData({
			// information: e.detail.value,
			Tname,
			Tphone,
			modalHidden:false
				 })
		})
		
	},
	//模态框取消
	modalCancel(){
		wx.showToast({
			title: '取消提交',
			icon:'none'
		})
		this.setData({
			modalHidden:true,
		})
	},
	//模态框确定
	modalConfirm() {
		wx.showToast({
			title: '提交成功',
			icon:'success'
		})
	
		this.setData({
			modalHidden: true
		})
		wx.redirectTo({
			url: '../Tfuc/Tfuc',
		})
	},
	

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
      }else if(res.cancel){
        console.log("用户点击了取消");
      }
    })
	},
	

	bindShowMsg() {
		this.setData({
				select:!this.data.select
		})
},
mySelect(e) {
	 var cclass = e.currentTarget.dataset.cclass1
	 this.setData({
			 class1 : cclass,
			 select: false
	 })
	 console.log(cclass)
},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options){
		var l1ist = wx.getStorageSync('userInfo')
		this.setData({
			avatarUrl : l1ist.avatarUrl
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
