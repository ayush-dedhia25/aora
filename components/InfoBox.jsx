import { Text, View } from "react-native";

function InfoBox({ title, subtitle, containerStyles, titleStyles }) {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className={`text-gray-100 text-sm text-center font-pregular`}>{subtitle}</Text>
    </View>
  );
}

export default InfoBox;
