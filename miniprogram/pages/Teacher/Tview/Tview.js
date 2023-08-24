// pages/Teacher/Tview/Tview.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
  datalist:[]
	},
  getData(num=5,page=0){
		var class1=wx.getStorageSync('class1')
		console.log('此时class',class1)
    wx.cloud.callFunction({
    name :'GetAplist',
    data:{
      num : num,
			page : page,
			class1 : class1
    }
    //主要要从result中拿 concat拼接
  }).then(res=>{
    console.log(res)
    var oldData = this.data.datalist
    var newData = oldData.concat(res.result.data)
    this.setData({
      datalist: newData
    })
  })
  },
  clickTitle(res){

  wx.showLoading({
    title: '加载中',
    mask: true
  })
  console.log('zjhe',res.currentTarget.dataset)
  var {id,idx} = res.currentTarget.dataset
  wx.cloud.callFunction({
    name : 'HaveRead',
    data:{
      id : id
    }
  }).then(res=>{
    var newData= this.data.datalist
		newData[idx].Readed = '是'
		console.log('先写着',newData)
    this.setData({
      datalist : newData
		})
		wx.navigateTo({
			url: '../../Teacher/TeaInvestigate/TeaInvestigate?id='+id,
		})
    wx.hideLoading()
  })

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
  this.getData()
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