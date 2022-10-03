import { useEffect, useState } from "react";
import { Image, StyleSheet, Text,View } from "react-native";
import { useDevice } from "../deviceContext";
import { generalStyles } from "../generalStyles";

export default function Post ({post}) {
    const [isTablet] = useDevice()
    const [photoUri, setPhotoUri] = useState('')

    const getPhotoUri = async() => {
        const url = 'https://jsonplaceholder.typicode.com'
        setPhotoUri(( await (await fetch(`${url}/photos?albumId=${post.userId}&_limit=1`)).json())[0].thumbnailUrl)
    }

    useEffect(() => {
        getPhotoUri()
    }, [])

    return (
        <View style={styles.post}>
            {isTablet && <Image source={{uri: photoUri}} style={{width: 150, height: 150}} />}
            <Text style={styles.postText}>Author: {post.author}</Text>
            <Text style={styles.postText}>Company: {post.company}</Text>
            <Text style={styles.postText}>Title: {post.post.title}</Text>
            {isTablet && <Text style={styles.postText}>{post.post.body}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        borderColor: generalStyles.BLUE_WATER_COLOR,
        borderWidth: 3,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        flex: 1,
    },
    postText: {
        fontFamily: 'Inter',
        fontSize: 16,
        marginBottom: 15
    }
})