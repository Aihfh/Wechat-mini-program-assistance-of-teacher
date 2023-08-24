// pages/login/login.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
  //微信授权登录
    loadByWechat(){
	     wx.getUserProfile({
	      desc: '用户完善会员资料',
	     })
	     .then(res=>{
	     console.log("用户允许了微信授权登录",res.userInfo);
      //注意：此时不能使用 wx.switchTab，不支持参数传递
      wx.reLaunch({
        //将微信头像和微信名称传递给【我的】页面
        url: '/pages/LoginInfo/LoginInfo?nickName='+res.userInfo.nickName+'&avatarUrl='+res.userInfo.avatarUrl,
      })
      //保存用户登录信息到缓存
      wx.setStorageSync('userInfo', res.userInfo)
      })
      .catch(err=>{
        console.log("用户拒绝了微信授权登录",err);
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