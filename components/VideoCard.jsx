import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import icons from "../constants/icons";

function VideoCard({ video: { title, thumbnail, video, creator } }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="flex-row items-center justify-center flex-1">
          <View className="w-[46px] h-[46px] border border-secondary rounded-lg justify-center items-center p-0.5">
            <Image
              source={{ uri: creator?.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-sm text-white font-psemibold" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {creator?.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {isPlaying ? (
        <Video
          source={{ uri: video }}
          className="w-full mt-3 h-60 rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
            }
          }}
          useNativeControls
          shouldPlay
        />
      ) : (
        <TouchableOpacity
          className="relative items-center justify-center w-full mt-3 h-60 rounded-xl"
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full mt-3 rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12 rounded-xl"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default VideoCard;
