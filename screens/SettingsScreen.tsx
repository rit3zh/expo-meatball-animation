import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: "toggle" | "navigation" | "action";
  value?: boolean;
  color?: string;
  destructive?: boolean;
}

export const SettingsScreen: React.FC &
  React.FunctionComponent = (): React.ReactNode & React.JSX.Element => {
  const [settings, setSettings] = useState<{ [key: string]: boolean }>({
    notifications: true,
    darkMode: false,
    faceId: false,
    analytics: true,
    autoBackup: true,
    location: false,
  });

  const headerScale = useSharedValue(1);
  const sectionOpacity = useSharedValue(1);

  const toggleSetting = (settingId: string) => {
    setSettings((prev) => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));

    headerScale.value = withSpring(0.98, {}, () => {
      headerScale.value = withSpring(1);
    });
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "logout":
        Alert.alert("Sign Out", "Are you sure you want to sign out?", [
          { text: "Cancel", style: "cancel" },
          { text: "Sign Out", style: "destructive", onPress: () => {} },
        ]);
        break;
      case "deleteAccount":
        Alert.alert(
          "Delete Account",
          "This action cannot be undone. All your data will be permanently deleted.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => {} },
          ]
        );
        break;
      default:
        null;
        break;
    }
  };

  const settingSections: { title: string; items: SettingItem[] }[] = [
    {
      title: "Account",
      items: [
        {
          id: "profile",
          title: "Edit Profile",
          subtitle: "Update your personal information",
          icon: "person-outline",
          type: "navigation",
        },
        {
          id: "subscription",
          title: "Subscription",
          subtitle: "Manage your premium plan",
          icon: "card-outline",
          type: "navigation",
          color: "#F59E0B",
        },
        {
          id: "billing",
          title: "Billing & Payments",
          subtitle: "Payment methods and history",
          icon: "wallet-outline",
          type: "navigation",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          title: "Push Notifications",
          subtitle: "Receive updates and alerts",
          icon: "notifications-outline",
          type: "toggle",
          value: settings.notifications,
        },
        {
          id: "darkMode",
          title: "Dark Mode",
          subtitle: "Use dark theme",
          icon: "moon-outline",
          type: "toggle",
          value: settings.darkMode,
        },
        {
          id: "language",
          title: "Language",
          subtitle: "English (US)",
          icon: "language-outline",
          type: "navigation",
        },
        {
          id: "region",
          title: "Region & Currency",
          subtitle: "United States, USD",
          icon: "globe-outline",
          type: "navigation",
        },
      ],
    },
    {
      title: "Security & Privacy",
      items: [
        {
          id: "faceId",
          title: "Face ID",
          subtitle: "Use Face ID to unlock",
          icon: "scan-outline",
          type: "toggle",
          value: settings.faceId,
          color: "#10B981",
        },
        {
          id: "twoFactor",
          title: "Two-Factor Authentication",
          subtitle: "Add an extra layer of security",
          icon: "shield-checkmark-outline",
          type: "navigation",
          color: "#10B981",
        },
        {
          id: "privacy",
          title: "Privacy Settings",
          subtitle: "Control your data visibility",
          icon: "lock-closed-outline",
          type: "navigation",
        },
        {
          id: "location",
          title: "Location Services",
          subtitle: "Allow location access",
          icon: "location-outline",
          type: "toggle",
          value: settings.location,
        },
      ],
    },
    {
      title: "Data & Storage",
      items: [
        {
          id: "autoBackup",
          title: "Auto Backup",
          subtitle: "Automatically backup your data",
          icon: "cloud-upload-outline",
          type: "toggle",
          value: settings.autoBackup,
          color: "#3B82F6",
        },
        {
          id: "analytics",
          title: "Analytics",
          subtitle: "Help improve the app",
          icon: "analytics-outline",
          type: "toggle",
          value: settings.analytics,
        },
        {
          id: "storage",
          title: "Storage Usage",
          subtitle: "2.4 GB used of 5 GB",
          icon: "server-outline",
          type: "navigation",
        },
        {
          id: "exportData",
          title: "Export Data",
          subtitle: "Download your data",
          icon: "download-outline",
          type: "action",
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          title: "Help Center",
          subtitle: "Get help and support",
          icon: "help-circle-outline",
          type: "navigation",
        },
        {
          id: "feedback",
          title: "Send Feedback",
          subtitle: "Share your thoughts",
          icon: "chatbubble-outline",
          type: "action",
        },
        {
          id: "contact",
          title: "Contact Us",
          subtitle: "Get in touch with our team",
          icon: "mail-outline",
          type: "navigation",
        },
        {
          id: "about",
          title: "About",
          subtitle: "Version 2.1.0",
          icon: "information-circle-outline",
          type: "navigation",
        },
      ],
    },
    {
      title: "Account Actions",
      items: [
        {
          id: "logout",
          title: "Sign Out",
          icon: "log-out-outline",
          type: "action",
          color: "#F59E0B",
        },
        {
          id: "deleteAccount",
          title: "Delete Account",
          subtitle: "Permanently delete your account",
          icon: "trash-outline",
          type: "action",
          destructive: true,
          color: "#EF4444",
        },
      ],
    },
  ];

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: headerScale.value }],
  }));

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
  }));

  const renderSettingItem = (item: SettingItem) => {
    const iconColor = item.destructive ? "#EF4444" : item.color || "#6B7280";
    const textColor = item.destructive ? "#EF4444" : "#1F2937";

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.settingItem}
        onPress={() => {
          if (item.type === "toggle") {
            toggleSetting(item.id);
          } else if (item.type === "action") {
            handleAction(item.id);
          } else {
            console.log(`Navigate to ${item.id}`);
          }
        }}
        activeOpacity={0.7}
      >
        <View style={styles.settingLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${iconColor}15` },
            ]}
          >
            <Ionicons name={item.icon} size={22} color={iconColor} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: textColor }]}>
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        <View style={styles.settingRight}>
          {item.type === "toggle" ? (
            <Switch
              value={item.value || false}
              onValueChange={() => toggleSetting(item.id)}
              trackColor={{ false: "#E5E7EB", true: "#3B82F680" }}
              thumbColor={item.value ? "#3B82F6" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          ) : (
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, sectionAnimatedStyle]}>
        {settingSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by rit3zh</Text>
          <Text style={styles.versionText}>Version 2.1.0 (Build 1024)</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -1,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  sectionContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 64,
    backgroundColor: "#FFFFFF",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    letterSpacing: -0.2,
  },
  settingRight: {
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 80,
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  versionText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
