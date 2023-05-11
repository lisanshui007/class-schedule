<template>
  <view class="mine">
    <view class="header">
      <image class="avatar" :src="user.avatar"></image>
      <view class="info">
        <view class="name">{{ user.name }}</view>
        <view class="phone">{{ user.phone }}</view>
      </view>
      <button class="edit-button" @click="showEditModal">编辑</button>
    </view>
    <view class="content">
      <view class="item" v-for="(item,index) in items" :key="index">
        <image class="icon" :src="item.icon"></image>
        <view class="name">{{ item.name }}</view>
        <view class="arrow"></view>
      </view>
    </view>
    <van-dialog v-model="showEdit" title="编辑昵称">
      <van-field label="昵称" v-model="editName"></van-field>
      <van-button type="primary" @click="editNameConfirm">确定</van-button>
    </van-dialog>
  </view>
</template>

<script>
  import { Toast, Dialog } from 'vant';
  export default {
    data() {
      return {
        user: {
          name: '',
          phone: '',
          avatar: ''
        },
        items: [
          { icon: '/static/icon/coupon.png', name: '我的优惠券', url: '/pages/coupon/coupon' },
          { icon: '/static/icon/address.png', name: '收货地址', url: '/pages/address/address' },
          { icon: '/static/icon/service.png', name: '联系客服', url: '/pages/service/service' }
        ],
        showEdit: false,
        editName: ''
      };
    },
    methods: {
      getUserInfo() {
        const db = wx.cloud.database();
        const user = db.collection('user');
        wx.getUserInfo({
          success: (res) => {
            this.user.avatar = res.userInfo.avatarUrl;
            user.where({ _openid: wx.cloud.getStorageSync('openid') }).get().then((res) => {
              if (res.data.length === 0) {
                user.add({
                  data: {
                    name: '',
                    phone: ''
                  }
                }).then((res) => {
                  this.user._id = res._id;
                });
              } else {
                this.user.name = res.data[0].name;
                this.user.phone = res.data[0].phone;
              }
            });
          }
        });
      },
      showEditModal() {
        this.showEdit = true;
        this.editName = this.user.name;
      },
      editNameConfirm() {
        if (this.editName.trim() === '') {
          Toast.fail('昵称不能为空');
          return;
        }

        const db = wx.cloud.database();
        const user = db.collection('user');
        user.doc(this.user._id).update({
          data: {
            name: this.editName
          }
        }).then(() => {
          this.user.name = this.editName;
          this.showEdit = false;
        });
      }
    },
    onShow() {
      this.getUserInfo();
    }
  };
</script>

<style lang="scss">
  .mine {
    background: #f2f2f2;
    font-size: 30rpx;
    color: #333;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      padding: 30rpx;

      .avatar {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
      }

      .info {
        margin-left: 30rpx;
      }

      .name {
        font-size: 36rpx;
      }

      .phone {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #999;
      }

      .edit-button {
        background: #ddd;
        border-radius: 8rpx;
        padding: 15rpx 30rpx;
        color: #fff;
        font-size: 28rpx;
      }
    }

    .content {
      margin-top: 30rpx;
      background: #fff;
      padding: 30rpx;

      .item {
        display: flex;
        align    -items: center;
    justify-content: space-between;
    padding: 20rpx 0;

    .icon {
      width: 50rpx;
      height: 50rpx;
      margin-right: 20rpx;
    }

    .name {
      font-size: 28rpx;
    }

    .arrow {
      width: 0;
      height: 0;
      border-top: 10rpx solid transparent;
      border-bottom: 10rpx solid transparent;
      border-left: 10rpx solid #999;
      margin-left: 20rpx;
    }
  }
}

.van-dialog {
  button {
    background: #ff5a5f;
  }
}
}
</style>