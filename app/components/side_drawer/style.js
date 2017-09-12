import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
      justifyContent:'space-between',
    backgroundColor: '#fff',
      overflow: 'hidden',
      zIndex: 1000,
  },

  closeContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 40,
  },

  menus: {
    color: '#3a99f2',
    fontSize: 30,
    textAlign:'center',
  },
  menu:{
    flex:1,
      justifyContent:'center'
  },
  text: {
    color: '#3a99f2',
    fontSize:30
  },
});

export default styles;
