// pages/Teacher/TMes/TMes.js
var util = require('../../../util')
const db =wx.cloud.database()
const _ = db.command
var ParList=[]
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imageSrc: '', // 存储选择的图片路径
		time: '' ,
	  ava :''
	},
	 // 选择图片
	 chooseImage() {
    wx.chooseMedia({
      count: 3, // 只允许选择一张图片
      sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
      sourceType: ['album', 'camera'], // 可以选择从相册或拍照获取
      success: (res) => {
        console.log(res)
        // 将选择的图片路径存储到data中
        this.setData({
          imageSrc: res.tempFiles[0].tempFilePath,
        })
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },

  // 提交表单
  submitForm(e) {
		var ava = this.data.ava
		// console.log('看一下AVA',ava)
		// console.log(e)
    // 获取表单数据
		const { title, content } = e.detail.value;
		var Tclass = wx.getStorageSync('class1')
		var Tname = wx.getStorageSync('Tname')
    // 将表单数据和选择的图片路径发送到后端保存
    console.log('标题：', title);
    console.log('内容：', content);
		console.log('图片路径：', this.data.imageSrc);
		db.collection('Information').add({
			data:{
			Tname : Tname,
			Title : title,
			Content : content,
			UpTime : this.data.time,
			avatarUrl : ava,
			Tclass : Tclass,
			Readed : '否',
			Imageurl: this.data.imageSrc,
			flag : Tname+this.data.time
			}
		})
		db.collection('Parent').where({
			cclass :  Tclass
		}).get().then(res=>{
			ParList = res.data
			console.log('现在有家长一共',ParList)

			ParList.forEach((item,idx)=>{
				var Pname = item.Pname
				//console.log(Tname)
				db.collection('ReadStatus').add({
					data:{
						flag : Tname+this.data.time,
						Pname : Pname,
						readed : '否'
					}
				})
			})
		})

    // 发布成功后清空表单和图片
    this.setData({
      imageSrc: '',
		});
		// 在源页面的 JS 文件中处理表单提交事件

  
    // 处理表单提交逻辑...
    // 发布成功后，显示提示框并返回到目标页面
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000,
      success: function() {
        wx.navigateBack({
          delta : 1
        })
      }
    })

  },

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
			time: time,
			ava : options.ava
		})
		console.log('消息页面的op',options)

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