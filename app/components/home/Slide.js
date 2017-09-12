import React,{Component} from 'react';
import {View,Text,ScrollView,Dimensions,Image,TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;
import PageControl from 'react-native-page-control';
import Constant from '../../helper/constant';


class Slide extends Component{

    constructor(props)
    {   
        super(props)
        this.state = {
            pageNum:0,
            slideImgWidth:500
        }
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
                    {/*<View style={{justifyContent:'center',alignItems:'center'}}>*/}
                    <Image source={data.uri} style={{height:397,width:this.state.slideImgWidth}}  resizeMode="contain"  />

                    {/*</View>*/}
                </View>

            )
        })
    };

    onItemTap = (page) => {
        console.log('page:',page);
        switch (page)
        {
            case 0:
                console.log('page',page);
                this.refs.swipeImage.scrollTo({x:0,y:0,animated: true})
            case 1:
                console.log('page',page);
                this.refs.swipeImage.scrollTo({x:SCREEN_WIDTH,y:0})
            // this.setState({contentOffset:SCREEN_WIDTH});
            case 2:
                console.log('page',page);
                this.refs.swipeImage.scrollTo({x:SCREEN_WIDTH * 2,y:0})
            //  setState({contentOffset:SCREEN_WIDTH * 2});
        }
    };

    onLeftBtnPress = (navigation) => {

        if(this.state.pageNum != 0){
            this.setState({
                pageNum: --this.state.pageNum
            });
            this.refs.swipeImage.scrollTo({x:this.state.slideImgWidth*(this.state.pageNum),y:0,animated: true})
        }
            else{
            this.setState({
                pageNum: this.props.data.length - 2
            })
            this.refs.swipeImage.scrollTo({x:this.state.slideImgWidth*(this.props.data.length - 1),y:0,animated: false})

        }
    };

    onRightBtnPress = (navigation) => {

        let count = this.props.data.length - 1;
        if(this.state.pageNum < count){
            this.setState({
                pageNum: ++this.state.pageNum
            });
            this.refs.swipeImage.scrollTo({x:this.state.slideImgWidth*(this.state.pageNum),y:0,animated: true})
        }
        else{
            this.setState({ pageNum: 1})
            this.refs.swipeImage.scrollTo({x:this.state.slideImgWidth*(0),y:0,animated: false})
        }
    };


    render() {

        return(
            <View style={{height:570,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:50}}>

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
                        <ScrollView
                            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                            style={[style.containerView,{marginTop:60,borderRadius:0,marginLeft:16,marginRight:18}]}
                            horizontal = {true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            ref="swipeImage">
                            {this.renderSlideData()}
                        </ScrollView>
                    </Image>
                </View>
                <TouchableOpacity onPress={()=>this.onRightBtnPress()}>
                    <Image source={require('../../assets/images/arrowRight.png')}/>
                </TouchableOpacity>

                {/*<PageControl style={{position:'relative', left:0, right:0, bottom:10}}*/}
                {/*numberOfPages={4}*/}
                {/*currentPage={this.state.pageNum}*/}
                {/*hidesForSinglePage={true}*/}
                {/*pageIndicatorTintColor='gray'*/}
                {/*currentPageIndicatorTintColor='green'*/}
                {/*indicatorStyle={{borderRadius: 5}}*/}
                {/*currentIndicatorStyle={{borderRadius: 5}}*/}
                {/*indicatorSize={{width:8, height:8}}*/}
                {/*onPageIndicatorPress={this.onItemTap} />*/}
            </View>

        )
    }
}

const style = {
    containerView:{




    }
}

export default Slide;