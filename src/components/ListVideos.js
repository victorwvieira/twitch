import React, { useContext, useEffect } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity,
    View,
    Image,
    RefreshControl
} from 'react-native';
import { SearchDataContext, LoadingContext } from '../context'
import { formatDistanceToNow } from 'date-fns'
import { useGetStreams, useGetVideo } from '../apis'

const ListItem = ({ navigation, channelId, viewers, createdAt, channelLogo, game, channelName }) => {
    const [videoUrl, getVideoData] = useGetVideo()

    const onSelect = (channelId) => {
        getVideoData(channelId)
    }

    useEffect(() => {
        if (videoUrl) {
            navigation.navigate('Player', { videoUrl })
        }
    }, [videoUrl])

    return (
        <TouchableOpacity
            onPress={() => onSelect(channelId)}
        >
            <View style={styles.listItems}>
                <Image
                    style={styles.thumbnail}
                    source={{
                        uri: channelLogo,
                    }}
                />
                <View style={styles.listItemsContent}>
                    <View style={styles.listItemsFirstRow}>
                        <Text style={styles.listItemsChannelName}>{channelName}</Text>
                        <View style={styles.listItemsContentViewers}>
                            <Text style={[styles.listItemsText, styles.listItemsViewers]}>{viewers}</Text>
                            <Image
                                style={styles.viewersIcon}
                                source={require('../../assets/viewer.png')}
                            />
                        </View>
                    </View>
                    <Text style={styles.listItemsText}>{game}</Text>
                    <Text style={[styles.listItemsText, styles.listItemsCreateAtText]}>{formatDistanceToNow(new Date(createdAt))}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const ListVideos = ({ nav }) => {
    const { searchData } = useContext(SearchDataContext)
    const { loading } = useContext(LoadingContext)
    const [getData] = useGetStreams()

    return (
        <React.Fragment>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={() => getData()} />
                }
            >
                {
                    searchData && searchData.streams.length > 0 ?
                        <FlatList
                            data={searchData.streams}
                            renderItem={({ item }) => {
                                console.log(item)
                                return <ListItem
                                    channelId={item.channel._id}
                                    viewers={item.viewers}
                                    createdAt={item.created_at}
                                    channelLogo={item.channel.logo}
                                    game={item.game}
                                    channelName={item.channel.name}
                                    navigation={nav}
                                />
                            }}
                            keyExtractor={item => item._id}
                            style={styles.listBox}
                        />
                        :
                        <View style={styles.emptyMessage}>
                            <Image
                                style={styles.emptyImg}
                                source={require('../../assets/empty.png')}
                            />
                            <Text style={styles.emptyMessageText}>There are no data available.</Text>
                            <Text style={styles.emptyMessageText}>Use the search box above to look for Streams.</Text>
                        </View>
                }
            </ScrollView>
        </React.Fragment >
    );
}


const styles = StyleSheet.create({
    listBox: {
        flex: 1,
        padding: 20
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10
    },
    listItems: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#404340',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#653b7d'
    },
    listItemsContent: {
        flex: 1,
        justifyContent: 'space-around',
        paddingRight: 10
    },
    listItemsText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16
    },
    listItemsChannelName: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'left',
    },
    listItemsCreateAtText: {
        textAlign: 'right',
        fontSize: 11
    },
    listItemsViewers: {
        textAlign: 'right',
        fontSize: 14
    },
    listItemsContentViewers: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignContent: 'center'
    },
    listItemsFirstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    viewersIcon: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    emptyMessage: {
        flex: 1,
        marginTop: 30,
        alignContent: 'center',
        padding: 10
    },
    emptyMessageText: {
        textAlign: 'center',
        fontSize: 30,
        margin: 10
    },
    emptyImg: {
        width: 125,
        height: 125,
        alignSelf: 'center',
        borderRadius: 10,
        marginRight: 10
    },
});

export default ListVideos;