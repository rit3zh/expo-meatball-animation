import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AnimatedHeaderProps {
  headerOpacity: Animated.SharedValue<number>;
  headerTitle?: string;
  headerSubtitle?: string;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  showBackButton?: boolean;
  showMenuButton?: boolean;
}

export const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  headerOpacity,
  headerTitle = "John Doe",
  headerSubtitle = "Software Developer",
  onBackPress,
  onMenuPress,
  showBackButton = true,
  showMenuButton = true,
}) => {
  const insets = useSafeAreaInsets();

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [
      {
        translateY: -10 * (1 - headerOpacity.value),
      },
    ],
  }));

  const contentOpacityStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        { paddingTop: insets.top + 8 },
        headerStyle,
      ]}
    >
      {/* Header Content */}
      <View style={styles.headerContent}>
        {/* Left Side - Back Button */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <Animated.View style={contentOpacityStyle}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onBackPress}
                activeOpacity={0.7}
              >
                <Ionicons name="chevron-back" size={24} color="#333333" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        {/* Center - Title and Subtitle */}
        <Animated.View style={[styles.centerSection, contentOpacityStyle]}>
          <Text style={styles.headerText} numberOfLines={1}>
            {headerTitle}
          </Text>
          {headerSubtitle && (
            <Text style={styles.headerSubtext} numberOfLines={1}>
              {headerSubtitle}
            </Text>
          )}
        </Animated.View>

        {/* Right Side - Menu Button */}
        <View style={styles.rightSection}>
          {showMenuButton && (
            <Animated.View style={contentOpacityStyle}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onMenuPress}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color="#333333"
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>

      {/* Bottom Border */}
      <Animated.View style={[styles.bottomBorder, contentOpacityStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "#f8f9fa",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  leftSection: {
    width: 40,
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  rightSection: {
    width: 40,
    alignItems: "flex-end",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  headerSubtext: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6b7280",
    textAlign: "center",
    marginTop: 2,
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  bottomBorder: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 0,
  },
});
