const db = wx.cloud.database()
const _ = db.command
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
		swiperList :[
			'../../images/swiper/jx1 (1).png',
			'../../images/swiper/jx1 (3).jpeg',
			'../../images/swiper/jx1 (2).jpeg'
			],
	},
	
// 	loginByParent(){
// 		wx.getUserProfile({
// 		 desc: '家长登录',
// 		}).then(res=>{
// 		console.log("用户允许了微信授权登录",res.userInfo); 
// 	 //注意：此时不能使用 wx.switchTab，不支持参数传递
// 	//  wx.reLaunch({
// 	// 	 //将微信头像和微信名称传递给【我的】页面
// 	// 	 url: '/pages/LoginInfo/LoginInfo?nickName='+res.userInfo.nickName+'&avatarUrl='+res.userInfo.avatarUrl,
// 	//  })
// 	 wx.setStorageSync('userInfo', res.userInfo)
// 	 this.Isregisted()
// 	 }).catch(err=>{
// 		 console.log("用户拒绝了微信授权登录",err);
// 	 })
//  },
getUserInfo(res){
		console.log('用户个人信息',res.detail.userInfo);
		wx.setStorageSync('userInfo', res.detail.userInfo)
		 wx.setStorageSync('statu', 'par')
		 wx.showLoading({
			title: '登录中',
		})
		var nickName = res.detail.userInfo.nickName
		var avatarUrl = res.detail.userInfo.avatarUrl
		db.collection('Teacher').where({
			avatarUrl : res.detail.userInfo.avatarUrl
		})
		.get().then(res=>{
			console.log('查询当前用户',res)
			if(res.data.length == 0){
				console.log('没查到')
				wx.reLaunch({
					//将微信头像和微信名称传递给【我的】页面
				url: '../Teacher/TeacherLoginInf/TeacherLoginInf?nickName='+nickName+'&avatarUrl='+avatarUrl,
	})
			}else{
				console.log('查到了')
				
				wx.reLaunch({
							//将微信头像和微信名称传递给【我的】页面
						url: '../Teacher/Tfuc/Tfuc?nickName='+nickName+'&avatarUrl='+avatarUrl,
			})
			wx.hideLoading()
		}
	 })
     
	},
	

loginByTeacher(){
	wx.getUserProfile({
	 desc: '班主任登录',
	 success:(res=>{
		 console.log("用户允许了微信授权登录",res.userInfo);
		 wx.setStorageSync('userInfo', res.userInfo)
     wx.setStorageSync('statu', 'tea')
		 wx.showLoading({
			title: '登录中',
		})
     this.Tearegisted(res)
	 })
	})
 //注意：此时不能使用 wx.switchTab，不支持参数传递
//  wx.reLaunch({
// 	 //将微信头像和微信名称传递给【我的】页面
// 	 url: '/pages/LoginInfo/LoginInfo?nickName='+res.userInfo.nickName+'&avatarUrl='+res.userInfo.avatarUrl,
//  })
		},
		Tearegisted(res){
			wx.getStorage({
				key: 'userInfo',
				success (res) {
					console.log('看看这里',res.data.nickName)
				}
			})
			var nickName = res.userInfo.nickName
			var avatarUrl = res.userInfo.avatarUrl
			db.collection('Teacher').where({
				avatarUrl : res.userInfo.avatarUrl
			})
			.get().then(res=>{
				console.log('查询当前用户',res)
				if(res.data.length == 0){
					console.log('没查到')
					wx.reLaunch({
						//将微信头像和微信名称传递给【我的】页面
					url: '../Teacher/TeacherLoginInf/TeacherLoginInf?nickName='+nickName+'&avatarUrl='+avatarUrl,
		})
				}else{
					console.log('查到了')
					console.log('老师的班级是',res.data[0].Tclass)
					console.log('老师的姓名是',res.data[0].Tname)
					wx.setStorageSync('class1', res.data[0].Tclass)
					wx.setStorageSync('Tname', res.data[0].Tname)
					wx.reLaunch({
								//将微信头像和微信名称传递给【我的】页面
							url: '../Teacher/Tfuc/Tfuc?nickName='+nickName+'&avatarUrl='+avatarUrl,
				})
				wx.hideLoading()
			}
		 })
		},


 loginByParent(){
	wx.getUserProfile({
	 desc: '家长登录',
	 success:(res=>{
		 console.log("用户允许了微信授权登录",res.userInfo);
		 wx.setStorageSync('userInfo', res.userInfo)
		 wx.setStorageSync('statu', 'par')
		 wx.showLoading({
			title: '登录中',
		})
     this.Isregisted(res)
	 })
	})
 //注意：此时不能使用 wx.switchTab，不支持参数传递
//  wx.reLaunch({
// 	 //将微信头像和微信名称传递给【我的】页面
// 	 url: '/pages/LoginInfo/LoginInfo?nickName='+res.userInfo.nickName+'&avatarUrl='+res.userInfo.avatarUrl,
//  })
		},
  Isregisted(res){
		wx.getStorage({
			key: 'userInfo',
			success (res) {
				console.log('看看这里',res.data.nickName)
			}
		})
	
		var nickName = res.userInfo.nickName
		var avatarUrl = res.userInfo.avatarUrl
		db.collection('Parent').where({
			avatarUrl : res.userInfo.avatarUrl
		})
		.get().then(res=>{
			console.log('查询当前用户',res)
			if(res.data.length == 0){
				console.log('没查到')
				wx.reLaunch({
					//将微信头像和微信名称传递给【我的】页面
				url: '/pages/LoginInfo/LoginInfo?nickName='+nickName+'&avatarUrl='+avatarUrl,
	})
			}else{
			
				wx.reLaunch({
					 	 //将微信头像和微信名称传递给【我的】页面
						// url: '/pages/LoginInfo/LoginInfo?nickName='+nickName+'&avatarUrl='+avatarUrl,
						url: '../Parent/Pfuc/Pfuc?nickName='+nickName+'&avatarUrl='+avatarUrl,
			})
			wx.hideLoading()
		}
	 })
	 
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

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