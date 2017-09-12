import React, { PropTypes } from 'react';
import Constant from '../../helper/constant';
import {
  AsyncStorage,
  Text,
  TouchableOpacity,
  View,
  Image,
  ListView,
} from 'react-native';
import styles from './style';
import Intercom from 'react-native-intercom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

class DrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.pressLink = this.pressLink.bind(this);
  }

  closeDrawer() {
    this.props.drawerMethods.closeDrawer();
      this.props.scrollY(0);
  }

  pressLink(val) {
    if(val=="contact"){
      AsyncStorage.getItem("id").then(result => {
          Intercom.registerIdentifiedUser({ userId: result});
          console.log('stored id ' + result );
          Intercom.displayMessageComposer();
      });
      return; 
    }
    this.props.drawerMethods.closeDrawer();
    this.props.scrollY(val);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeContainer} onPress={this.closeDrawer}>
          <Image source={require('../../assets/images/cross.png')} />
        </TouchableOpacity>

          <TouchableOpacity
              style={styles.menu}
              onPress={() => this.pressLink("app")}>
            <Text style={styles.menus}>APPS</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.menu}
              onPress={() => this.pressLink("meet")}>
            <Text style={styles.menus}>MEET JOEL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={styles.menu}
              onPress={() => this.pressLink("contact")}>
            <Text style={styles.menus}>CONTACT</Text>
          </TouchableOpacity>
        <Image source={require('../../assets/images/navBottom.png')} style={{marginBottom:-15,width:Constant.screeHeight}}  />
        </View>

    );
  }
}

function mapStateToProps(state) {
  return {
    navReducer: state.navReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps,)(DrawerComponent);
