import { LOGIN, SIGHNOUT,UPDATEPROFILE,SHOWCATEGORIES,UPDATECARTCOUNT, GETWISHLIST, UPDATEWISHIDS } from "./constants"

export const login = data =>({
    type:LOGIN,
    payload:{
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        mobileNumber:data.mobileNumber,
        profileImage:data.profileImage,
        userId:data.userId,
    }
})

export const signout = data =>({
    type:SIGHNOUT,
    payload:{},
})

export const updateProfile = data =>({
    type:UPDATEPROFILE,
    payload:{
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        mobileNumber:data.mobileNumber,
        profileImage:data.profileImage,
        userId:data.userId,
    }
})

export const showCategories = data =>({
    type:SHOWCATEGORIES,
    payload:{
        categories:data
    }
})


export const updateCartCount = data =>({
    type:UPDATECARTCOUNT,
    payload:{
        cartCount:data
    }
})


export const updateWishIds = data =>({
    type:UPDATEWISHIDS,
    payload:{
        wishIds:data
    }
})