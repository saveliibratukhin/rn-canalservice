import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDevice } from "../deviceContext";
import Post from "./Post";

export default function PostsScreen () {
    const [posts, setPosts] = useState([])
    const [isTablet] = useDevice()

    const getData = async () => {
        const url = 'https://jsonplaceholder.typicode.com'

        const getPost = async (userId) => {
            const post = (await (await fetch(`${url}/posts?userid=${userId}&_limit=1`)).json())[0]
            return {
                title: post.title,
                body: post.body
            }
        }

        Promise.all( (await (await fetch(`${url}/users`)).json()).map(async (user) => ({
                userId: user.id,
                author: user.name,
                company: user.company.name,
                post: await getPost(user.id)
        } )) ).then(res => setPosts(res))

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.flatList}
                data={posts}
                numColumns={isTablet? 2 : 1}
                renderItem={({item}) => (
                    <Post key={item.id} post={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flatList: {
        width: '100%',
        padding: 10
    }
  });