import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { withFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { storeMessageImageSend } from '../actions'

class ImageUpload extends Component {
    state = {
        pathNewMessage: null,
    };
    handleUploadStart = () => {
        console.log("handleUploadStart");
        this.props.firebase.storage().ref('images').child("1amw.gif").getDownloadURL().then( url => {
            console.log(url);
            this.props.doStoreMessageImage('', url);
            var path = this.props.doSendMessage();
            this.setState({pathNewMessage: path});
        });
    }
    handleUploadError = (error) => {
        var messageLoading = this.props.firebase.database().ref(this.state.pathNewMessage);
        messageLoading.remove();
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        console.log("handleUploadSuccess");
        this.props.firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
            var imageUrlLoadingRef = this.props.firebase.database().ref(this.state.pathNewMessage).child('imageUrl');
            imageUrlLoadingRef.set(url);
        });
    };
    render() {
        

        return (
            <label className="fa fa-file-image-o">
                <FileUploader
                    hidden
                    accept="image/*"
                    storageRef={this.props.firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess.bind(this)}
                />
            </label>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return({
        doStoreMessageImage: (text, image) => {
            dispatch(storeMessageImageSend(text, image))
        }
    })
}
export default compose(
    withFirebase,
    connect(({firebase: { auth, profile } }) => ({
        auth, profile
    }),mapDispatchToProps)
)(ImageUpload)