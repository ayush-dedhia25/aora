import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import useAppwrite from "../../hooks/useAppwrite";
import { searchPosts } from "../../lib/appwrite";

function Search() {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6">
            <Text className="text-sm text-gray-100 font-pmedium">Search Results</Text>
            <Text className="text-2xl text-white font-psemibold">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput placeholder="Search for a video topic" initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos found for this query" />
        )}
      />
    </SafeAreaView>
  );
}

export default Search;
