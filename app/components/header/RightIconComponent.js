import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
    Image,
    Text,
} from 'react-native';


const styles = StyleSheet.create({
  rightIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});

class RightIconComponent extends React.Component {
  constructor() {
    super();
    this.pressIcon = this.pressIcon.bind(this);
  }

  pressIcon() {
      this.props.screenProps.openDrawer();
  }

  render() {
    const { name, color } = this.props;

    return (
      <TouchableOpacity style={styles.rightIcon} onPress={this.pressIcon}>
        <Text>=</Text>
      </TouchableOpacity>
    );
  }
}

export default RightIconComponent;
