const db = wx.cloud.database()
const _ = db.command
Page({

	/**
	 * 页面的初始数据
	 */

	data: {
		select: false,
		modalHidden:true,
		avatarUrl:"",
	  Pname : '',
		Pclass : '',
		Pphone : '',
		Id : ''
},

//表单提交
formSubmit(e){
	console.log(e);
	var Id = this.data.Id
	var phone1 = e.detail.value.phone
	console.log(phone1)
	
	db.collection('Parent').doc(Id).update({
		data:{
    Pphone : phone1
		}
	}).then(res=>{
		console.log('来个反馈',res)
		this.setData({
		Pphone:phone1,
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
		Pphone : this.data.Pphone,
		modalHidden:true,
	})
},
//模态框确定
modalConfirm() {
	wx.showToast({
		title: '提交成功',
		icon:'success'
	})
	
	wx.redirectTo({
		url: '../Pfuc/Pfuc',
	})
	this.setData({
		modalHidden: true
	})
},

bindShowMsg() {
		 this.setData({
				 select:!this.data.select
		 })
},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		//avatarUrl+'&phone='+phone+'&name='+name1+'&class1='+class1
		console.log("这里的options",options.avatarUrl,options.phone,options.name,options.class1);
    this.setData({
			avatarUrl:options.avatarUrl,
			Pname : options.name,
			Pclass : options.class1,
			Pphone : options.phone,
			Id : options.id
			})
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		if (typeof this.getTabBar === 'function' &&
		this.getTabBar()) {
		this.getTabBar().setData({
			selected: 0
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
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

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