const db = wx.cloud.database()
const _ = db.command
Page({
  /**
   * 页面的初始数据
   */
  data: {
		datalist:[],
  },
	Upup1(){
var class1=wx.getStorageSync('class1')
		console.log('此时class',class1)
    wx.cloud.callFunction({
    name :'GetMes',
    data:{
			class1 : class1
    }
    //主要要从result中拿 concat拼接
  }).then(res=>{
    console.log(res)
   var newData = res.result.data
		console.log('看看看看',newData)
    this.setData({
      datalist: newData
    })
  })
	},
  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 点击通知列表项后跳转到通知详情页面
   */
  onViewNotice(res) {
		wx.showLoading({
    title: '加载中',
    mask: true
	})
	console.log('res睡',res)
  console.log('zjhe',res.currentTarget.dataset)
	var {id,idx} = res.currentTarget.dataset
	console.log(id)
	db.collection('Information').doc(id).update({
		data:{
				Readed: '是'
		}
	
	})
		wx.navigateTo({
			url: '../../Parent/Pmore/Pmore?id='+id,
		})
    wx.hideLoading()
  },
  onLoad(options){
		
  }
})
