import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import icons from "../../constants/icons";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createVideo } from "../../lib/appwrite";

function CreateScreen() {
  const [form, setForm] = useState({ title: "", video: null, thumbnail: null, prompt: "" });
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      return Alert.alert("Error", "Please fill in all the fields");
    }

    setUploading(true);
    try {
      const video = await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="space-y-2 mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="items-center justify-center w-full h-40 px-4 bg-black-100 rounded-2xl">
                <View className="items-center justify-center border border-dashed w-14 h-14 border-secondary-100">
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="space-y-2 mt-7">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-row items-center justify-center w-full h-16 px-4 space-x-2 border-2 bg-black-100 rounded-2xl border-black-200">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to created this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateScreen;
