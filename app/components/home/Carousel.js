import React,{Component} from 'react';
import {View,Text,ScrollView,Dimensions,Image,TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;
import PageControl from 'react-native-page-control';
import Constant from '../../helper/constant';
import Carousel from 'react-native-looped-carousel';

class Crs extends Component{

    constructor(props)
    {
        super(props)
        this.state = {}
    }
    find_dimesions(layout){
        const {x, y, width, height} = layout;
        this.setState({slideImgWidth:width})
    }
    renderSlideData()
    {
        return this.props.data.map(data =>{
            return(
                <View key={data.text} style={{height:395}}>
                    <Image source={data.uri} style={{height:397,width:this.state.slideImgWidth}}  resizeMode="contain"  />
                </View>
            )
        })
    };

    onLeftBtnPress = (navigation) => {
        var pageNum = this.refs.swipeImage.getCurrentPage()
        let toGo = this.props.data.length - 1;
        if(pageNum > 0){
          toGo = pageNum - 1;
        }
        this.refs.swipeImage.animateToPage(toGo)
    };

    onRightBtnPress = (navigation) => {
        var pageNum = this.refs.swipeImage.getCurrentPage()
        let count = this.props.data.length - 1;
        var toGo = 0;
        if(pageNum < count){
          toGo = pageNum + 1;
        }
        this.refs.swipeImage.animateToPage(toGo)
    };

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    };
    render() {
        return(
            <View style={{height:570,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:50}} onLayout={this._onLayoutDidChange}>
                <TouchableOpacity
                style={{marginLeft:0}}
                 onPress={()=>this.onLeftBtnPress()}>
                    <Image source={require('../../assets/images/arrowLeft.png')}/>
                </TouchableOpacity>
                <View style={{width:255,marginLeft:-2}}>
                   <Image
                        style={{height:567,flex: 1,alignSelf: 'stretch',margin:0}}
                        resizeMode={'contain'}
                        source={require('../../assets/images/phone_frame.png')}>
                        <View
                          onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                          style={{marginTop:60,borderRadius:0,marginLeft:16,marginRight:18}}
                        >
                          <Carousel
                            ref="swipeImage"
                            autoplay={false}
                            style={{width:this.state.slideImgWidth,height:397}}
                          >
                            {this.renderSlideData()}
                          </Carousel>
                        </View>
                    </Image>
                </View>
                <TouchableOpacity onPress={()=>this.onRightBtnPress()}>
                    <Image source={require('../../assets/images/arrowRight.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Crs;
