import React,{Component} from 'react';
import {View,Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,Dimensions,
    StatusBar,
    AsyncStorage,
    AppRegistry,
    Linking
} from 'react-native';
import { BlurView, VibrancyView } from 'react-native-blur'
import {Button,Icon,Card} from 'react-native-elements';
let Moniker =require('moniker-native');
import { StackNavigator } from 'react-navigation';
import Constant from '../../helper/constant';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import Intercom from 'react-native-intercom';
import Slide from './Slide';
import Crs from './Carousel';
import SplashScreen from 'react-native-splash-screen';


const SLIDE_DATA = [
    {uri:require('../../assets/images/gallery_fitgrit_1.png'),color:'green',text:'1'},
    {uri:require('../../assets/images/gallery_fitgrit_2.png'),color:'red',text:'2'},
    {uri:require('../../assets/images/gallery_fitgrit_3.png'),color:'red',text:'3'},
    {uri:require('../../assets/images/gallery_fitgrit_4.png'),color:'red',text:'4'},
]
const USA_DATA = [
    {uri:require('../../assets/images/gallery_usa_1.png'),color:'green',text:'5'},
    {uri:require('../../assets/images/gallery_usa_2.png'),color:'red',text:'6'},
    {uri:require('../../assets/images/gallery_usa_3.png'),color:'green',text:'7'},
    {uri:require('../../assets/images/gallery_usa_4.png'),color:'green',text:'8'},
]
const TKO_DATA = [
    {uri:require('../../assets/images/gallery_tko_1.png'),color:'red',text:'9'},
    {uri:require('../../assets/images/gallery_tko_2.png'),color:'red',text:'10'},
    {uri:require('../../assets/images/gallery_tko_3.png'),color:'green',text:'11'},
    {uri:require('../../assets/images/gallery_tko_4.png'),color:'green',text:'12'},
    {uri:require('../../assets/images/gallery_tko_5.png'),color:'green',text:'13'},
    {uri:require('../../assets/images/gallery_tko_6.png'),color:'green',text:'14'},
]
StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent('App', () => DarkTheme);

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;



class welComeScreen extends Component{
    static navigationOptions = (navigation) => ({
        header:null
    })

    constructor(props){
        super(props)

        this.state = {meetY:0, contactY:0, ba:10,menuXY:25}
    }
    onMenuBtnPress = (navigation) => {
        this.props.screenProps.openDrawer();
        this.props.scrollY(0);
    };

    componentDidMount(){
        //AsyncStorage.clear();
        AsyncStorage.getItem("alreadyLaunched").then(result => {
            if( result == null){
                let randomUser = makeid();
                let names = Moniker.generator([Moniker.adjective, Moniker.noun]);
                Intercom.registerIdentifiedUser({ userId: randomUser})
                Intercom.updateUser({
                    email: '',
                    name: names.choose(),
                });

                 AsyncStorage.setItem('alreadyLaunched', 'true'); 
                 AsyncStorage.setItem('id', randomUser); 
                 //this.setState({firstLaunch: true});
                Intercom.addEventListener(
                Intercom.Notifications.UNREAD_COUNT, this._onUnreadChange);
                setTimeout(function(){
                    SplashScreen.hide();
                },250);
            }
            else{
                 //this.setState({firstLaunch: false});
                 AsyncStorage.getItem("id").then(result => {
                    Intercom.registerIdentifiedUser({ userId: result});
                    Intercom.addEventListener(
                    Intercom.Notifications.UNREAD_COUNT, this._onUnreadChange);
                setTimeout(function(){
                    SplashScreen.hide();
                },250);
                }); 
            }
        }); 
        {/*Intercom.registerForPush();*/}

        this.menuPosition();

    }
    menuPosition(){
        console.log(Constant.screenWidth,Constant.screenHeight)
        if(Platform.OS === 'ios'){
            if(Constant.screenWidth >= 768 && Constant.screenHeight >= 1024){
                this.setState({menuXY:90})


            }else{
                this.setState({menuXY:25})

            }
        }
    }
    componentWillUnmount() {
    Intercom.removeEventListener(
        Intercom.Notifications.UNREAD_COUNT, this._onUnreadChange);
    }
    componentWillMount() {
       {/*Intercom.handlePushMessage();*/}
    }

    _onUnreadChange = ({ count }) => {
        {/*console.log(count);*/}
    }

    componentWillReceiveProps(nextProps){
        this.scrollToPosition(nextProps.scrollPos);

    }

    scrollToPosition = (menuType) => {
        if(menuType == "app"){
            this.refs.scrollView.scrollTo({x: 0, y: Constant.screenHeight - STATUSBAR_HEIGHT , animated: false})

        }else if(menuType == "meet"){
            this.refs.scrollView.scrollTo({x: 0, y: this.state.meetY, animated: false})
        }else if(menuType == "contact"){
            this.refs.scrollView.scrollToEnd({animated: false})
        }
        else{
            //Contact here
           // this.refs.scrollView.scrollToEnd({animated: false})
        }
    };

renderStatus(){
        if(Platform.OS === 'ios')
        return(
            <BlurView blurType="dark" blurAmount={this.state.ba} style={{position:'absolute', zIndex:999999999, width:'100%', height:STATUSBAR_HEIGHT}}/>
        )
    }

    changeBlur=()=>{
        if(this.state.ba==11)
            this.setState({ba:10});
        else 
            this.setState({ba:11});

    }

    render() {
        const {container, imgBack, imgBackLayer, outerMainVW,textStyle,miniLogo} = styles;
        return (
            <View style={container}>
                {this.renderStatus()}
            <ScrollView
                scrollEventThrottle={10}
                ref="scrollView"
                style={container} 
                onScroll={this.changeBlur}
                >
                <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.5)" />

                <Image  source={require('../../assets/images/fitgrit_bg.png')}

                        style={[{width:Constant.screenWidth,left:0,right:0,top:0},imgBack]}
                        resizeMode="stretch"
                >
                    <View style={imgBackLayer}/>
                    <View
                         style={{
                             flex:1,
                             paddingLeft: 20,
                             paddingRight:20,
                             paddingTop:50
                    }}>

                        <Image  source={require('../../assets/images/fitgrit.png')}
                                resizeMode="contain" style={[styles.logo,{marginTop:65}]}/>

                        <Text style={styles.submenu}>
                            Fitness Together
                        </Text>
                        <Text style={textStyle}>
                            FitGrit connects people nearby based on their fitness Interests.
                        </Text>
                        <View style={styles.miniLogoPositionRoot}>
                            <View style={styles.miniLogoPosition}>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/setting.png')} style={styles.miniImages}
                                            resizeMode="contain"/>
                                    <View>
                                        <Text style={styles.miniLogoTop} >SERVICES</Text>
                                        <Text style={styles.miniLogo} >/ App code</Text>
                                        <Text style={styles.miniLogo} >/ Brand Design</Text>
                                    </View>
                                </View>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/users.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.miniLogoTop} >CURRENT USERS</Text>
                                        <Text style={styles.miniLogo} >/ 16k</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.miniLogoPosition}>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/mvp.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:9}}>
                                        <Text style={styles.miniLogoTop} >MVP COST</Text>
                                        <Text style={styles.miniLogo} >/ {'<'}50k </Text>
                                    </View>
                                </View>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/invester.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.miniLogoTop} >INVESTORS AFTER MVP</Text>
                                        <Text style={styles.miniLogo} >/ Yes</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Crs data={SLIDE_DATA}/>
                        {/*<Image  source={require('../../assets/images/fifritmobile.png')} style={{width:Constant.screenWidth,*/}
                            {/*height:Constant.screenHeight-100,alignSelf:'center',marginTop:50}}*/}
                                {/*resizeMode="contain"/>*/}
                        <View style={{flex:1,justifyContent:'flex-end'}}>
                        <Image  source={require('../../assets/images/bottom.png')} style={{width:Constant.screenWidth,
                            alignSelf:'center',bottom:0}}
                            resizeMode="stretch"    />
                        </View>
                    </View>
                </Image>
                <Image  source={require('../../assets/images/usa_bg.png')}
                        style={styles.backgImage}
                >
                    <View style={imgBackLayer}/>
                    <View style={{//top:0,
                        flex:1,
                        paddingLeft: 20,
                        paddingRight:20,
                        paddingTop:50
                    }}>
                        <Image  source={require('../../assets/images/usa.png')}
                                style={[styles.logo,{width:Constant.screenWidth/1.9,marginBottom:15}]}
                                resizeMode="contain"
                        />
                        <Text style={[styles.submenu]}>
                            Local Economic Incentive
                        </Text>
                        <Text style={textStyle}>
                            An interactive database of all the local economic incentive across the USA.
                        </Text>
                        <View style={styles.miniLogoPositionRoot}>
                            <View style={styles.miniLogoPosition}>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/setting.png')} style={styles.miniImages}
                                            resizeMode="contain"/>
                                    <View>
                                        <Text style={styles.miniLogoTop} >SERVICES</Text>
                                        <Text style={styles.miniLogo} >/ App code</Text>
                                        <Text style={styles.miniLogo} >/ Brand Design</Text>
                                    </View>
                                </View>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/users.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.miniLogoTop} >CURRENT USERS</Text>
                                        <Text style={styles.miniLogo} >/ 75k</Text>
                                    </View>
                                </View>
                                </View>
                                <View style={styles.miniLogoPosition}>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/mvp.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:9}}>
                                        <Text style={styles.miniLogoTop} >MVP COST</Text>
                                        <Text style={styles.miniLogo} >/ {'<'}50k </Text>
                                    </View>
                                </View>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/invester.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:10}}>
                                        <Text style={styles.miniLogoTop} >INVESTORS AFTER MVP</Text>
                                        <Text style={styles.miniLogo} >/ Yes</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Crs data={USA_DATA}/>
                        {/*<Image  source={require('../../assets/images/usa_front.png')} style={{width:Constant.screenWidth,*/}
                            {/*height:Constant.screenHeight-150,alignSelf:'center',marginTop:50}}*/}
                                {/*resizeMode="contain"/>*/}
                        <View style={{flex:1,justifyContent:'flex-end'}}>
                            <Image  source={require('../../assets/images/bottom.png')} style={{width:Constant.screenWidth,
                                alignSelf:'center',bottom:0}}
                                    resizeMode="stretch"    />
                        </View>
                    </View>

                </Image>
                <Image  source={require('../../assets/images/tko_bg.png')}
                        style={styles.backgImage}
                >
                    <View style={imgBackLayer}/>
                    <View style={{top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        position:'absolute',
                        paddingTop:50,
                        paddingLeft: 20,
                        paddingRight:20
                    }}>
                        <Image  source={require('../../assets/images/tko.png')}
                                style={styles.logo}
                                resizeMode="contain"
                        />
                        <Text style={[styles.submenu]}>
                            {"\n"}Present Plans, Not Products
                        </Text>
                        <Text style={textStyle}>
                            TKO is used by financial advisors all over the US to generate simple, beautiful, effective retirement plans people can actually understand.
                        </Text>
                        <View style={styles.miniLogoPositionRoot}>
                            <View style={styles.miniLogoPosition}>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/setting.png')} style={styles.miniImages}
                                            resizeMode="contain"/>
                                    <View>
                                        <Text style={styles.miniLogoTop} >SERVICES</Text>
                                        <Text style={styles.miniLogo} >/ App code</Text>
                                        <Text style={styles.miniLogo} >/ Brand Design</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.miniLogoPosition}>
                                <View style={styles.miniLogoElem}>
                                    <Image  source={require('../../assets/images/mvp.png')} style={styles.miniImages}
                                            resizeMode="contain"  />
                                    <View style={{marginTop:8}}>
                                        <Text style={styles.miniLogoTop} >MVP COST</Text>
                                        <Text style={styles.miniLogo} >/ {'<'}50k</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Crs data={TKO_DATA }/>
                    </View>
                </Image>

                <View ref="_meetJoel" style={[styles.whiteBack,styles.meetContainer]} >
                    <View style={styles.meetInnerContainer}>
                        <Image  source={require('../../assets/images/lets_talk_new.png')}
                                style={styles.meetImage}
                                resizeMode="stretch"  />

                        <Text style={styles.meetText} >{"Let's talk about\n your app"}</Text>
                        <TouchableOpacity style={{marginTop:25}} onPress={()=>{Intercom.displayMessageComposer();}}>
                            <View style={{justifyContent:"center",alignItems:"center"}}>
                                <Text style ={styles.meetButton}>Message Joel</Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                </View>
                <View
                    onLayout={(event)=> {this.setState({meetY: event.nativeEvent.layout.y-60})}}
                    style={[styles.whiteBack,{zIndex:1}]} >
                    <Text  style={styles.meetJoel} >Meet Joel</Text>
                
                    <Image  source={require('../../assets/images/wedding.png')}
                            style={{marginTop:15,top:0, left:0, right:0, bottom:0,width:Constant.screenWidth,height:Constant.screenHeight/2.5}}
                            resizeMode="stretch"/>
                    <Image source={require('../../assets/images/openQuote.png')}
                           style={{marginLeft:15,marginBottom:-50,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />
                    <View style={styles.textFrame}>
                        <Text style={[styles.miniLogo2,{marginTop:-30}]} >Family First Workoholic </Text>
                        
                        <Text style={styles.textStyle2} >Joel is an MIT Educated, family first workaholic. Joel loves his k9 friends Ted, Teddy and Bentley has a beautiful wife Michelle. Recently, Joel and his beautiful wife Michelle have welcomed a brand new addition to the family, their first child, a daughter, Ari.
                        </Text>
                        <Image source={require('../../assets/images/closeQuote.png')}
                               style={{alignSelf:'flex-end',marginBottom:-50,marginRight:15,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    </View>

                </View>
                <View style={styles.whiteBack} >
                    <Image  source={require('../../assets/images/kid.png')}
                            style={{marginTop:2,left:0, right:0, bottom:0,width:Constant.screenWidth,height:Constant.screenHeight/2.5}}
                            resizeMode="stretch"/>
                    <Image source={require('../../assets/images/openQuote.png')}
                           style={{marginLeft:15,marginBottom:-Constant.screenWidth*0.25,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    <View style={styles.textFrame}>
                        <Text style={styles.miniLogo2} >A Life Long Learner</Text>
                        <Text style={styles.textStyle2} >{"When Joel isn't with his family or working, he's relaxing to his latest book on audible."}</Text>
                        <Text style={styles.textStyle2} >Some recent favorites include:</Text>
                        <Text style={[styles.textStyle2,{fontFamily:"Helvetica-LightOblique",fontStyle:"italic",marginTop:0}]} >“The Great Courses - Energy”{"\n"}“Awaken the giant within” - Tony Robbins{"\n"}“The everything store” - Life story of Jeff Bezizo{"\n"}“Elon Musk” - Life Story of Elon Musk</Text>
                        <Image source={require('../../assets/images/closeQuote.png')}
                               style={{alignSelf:'flex-end',marginTop:20,marginRight:15,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    </View>
                </View>

                <View style={styles.whiteBack} >
                    <Image  source={require('../../assets/images/macandtv.png')}
                            style={{marginTop: -Constant.screenWidth*0.20,top:0, left:0, right:0, bottom:0,width:Constant.screenWidth,height:Constant.screenHeight/2.5}}
                            resizeMode="stretch"/>
                    <Image source={require('../../assets/images/openQuote.png')}
                           style={{marginLeft:15,marginBottom:-Constant.screenWidth*0.25,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    <View style={styles.textFrame}>
                        <Text style={styles.miniLogo2} >As a writer of code </Text>
                        <Text style={styles.textStyle2}></Text>
                        <Text style={styles.textStyle2} >Joel has a passion for writing clean object oriented code with a heavy emphasis on services. Single Responsibility Principle, Low Coupling and High Cohesion are just a few of the important design principles he employs.</Text>
                        <Image source={require('../../assets/images/closeQuote.png')}
                               style={{alignSelf:'flex-end',marginTop:20,marginRight:15,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    </View>
                </View>

                <View style={styles.whiteBack} >
                    <Image  source={require('../../assets/images/beasleykids.png')}
                            style={{marginTop: -Constant.screenWidth*0.20, left:0, right:0, bottom:0,width:Constant.screenWidth,height:Constant.screenHeight/2.5}}
                            resizeMode="stretch"/>
                    <Image source={require('../../assets/images/openQuote.png')}
                           style={{marginLeft:15,marginBottom:-Constant.screenWidth*0.25,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    <View style={styles.textFrame}>
                        <Text style={styles.miniLogo2} >Beasley Foundation</Text>
                        <Text style={styles.textStyle2} >Joel’s mother passed away in February 2017. Joel and his brother Mitch wanted to do something unique with her life insurance money.</Text>
                        <Text style={styles.textStyle2} >Mitch is a Doctor, Joel makes apps.</Text>
                        <Text style={styles.textStyle2} >The month his mom passed, Joel found out that he is going to be a Dad!</Text>
                        <Text style={styles.textStyle2} >{"He went to Target to buy some children's books. Shelves contained children's books about Penguins with Hiccups and Dragons that eat Tacos."}</Text>
                        <Text style={styles.textStyle2} >Where is the smart stuff?</Text>
                        <Text style={[styles.textStyle2,{}]} >{"Mitch and Joel decided to use the money to form"} <Text style={{color: 'blue',textDecorationLine:"underline"}} onPress={() => Linking.openURL('http://BeasleyFoundation.org')} >{"BeasleyFoundation.org"}</Text> {" to design STEM related children's books and give 10k books away to orphanages, homeless pregnant woman and in-need children."}</Text>
                        <Image source={require('../../assets/images/closeQuote.png')}
                               style={{alignSelf:'flex-end',marginRight:15,width:Constant.screenWidth*0.20,height:Constant.screenWidth*0.16}} />

                    </View>

                <View ref="letstalk2" style={[{},{marginTop:-90,marginBottom:-53,zIndex:99999999,backgroundColor:"rgba(0,0,0,0)"}]} >
                    <View style={{bottom:0,width:Constant.screenWidth,height:Constant.screenHeight/2,left:0,right:0}}>
                        <Image  source={require('../../assets/images/lets_talk_new.png')}
                                style={{bottom:0,width:Constant.screenWidth,height:Constant.screenHeight/2,left:0,right:0}}
                                resizeMode="stretch"  />
                        <Text style={{marginTop:-270,textAlign:"center",fontSize:28,color:"#FFF",backgroundColor:"#2288FF"}} >{"Let's talk about\n your app"}</Text>
                        <TouchableOpacity style={{marginTop:25}} onPress={()=>{Intercom.displayMessageComposer();}}>
                            <View style={{justifyContent:"center",alignItems:"center"}}>
                                <Text style ={{borderRadius:10,paddingLeft:40,paddingRight:40,paddingTop:10,paddingBottom:10,borderStyle:"solid",borderWidth:1,borderColor:"#fff",fontSize:22,textAlign:"center",color:"#FFF",backgroundColor:"#2288FF"}}>Message Joel</Text>
                            </View>
                        </TouchableOpacity>
                     </View>
                </View>


                </View>

                <View style={outerMainVW}>
                    <Image  source={require('../../assets/images/Group_24home.png')}
                            style={styles.firstImage}
                            resizeMode={"stretch"}>
                    </Image>
                    <Image  source={require('../../assets/images/Group_22.png')}
                            style={styles.firstImageBack}
                            resizeMode={"stretch"}>
                    </Image>
                    <TouchableOpacity style={{height: 60, width: 60,
                        top:35, right:this.state.menuXY,
                        position:'absolute',
                        backgroundColor: 'transparent'}}
                                      onPress={this.onMenuBtnPress}>
                        <View/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
        );
    }
}


let fontSizeSubtitle;
let fontSizeContent; 
let fontSizeContent2;


if(Constant.deviceType() == "phone"){
    fontSizeSubtitle = Platform.OS === 'ios' ? 20 : 22;
    fontSizeContent = Platform.OS === 'ios' ? 16 : 17.5;
    fontSizeContent2 = Platform.OS === 'ios' ? 14 : 16;
}else{
    console.log('ok')
    fontSizeSubtitle = Platform.OS === 'ios' ? 28 : 30;
    fontSizeContent = Platform.OS === 'ios' ? 22 : 23.5;
    fontSizeContent2 = Platform.OS === 'ios' ? 21 : 23;
}


let styles = {
    tablet : {
    container:{
        flex:1,

    },meetJoel:{fontWeight:'400',
        marginTop:50,
        fontFamily:"Helvetica",
        color:'#2F7BCB',
        fontSize: 36,
        paddingTop:20,
        paddingBottom:20,
        textAlign:'center'
    },meetText:{marginTop:-Constant.screenHeight/3,
        textAlign:"center",
        fontSize:34,
        color:"#FFF",
        backgroundColor:"#2288FF"
    },
    meetButton:{borderRadius:10,
        paddingLeft:40,
        paddingRight:40,
        paddingTop:10,
        paddingBottom:10,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"#fff",
        fontSize:30,
        textAlign:"center",
        color:"#FFF",
        backgroundColor:"#2288FF"
    },meetImage:{bottom:0,
        width:Constant.screenWidth,
        height:Constant.screenHeight/2,
        left:0,
        right:0
    },meetInnerContainer:{bottom:0,
        width:Constant.screenWidth,
        height:Constant.screenHeight/2,
        left:0,right:0
    },meetContainer:{
        marginTop:-160,
        marginBottom:-50,
        zIndex:99999999,
        backgroundColor:"rgba(0,0,0,0)"
    },miniLogoElem:{
        flexDirection:'row',
        paddingTop:45
    },
    miniLogoPositionRoot:{
        flexDirection:'row',
        justifyContent:'flex-start',
    },  
    miniLogoPosition:{
        flexDirection:'column',
        justifyContent:'flex-start',
        width:Constant.screenWidth/2-40
    },
    firstImage:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        width:Constant.screenWidth,
        height: Constant.screenHeight/2
    },
    firstImageBack:{
        top:30,
        left:0,
        right:0,
        position:'absolute',
        width:Constant.screenWidth,
        height:Constant.screenHeight/2
    },miniImages:{
        height:61,
        width:61,
        marginLeft:40
    }
    ,
    backgImage:{
        marginTop:0,width:Constant.screenWidth,left:0,right:0,top:0,height:Constant.screenHeight*1.4
    },
    imgBack: {
        marginTop:Constant.screenHeight/2-40,
    },
    bg2: {
        marginTop:0
    },
    imgBackLayer: {
        backgroundColor: 'rgba(46, 56, 68,.74)',
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
    },
    outerMainVW: {
        height: Constant.screenHeight,
        width: Constant.screenWidth, top:0,
        left:0, position:'absolute'
    },
    textStyle:{
        fontFamily: "Helvetica",
        color: '#FFF',
        fontSize: fontSizeContent,
        marginTop: 16,
        marginLeft:40,
        marginRight:50,
        fontWeight:"400",
        backgroundColor:'transparent'
    },
        miniLogo:{
        fontFamily: "Helvetica",
        marginLeft:40,
        lineHeight:24,
        fontSize:18,
        fontWeight:"400",
        backgroundColor:'transparent',
        color:'#FFF'
    },
        miniLogoTop:{
        fontFamily: "Helvetica",
        marginLeft:40,
        fontSize:18,
        fontWeight:"500",
        backgroundColor:'transparent',
        color:'#FFF'
    },
    textStyle2:{
        fontFamily: "Helvetica",
        color: '#828E9B',
        fontSize: fontSizeContent2,
        marginLeft:60,
        marginRight:62,
        marginTop: 25,
        lineHeight: 25,
        fontWeight:"500",
        backgroundColor:'transparent'
    },

    miniLogo2:{
        fontFamily: "Helvetica",
        fontWeight:"500",
        marginLeft:60,
        marginRight:60,
        marginTop: 10,
        fontSize: 34,
        backgroundColor:'transparent',
        color:'#828E9B'
    },
    whiteBack:{
        backgroundColor:'#FFF',

    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
       
    },
    content: {
    flex: 1,
    backgroundColor: 'pink',
    height:0,
  },
  textFrame: {
    marginTop:100,
    marginBottom:100
  },logo:{
    width:Constant.screenWidth/2.7,
    height:Constant.screenHeight/8,
    marginLeft:40,
    marginTop:10,
    },
    submenu:{
        backgroundColor:'transparent',
        color:"#FFF",
        fontFamily: "Helvetica",
        marginLeft:40,
        fontSize:fontSizeSubtitle,
        fontWeight:"500"
    }
},
    phone:{
    container:{
        flex:1,

    },meetJoel:{fontWeight:'400',
        marginTop:50,
        fontFamily:"Helvetica",
        color:'#2F7BCB',
        fontSize: 28,
        textAlign:'center'
    },meetText:{marginTop:-Constant.screenHeight/2.6,
        textAlign:"center",
        fontSize:28,
        color:"#FFF",
        backgroundColor:"#2288FF"
    },
    meetButton:{borderRadius:10,
        paddingLeft:40,
        paddingRight:40,
        paddingTop:10,
        paddingBottom:10,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#fff",
        fontSize:22,
        textAlign:"center",
        color:"#FFF",
        backgroundColor:"#2288FF"
    },meetImage:{bottom:0,
        width:Constant.screenWidth,
        height:Constant.screenHeight/2,
        left:0,
        right:0
    },meetInnerContainer:{bottom:0,
        width:Constant.screenWidth,
        height:Constant.screenHeight/2,
        left:0,right:0
    },meetContainer:{
        marginTop:-160,
        marginBottom:-50,
        zIndex:99999999,
        backgroundColor:"rgba(0,0,0,0)"
    },
    miniLogoElem:{
        flexDirection:'row',
        paddingTop:25
    },    
    miniLogoPositionRoot:{
        marginLeft:20
    },
    miniLogoPosition:{

    },
    firstImage:{
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
        width:Constant.screenWidth,
        height: Constant.screenHeight
    },
    firstImageBack:{
        top:30,
        left:0,
        right:0,
        position:'absolute',
        width:Constant.screenWidth,
        height:Constant.screenHeight
    },
    miniImages:{height:44
        ,width:44
    },
    backgImage:{
        marginTop:0,width:Constant.screenWidth,left:0,right:0,top:0
    },
    imgBack: {
        marginTop:Constant.screenHeight-75,
    },
    bg2: {
        marginTop:0
    },
    imgBackLayer: {
        backgroundColor: 'rgba(46, 56, 68,.74)',
        top:0,
        left:0,
        right:0,
        bottom:0,
        position:'absolute',
    },
    outerMainVW: {
        height: Constant.screenHeight,
        width: Constant.screenWidth, top:0,
        left:0, position:'absolute'
    },
    textStyle:{
        fontFamily: "Helvetica",
        color: '#FFF',
        fontSize: fontSizeContent,
        marginTop: 16,
        marginLeft:20,
        marginRight:50,
        fontWeight:"400",
        backgroundColor:'transparent'
    },
        miniLogo:{
        fontFamily: "Helvetica",
        marginLeft:20,
        lineHeight:16,
        fontSize:12,
        fontWeight:"400",
        backgroundColor:'transparent',
        color:'#FFF'
    },
        miniLogoTop:{
        fontFamily: "Helvetica",
        marginLeft:20,
        fontSize:12,
        fontWeight:"400",
        backgroundColor:'transparent',
        color:'#FFF'
    },
    textStyle2:{
        fontFamily: "Helvetica",
        color: '#828E9B',
        fontSize: fontSizeContent2,
        marginLeft:60,
        marginRight:62,
        marginTop: 25,
        lineHeight: 25,
        fontWeight:"normal",
        backgroundColor:'transparent'
    },

    miniLogo2:{
        fontFamily: "Helvetica",
        fontWeight:"400",
        marginLeft:60,
        marginRight:60,
        marginTop: 10,
        fontSize: 27,
        backgroundColor:'transparent',
        color:'#828E9B'
    },
    whiteBack:{
        backgroundColor:'#FFF',

    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
       
    },
    content: {
    flex: 1,
    backgroundColor: 'pink',
    height:0,
  },
  textFrame: {
    marginTop:100,
    marginBottom:100
  },logo:{
    width:Constant.screenWidth/2.7,
    height:Constant.screenHeight/8,
    marginLeft:20,
    marginTop:10,
    },
    submenu:{
        backgroundColor:'transparent',
        color:"#FFF",
        fontFamily: "Helvetica",
        marginLeft:20,
        fontSize:fontSizeSubtitle,
        fontWeight:"400"
    }
}
};


console.log(Constant.deviceType())
styles=styles[Constant.deviceType()];


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function mapStateToProps(state) {
    return {
        scrollPos: state.scroll.scrollToY,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps,)(welComeScreen);
