const db = wx.cloud.database()
const _ = db.command
Page({

	/**
	 * 页面的初始数据
	 */

	data: {
		select: false,
		class1: '请假类型',
    information:[],
		modalHidden:true,
		avatarUrl:"",
		Wech:'',
		Info :'',
		nickName:'',
		ClassNow:''
},

//表单提交
formSubmit(e){
	console.log(e);
	var Pname= this.data.nickName;
	var Content = e.detail.value.content
	var myDate = new Date();
	var time1 = myDate.toLocaleTimeString()
	console.log(Pname,Content,time1,this.data.avatarUrl);
	db.collection('Prequest').add({
		data:{
		Pname : Pname,
		Content : Content,
		UpdateTime : time1,
    avatarUrl : this.data.avatarUrl,
		Readed : '否',
		cclass:this.data.ClassNow,
		state:'未审批'
		}
		
	})
	this.setData({
		Info :Content,
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
	this.setData({
		modalHidden: true
	})
	 wx.navigateBack({
	 	delta:1
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
		console.log('看看能不能进去啊一天',options.Name,options.avatarUrl)
		var ClassNow1 = wx.getStorageSync('class1')
		this.setData({
			nickName: options.Name,
			avatarUrl:options.avatarUrl,
			ClassNow:ClassNow1
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