import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

const Endpoint = process.env.EXPO_PUBLIC_ENDPOINT;
const Platform = process.env.EXPO_PUBLIC_PLATFORM;
const ProjectID = process.env.EXPO_PUBLIC_PROJECT_ID;
const DatabaseID = process.env.EXPO_PUBLIC_DATABASE_ID;
const StorageID = process.env.EXPO_PUBLIC_STORAGE_ID;
const UserCollectionID = process.env.EXPO_PUBLIC_USER_COLLECTION_ID;
const VideoCollectionID = process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID;

const client = new Client();
client.setEndpoint(Endpoint).setProject(ProjectID).setPlatform(Platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (err) {
    throw new Error(err);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (err) {
    throw new Error(err);
  }
}

export async function createUser(username, email, password) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(DatabaseID, UserCollectionID, ID.unique(), {
      accountId: newAccount.$id,
      username,
      email,
      avatar: avatarUrl,
    });

    return newUser;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(DatabaseID, UserCollectionID, [
      Query.equal("accountId", currentAccount.$id),
    ]);
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(DatabaseID, VideoCollectionID, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(DatabaseID, VideoCollectionID, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(DatabaseID, VideoCollectionID, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(DatabaseID, VideoCollectionID, [
      Query.equal("creator", userId),
      [Query.orderDesc("$createdAt")],
    ]);
    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(StorageID, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(StorageID, fileId, 2000, 2000, "top", 100);
    } else {
      throw new Error("Invalid file type: " + type);
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function uploadFile(file, type) {
  if (!file) return;

  const asset = { name: file.fileName, type: file.mimeType, size: file.filesize, uri: file.uri };

  try {
    const uploadedFile = await storage.createFile(StorageID, ID.unique(), asset);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function createVideo(formData) {
  console.log(formData);

  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(formData.thumbnail, "image"),
      uploadFile(formData.video, "video"),
    ]);
    console.log({ thumbnailUrl, videoUrl });

    const newPost = await databases.createDocument(DatabaseID, VideoCollectionID, ID.unique(), {
      title: formData.title,
      video: videoUrl,
      thumbnail: thumbnailUrl,
      prompt: formData.prompt,
      creator: formData.userId,
    });

    return newPost;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
