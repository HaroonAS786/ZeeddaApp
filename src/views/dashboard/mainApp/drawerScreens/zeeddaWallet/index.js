// import {
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Platform,
//   FlatList,
// } from 'react-native';
// import React from 'react';
// import getStyles from './styles';
// import LayoutContainer from '../../../../../components/layoutContainer';
// import {TextElement} from '../../../../../components/TextElement';
// import {Colors, Mixins} from '../../../../../styles';
// import Spacer from '../../../../../components/Spacer';
// import {UploadProductSVGComponent} from '../../../../../assets/svgs';
// import InputTextComponent from '../../../../../components/InputTextField';
// import ButtonComponent from '../../../../../components/buttonComponent';
// import ViewHeader from '../../../../../components/viewHeader';
// import RippleEffect from '../../../../../components/rippleEffect';
// import InventoryCard from './components/inventoryCard';

// const ManageInventoryScreen = props => {
//   const styles = getStyles();
//   return (
//     <View style={styles.mainWrap}>
//       <ViewHeader
//         label={'Inventory'}
//         onPress={() => props.navigation.goBack()}
//       />

//       {Platform.OS === 'ios' ? (
//         <Spacer height={Mixins.scaleSize(35)} />
//       ) : (
//         <Spacer height={Mixins.scaleSize(45)} />
//       )}

//       <RippleEffect
//         style={styles.addNewInventory}
//         onPress={() => props.navigation.navigate('NewInventoryScreen')}>
//         <TextElement fontType={'h9'} textStyle={styles.addNewInventoryLabel}>
//           Add New Inventory
//         </TextElement>
//       </RippleEffect>

//       <Spacer height={Mixins.scaleSize(35)} />
//       <View style={{paddingHorizontal: 16, width: '100%'}}>
//         <FlatList
//           data={[0, 1, 2, 3]}
//           renderItem={({index, item}) => {
//             return <InventoryCard />;
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default ManageInventoryScreen;
