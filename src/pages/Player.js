import React, { useEffect, useContext } from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { WebView } from "react-native-webview";
import { useGetVideo } from '../apis'
import { LoadingContext } from '../context'

const Player = ({ route }) => {
    const { loading, setLoading } = useContext(LoadingContext)

    return (
        <React.Fragment>
            {
                loading &&
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View >
            }
            <WebView
                onLoadEnd={() => setLoading(false)}
                source={{ uri: route.params.videoUrl }}
            />
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'white'
    }
});
export default Player