import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import icons from "../constants/icons";

function FormField({ title, value, placeholder, handleChangeText, otherStyles, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row items-center w-full h-16 px-4 border-2 bg-black-200 rounded-2xl focus:border-secondary">
        <TextInput
          className="flex-1 text-base text-white font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default FormField;
