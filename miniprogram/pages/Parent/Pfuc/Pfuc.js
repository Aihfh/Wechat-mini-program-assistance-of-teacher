const db = wx.cloud.database()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		query : {},
		datalist : [],
		ava: '',
	swiperList :[
	'../../../images/swiper/jx1 (2).jpeg',
	'../../../images/swiper/back.jpg'
	],
	gridList:[
		{name : '校园听力',icon: '../../../images/icon/listening.png'},
		{name : '校园媒体',icon: '../../../images/icon/media.png'},
		{name : '校园信息',icon: '../../../images/icon/message.png'},
		{name : '联系教师',icon: '../../../images/icon/phone.png'},
		{name : '我的信息',icon: '../../../images/icon/self.png'},
		{name : '班级tv',icon: '../../../images/icon/tv.png'},
	]
	},
		BtAp(){
		db.collection('Parent').where({
			avatarUrl : this.data.ava
		}).get().then(res=>{
      this.setData({
				datalist : res.data
			})
			console.log(this.data.datalist[0].Pname)
			var nne = this.data.datalist[0].Pname
			var avatarUrl = this.data.datalist[0].avatarUrl
		  wx.navigateTo({
		 	url: '../Papply/Papply?Name='+nne+'&avatarUrl='+avatarUrl
		  })
		})
	   
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		var l1ist = wx.getStorageSync('userInfo')
		 var sta=	wx.getStorageSync('statu') 
	    console.log('sta微微',sta)
		this.setData({
			ava : l1ist.avatarUrl
		})
	},
	// this.setData({
	// 	query : options
	// })
	// console.log(this.data.query)
	// },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		console.log('ggg')
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