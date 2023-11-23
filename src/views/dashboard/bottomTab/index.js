import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, Text, View} from 'react-native';
import HomeSVGComponent from '../../../assets/svgs/homeSvg';
import MyOrderSVGComponent from '../../../assets/svgs/myOrderSvg';
import ProfileSVGComponent from '../../../assets/svgs/profileSvg';
import BellSVGComponent from '../../../assets/svgs/walletSvg';
import WalletSVGComponent from '../../../assets/svgs/walletSvg';
import Spacer from '../../../components/Spacer';
import {Colors, Mixins} from '../../../styles';
import {bottomTab, screenAnimation} from '../../../utils/helper';

const Tab = createBottomTabNavigator();

export const TabBarOptions = ({focused, svgIcon, title}) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      {svgIcon}
      <Spacer height={6} />
      <Text
        style={{
          color: focused ? Colors.PRIMARY : Colors.tabInActiveColor,
          fontSize: 12,

          fontWeight: '700',
        }}>
        {title}
      </Text>
    </View>
  );
};

const tabIconComponent = (focused, SVG, title) => (
  <TabBarOptions focused={focused} svgIcon={SVG} title={title} />
);

const renderSVG = (focused, screen) => {
  switch (screen) {
    case 'Home':
      return (
        <HomeSVGComponent
          stroke={focused ? Colors.tabActiveColor : Colors.tabInActiveColor}
        />
      );

    case 'My Order':
      return (
        <MyOrderSVGComponent
          stroke={focused ? Colors.tabActiveColor : Colors.tabInActiveColor}
        />
      );

    case 'Notification':
      return (
        <BellSVGComponent
          stroke={focused ? Colors.tabActiveColor : Colors.tabInActiveColor}
        />
      );

    case 'Profile':
      return (
        <ProfileSVGComponent
          stroke={focused ? Colors.tabActiveColor : Colors.tabInActiveColor}
        />
      );

    default:
      break;
  }
};

export default function MyBottomTabs(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        animations: screenAnimation,
        tabBarShowLabel: false,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: Colors.WHITE,
          paddingTop: 10,
          height:
            Platform.OS === 'android'
              ? Mixins.scaleSize(60)
              : Mixins.scaleSize(80),
        },
      }}>
      {bottomTab.map((item, index) => {
        return (
          <>
            <Tab.Screen
              key={index}
              options={{
                showLabel: false,
                tabBarIcon: ({focused}) =>
                  tabIconComponent(
                    focused,
                    renderSVG(focused, item.name),
                    item.name,
                  ),
              }}
              name={item.name}
              component={item.component}
            />
          </>
        );
      })}
    </Tab.Navigator>
  );
}
