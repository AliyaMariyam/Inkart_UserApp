import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const updateProfileImage = async image => {
   // console.log("image",image)
  return new Promise(async resolve => {
    try {
     // console.log('image', image);
      const fileName = image.substring(image.lastIndexOf('/') + 1);
     // console.warn('filename', fileName);
      const pathForFirebaseStorage = await getPathForFirebaseStorage(image);
    //  console.log('pathForFirebaseStorage', pathForFirebaseStorage);

      await storage().ref(fileName).putFile(pathForFirebaseStorage);
      //This line uploads the image file to Firebase Storage using the Firebase SDK. 
      //It uses the putFile method, specifying the filename as the reference and the local file path as the source.
      await storage()
        .ref(fileName)
        .getDownloadURL()
        .then(url => {
          //console.warn('url', url);
          resolve(url);
        });
    } catch (error) {}
  });
};

const getPathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri);
  return stat.path;
};
