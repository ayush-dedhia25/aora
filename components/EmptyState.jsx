import { router } from "expo-router";
import { Image, Text, View } from "react-native";

import images from "../constants/images";
import CustomButton from "./CustomButton";

function EmptyState({ title, subtitle }) {
  return (
    <View className="items-center justify-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain" />
      <Text className="text-xl text-center text-white font-psemibold">{title}</Text>
      <Text className="mt-2 text-sm text-gray-100 font-pmedium">{subtitle}</Text>
      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
}

export default EmptyState;
