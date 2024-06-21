import React, { useEffect, useState } from 'react';
import { StyleSheet,TextInput,ActivityIndicator, Text,Animated,ScrollView, View,Image, Button, FlatList,TouchableOpacity,Modal,TouchableWithoutFeedback, Keyboard  } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';
import MinorHeader from '../Header/MinorHeader';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import 'expo-dev-client';



const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-9624381293919157~1439949764';


const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export default function Test() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  return (

       <View style={globalStyles.container}>
          <MinorHeader title="Test Ads"/>

        <Text style={{
          textAlign:'center',
          fontSize:30,
          color:'red',
          marginTop:50,
        }}>GOOGLE ADS</Text>

    <Button
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />


<Text style={{
          textAlign:'center',
          fontSize:30,
          color:'red'
        }}>BANNER ADS</Text>





</View>
  );
}



const styles = StyleSheet.create({
 
});
