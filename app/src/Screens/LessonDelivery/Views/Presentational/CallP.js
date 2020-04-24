import React, { Component } from 'react';
import { View, NativeModules, Text, TouchableOpacity, Platform, StyleSheet, Dimensions } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getRegularFont, getBoldFont } from '../../../../Commons/Fonts';
import requestCameraAndAudioPermission from './permission'; 

const { Agora } = NativeModules;

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Adaptative,
  } = Agora; 

  const config = {                            //Setting config of the app
    appid: '6f5d5be0ad194b618312a64bf39bc1d1',               //Enter the App ID generated from the Agora Website
    channelProfile: 0,                        //Set channel profile as 0 for RTC
    videoEncoderConfig: {                     //Set Video feed encoder settings
      width: 720,
      height: 1080,
      bitrate: 1,
      frameRate: FPS30,
      orientationMode: Adaptative,
    },
    audioProfile: AudioProfileDefault,
    audioScenario: AudioScenarioDefault,
  };

export default class CallP extends Component {
    constructor(props) {
        super(props);
        this.state = {
          peerIds: [],                                       //Array for storing connected peers
          uid: Math.floor(Math.random() * 100),              //Generate a UID for local user
          appid: config.appid,
          channelName: props.channelName,                        //Channel Name for the current session
          joinSucceed: false,
          currwentZoomFactor: 1,                                //State variable for storing success
        };
        if (Platform.OS === 'android') {                    //Request required permissions from Android
          requestCameraAndAudioPermission().then(_ => {
          });
        }

        this.setCameraZoomIn = this.setCameraZoomIn.bind(this);
        this.setCameraZoomOut = this.setCameraZoomOut.bind(this);
      }

      componentWillUnmount () {
        if (this.state.joinSucceed) {
          RtcEngine.leaveChannel().then(res => {
            RtcEngine.removeAllListeners();
            RtcEngine.destroy();
            RtcEngine.removeEmitter();
          }).catch(err => {
            console.log("[agora]: err", err);
            RtcEngine.removeAllListeners();
            RtcEngine.destroy();
            console.log("leave channel failed", err);
          })
        } else {
          RtcEngine.removeAllListeners();
          RtcEngine.destroy();
        }
      }
      
      componentDidMount() {
        RtcEngine.on('userJoined', (data) => {
          const { peerIds } = this.state;                   //Get currrent peer IDs
          if (peerIds.indexOf(data.uid) === -1) {           //If new user has joined
            this.setState({
              peerIds: [...peerIds, data.uid],              //add peer ID to state array
            });
          }
        });
        RtcEngine.on('userOffline', (data) => {             //If user leaves
          this.setState({
            peerIds: this.state.peerIds.filter(uid => uid !== data.uid), //remove peer ID from state array
          });
        });
        RtcEngine.on('joinChannelSuccess', (data) => {                   //If Local user joins RTC channel
          RtcEngine.startPreview();                                      //Start RTC preview
          this.setState({
            joinSucceed: true,                                           //Set state variable to true
          });
        });
        RtcEngine.init(config);                                         //Initialize the RTC engine
      }
      /**
      * @name startCall
      * @description Function to start the call
      */
      startCall = () => {
        console.log('channel name', this.state.channelName);
        RtcEngine.joinChannel(this.state.channelName, this.state.uid);  //Join Channel
        RtcEngine.enableAudio();                                        //Enable the audio
      }
      /**
      * @name endCall
      * @description Function to end the call
      */
      endCall = () => {
        RtcEngine.leaveChannel();
        this.setState({
          peerIds: [],
          joinSucceed: false,
          currwentZoomFactor: 1, 
        });

        RtcEngine.destroy();
        this.props.endCall();
      }

      switchCamera = () => {
        RtcEngine.switchCamera();
      }
      /**
      * @name videoView
      * @description Function to return the view for the app
      */

      setCameraZoomIn()
      {
        this.state.currwentZoomFactor = this.state.currwentZoomFactor + 0.2;
        RtcEngine.setCameraZoomFactor(this.state.currwentZoomFactor);
      }

      setCameraZoomOut()
      {
        if(this.state.currwentZoomFactor > 1)
        {this.state.currwentZoomFactor = this.state.currwentZoomFactor - 0.2;
          RtcEngine.setCameraZoomFactor(this.state.currwentZoomFactor);
        }
      }

      videoView() {
        return (
          <View style={styles.max}>
            {
              <View style={styles.max}>
                <View style={styles.buttonHolder}>
                {(!this.state.joinSucceed) ? <TouchableOpacity title="Start Call" onPress={this.startCall} style={styles.buttonStart}>
                    <Text style={styles.buttonText}> Start Call </Text>
                  </TouchableOpacity> : null}           
                  <TouchableOpacity title="End Call" onPress={this.endCall} style={styles.buttonEnd}>
                    <Text style={styles.buttonText}> End Call </Text>
                  </TouchableOpacity>
                  {(this.state.joinSucceed) ? <TouchableOpacity title="Switch Camera" onPress={this.switchCamera} style={styles.buttonCamera}>
                    <Text style={styles.buttonText}> Switch Camera </Text>
                  </TouchableOpacity> : null}
                </View>
                {(this.state.joinSucceed && !this.props.isInstructor) ? 
                <View style={styles.buttonHolder2}>
                  <TouchableOpacity title="Zoom In" onPress={this.setCameraZoomIn} style={styles.buttonZoomIn}>
                    <Text style={styles.buttonText}> Zoom In </Text>
                  </TouchableOpacity>
                  <TouchableOpacity title="Zoom Out" onPress={this.setCameraZoomOut} style={styles.buttonCameraZoomOut}>
                    <Text style={styles.buttonText}> Zoom Out </Text>
                  </TouchableOpacity>
                  </View> : null}
                {
                  !this.state.joinSucceed ?
                    <View style={{flex: 1}}></View>
                    :
                    <View style={styles.fullView}>
                      {
                        this.state.peerIds.length > 3                   //view for four videostreams
                          ? <View style={styles.full}>
                            <View style={styles.halfViewRow}>
                              <AgoraView style={styles.half}
                                remoteUid={this.state.peerIds[0]} mode={1} />
                              <AgoraView style={styles.half}
                                remoteUid={this.state.peerIds[1]} mode={1} />
                            </View>
                            <View style={styles.halfViewRow}>
                              <AgoraView style={styles.half}
                                remoteUid={this.state.peerIds[2]} mode={1} />
                              <AgoraView style={styles.half}
                                remoteUid={this.state.peerIds[3]} mode={1} />
                            </View>
                          </View>
                          : this.state.peerIds.length > 2                   //view for three videostreams
                            ? <View style={styles.full}>
                              <View style={styles.half}>
                                <AgoraView style={styles.full}
                                  remoteUid={this.state.peerIds[0]} mode={1} />
                              </View>
                              <View style={styles.halfViewRow}>
                                <AgoraView style={styles.half}
                                  remoteUid={this.state.peerIds[1]} mode={1} />
                                <AgoraView style={styles.half}
                                  remoteUid={this.state.peerIds[2]} mode={1} />
                              </View>
                            </View>
                            : this.state.peerIds.length > 1                   //view for two videostreams
                              ? <View style={styles.full}>
                                <AgoraView style={styles.full}
                                  remoteUid={this.state.peerIds[0]} mode={1} />
                                <AgoraView style={styles.full}
                                  remoteUid={this.state.peerIds[1]} mode={1} />
                              </View>
                              : this.state.peerIds.length > 0                   //view for videostream
                                ? this.props.isInstructor ?  
                                <AgoraView style={styles.full}
                                remoteUid={this.state.peerIds[0]} mode={1} /> :
                                <AgoraView style={styles.localVideoStyle}
                                  remoteUid={this.state.peerIds[0]} mode={1} />
                                : <View style={{height: hp(10), width: wp(100)}}>
                                  <Text style={styles.noUserText}> No users connected </Text>
                                </View>
                      }
                      {(this.props.isInstructor) ? null : 
                        <AgoraView style={styles.full}
                        zOrderMediaOverlay={true} showLocalVideo={true} mode={1} />} 
                    </View>
                }
              </View>
            }
          </View>
        );
      }
      render() {

        return this.videoView();
      }
    }

    let dimensions = {                                //get dimensions of the device to use in view styles
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      };
    
      const styles = StyleSheet.create({
        max: {
            flex: 1,
            backgroundColor: '#006b31'
        },
        buttonHolder: {
            height: 100,
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },
        buttonHolder2: {
          height: 100,
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
      },
        buttonStart: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#5a9c79',
            borderRadius: 25,
        },
        buttonEnd: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: 'red',
            borderRadius: 25,
        },
        buttonCamera: {
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'blue',
          borderRadius: 25,
      },
      buttonZoomIn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'brown',
        borderRadius: 25,
    },
    buttonCameraZoomOut: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: 'purple',
      borderRadius: 25,
  },
        buttonText: {
            color: '#fff',
        },
        fullView: {
            width: dimensions.width,
            height: dimensions.height - 100,
        },
        halfViewRow: {
            flex: 1 / 2,
            flexDirection: 'row',
        },
        full: {
            flex: 1,
        },
        half: {
            flex: 1 / 2,
        },
        localVideoStyle: {
            width: 120,
            height: 150,
            position: 'absolute',
            top: 5,
            right: 5,
            zIndex: 100,
        },
        noUserText: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: '#0093E9',
        },
    });