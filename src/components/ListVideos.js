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
import { useGetStreams } from '../apis'

const ListItem = ({ id, viewers, createdAt, thumbnail, game, channelName }) => {

    const onSelect = (id) => {

    }

    return (
        <TouchableOpacity
            onPress={() => onSelect(id)}
        >
            <View style={styles.listItems}>
                <Image
                    style={styles.thumbnail}
                    source={{
                        uri: thumbnail,
                    }}
                />
                <View style={styles.listItemsContent}>
                    <Text style={styles.listItemsText}>Channel: {channelName}</Text>
                    <Text style={styles.listItemsText}>Game: {game}</Text>
                    <Text style={styles.listItemsText}>Viewers: {viewers}</Text>
                    <Text style={[styles.listItemsText, styles.listItemsCreateAtText]}>{formatDistanceToNow(new Date(createdAt))}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const ListVideos = () => {
    const { searchData } = useContext(SearchDataContext)
    const { loading } = useContext(LoadingContext)
    const [getData] = useGetStreams()

    useEffect(() => {
        console.log(searchData);

    })

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
                            renderItem={({ item }) => (
                                <ListItem
                                    id={item._id}
                                    viewers={item.viewers}
                                    createdAt={item.created_at}
                                    thumbnail={item.preview.small}
                                    game={item.game}
                                    channelName={item.channel.name}
                                />
                            )}
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
    listItemsCreateAtText: {
        textAlign: 'right',
        fontSize: 11
    },
    emptyMessage: {
        flex: 1,
        marginTop: 90,
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