import {
  LOGIN,
  SIGHNOUT,
  UPDATEPROFILE,
  SHOWCATEGORIES,
  UPDATECARTCOUNT,
  GETPRODUCTID,
  UPDATEWISHIDS
} from './constants';

const initialState = {
  isLoggedIn: false,
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  profileImage: '',
  categories: [],
  cartCount: 0,
   wishIds:[],
};

export const inkartReducer = (state = initialState, action) => {
  //console.log('action.payload', action.payload);
  switch (action.type) {
    case LOGIN:
      //  const {userId,firstName, lastName, email,mobileNumber,profileImage} = action.payload;
      return {
        ...state,
        userId: action.payload.userId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        profileImage: action.payload.profileImage,
        isLoggedIn: true,
      };
    case SIGHNOUT:
      return {
        ...state,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        profileImage: '',
        isLoggedIn: false,
      };
    case UPDATEPROFILE:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        mobileNumber: action.payload.mobileNumber,
        profileImage: action.payload.profileImage,
      };
    case SHOWCATEGORIES:
      return {
        ...state,
        categories: [...action.payload.categories],
      };

    case UPDATECARTCOUNT:
      console.log('UPDATE COUNT action.payload', action.payload);
      return {
        ...state,
        cartCount: action.payload.cartCount,
      };

    case UPDATEWISHIDS:
      return {
        ...state,
        wishIds: action.payload.wishIds,
      };

    default:
      return state;
  }
};
