import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import icons from "../../constants/icons";

const TabIcon = ({ icon, color, name, focused }) => (
  <View className="items-center justify-center gap-2">
    <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
    <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color }}>
      {name}
    </Text>
  </View>
);

function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232522",
            height: 85,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

export default TabsLayout;
