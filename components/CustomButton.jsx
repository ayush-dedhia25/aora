import { Text, TouchableOpacity } from "react-native";

function CustomButton({ title, handlePress, containerStyles, textStyles, isLoading }) {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-lg text-primary font-pbold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
