import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  path:string = 'assets/imgs/dimg.png';
  constructor(public navCtrl: NavController, private camera:Camera, private imagePicker:ImagePicker,private crop: Crop) {

  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((url) => {
     this.path = url;
    }, (err) => {
     // Handle error
    });
  }

  cropImage(){
    const options: CameraOptions = {
      quality: 72,
      targetWidth:592,
      targetHeight:396
    }
    
    this.crop.crop(this.path, options)
    .then(
      newImage => this.path= newImage,
      error => console.error('Error cropping image', error)
    );
  }

  chooseImage(){
    const options = {
      title: 'Select Picture',
      message: 'Select atleat 1 image',
      maximumImagesCount:1,
      outType: 0,
      quality:72,
      height:396,
      width:592
    }
    
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.path = results[i];
      }
    }, (err) => { });
  }
}
