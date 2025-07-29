import React, { useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import * as conf from "@/conf";
import * as constants from "@/constants";

import { useAnimatedCanvasStyle } from "@/hooks/useAnimatedCanvasStyle";
import { useAnimationValues } from "@/hooks/useAnimationValues";
import { useImage } from "@shopify/react-native-skia";

import { AnimatedCanvas } from "@/components";
import { AnimatedHeader } from "@/components/header/AnimatedHeader";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { router, Stack } from "expo-router";

export default function UserSettings() {
  const scrollViewRef = useRef<ScrollView>(null);
  const avatarImageSource = useImage(constants.AVATAR_IMAGE_URL);
  const { width: screenWidth } = useWindowDimensions();

  const animationValues = useAnimationValues(screenWidth);
  const canvasStyle = useAnimatedCanvasStyle(animationValues.currentScrollY);

  const handleScrollChange = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    animationValues.currentScrollY.value = event.nativeEvent.contentOffset.y;
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <AnimatedHeader
        headerOpacity={animationValues.headerOpacity}
        headerTitle="Chrisanne"
        headerSubtitle="Software Developer"
        onBackPress={() => router.back()}
      />

      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScrollChange}
        {...conf.BASE_SCROLL_VIEW_CONFIG}
      >
        <AnimatedCanvas
          animationValues={animationValues}
          canvasStyle={canvasStyle}
          avatarImageSource={avatarImageSource}
          screenWidth={screenWidth}
        />
        <SettingsScreen />
      </ScrollView>
    </View>
  );
}
