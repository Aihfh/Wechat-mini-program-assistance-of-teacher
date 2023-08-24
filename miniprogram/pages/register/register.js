const db = wx.cloud.database()
const _ = db.command
Page({

	/**
	 * 页面的初始数据
	 */

	data: {
		select: false,
		class1: '选择班级',
    sex:[{name:'0',value:'男',checked:'true'},{name:'1',value:'女'}],
    isSex:"0",
    information:[],
    userSex:'',
		modalHidden:true,
		avatarUrl:"",
		Wech:''
},

radioChange(e){
	console.log(e.detail.value);
	var sexName=this.data.isSex
	this.setData({
		isSex:e.detail.value
	})
},
//表单提交
formSubmit(e){
	console.log(e);
	var userSex=this.data.isSex==0?'男':'女';
	var Pname= e.detail.value.name;
	var Pphone = e.detail.value.phone
	console.log(userSex);
	this.setData({
		// information: e.detail.value,
		Pname,
		Pphone,
		userSex,
		modalHidden:false
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
	wx.cloud.callFunction({
		name : 'AddParent',
	  data:{
			Wech : this.data.Wech,
			avatarUrl : this.data.avatarUrl,
			Pname : this.data.Pname,
			Pphone :this.data.Pphone,
			userSex : this.data.userSex,
			cclass :this.data.class1
		}
	})
	// .then(res=>{
	// 	this.setData({
	// 	// information: e.detail.value,
	// 	Pname,
	// 	Pphone,
	// 	userSex,
	// 	modalHidden:false
	// 	 	})
	// })
	this.setData({
		modalHidden: true
	})
	wx.setStorageSync('class1', this.data.class1)
	wx.redirectTo({
		url: '../Parent/Pfuc/Pfuc',
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
	onLoad(options) {
		console.log("这里的options",options.avatarUrl,options.Wech);
    this.setData({
			avatarUrl:options.avatarUrl,
			Wech : options.Wech
			})
		// db.collection()
		
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