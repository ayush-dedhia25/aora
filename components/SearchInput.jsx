import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

import icons from "../constants/icons";

function SearchInput({ placeholder, initialQuery }) {
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();

  return (
    <View className="flex-row items-center w-full h-16 px-4 space-x-4 border-2 bg-black-200 rounded-2xl focus:border-secondary">
      <TextInput
        className="text-base text-white flex-1 mt-0.5 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please input something to search across database");
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

export default SearchInput;
