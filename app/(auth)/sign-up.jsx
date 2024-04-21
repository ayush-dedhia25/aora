import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import images from "../../constants/images";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createUser } from "../../lib/appwrite";

function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const onSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setSubmitting(true);

    try {
      const result = await createUser(form.username, form.email, form.password);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View
          className="flex justify-center w-full h-full px-4 my-6"
          style={{ minHeight: Dimensions.get("window").height - 100 }}
        >
          <Image source={images.logo} className="w-[115px] h-[34px]" resizeMode="contain" />

          <Text className="mt-10 text-2xl text-white font-psemibold">Sign up to Aora</Text>

          <FormField
            title="username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={onSubmit}
            containerStyles="mt-7"
            isLoading={submitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-base text-gray-100 font-pregular">Have an account?</Text>
            <Link href="/sign-in" className="text-base font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
