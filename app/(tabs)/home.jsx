import { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import images from "../../constants/images";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../hooks/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";

function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useGlobalContext();
  const { data: posts, refetch: refetchPosts } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    // fetch the latest videos
    refetchPosts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6 space-y-6">
            <View className="flex-row items-start justify-between mb-6">
              <View className="">
                <Text className="text-sm text-gray-100 font-pmedium">Welcome back,</Text>
                <Text className="text-2xl text-white font-psemibold">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image source={images.logoSmall} className="h-10 w-9" resizeMode="contain" />
              </View>
            </View>

            <SearchInput placeholder="Search for a video topic" />

            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="mb-3 text-lg text-gray-100 font-pregular">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

export default Home;
