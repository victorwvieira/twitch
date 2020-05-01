import React, { useState, useContext } from 'react'
import {
    StyleSheet,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { SearchDataContext } from '../context'
import { formatDistanceToNow } from 'date-fns'

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
    const [selected, setSelected] = useState()

    return (
        <ScrollView>
            {searchData &&
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
                    extraData={selected}
                    style={styles.listBox}
                />
            }
        </ScrollView>
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
    }
});

export default ListVideos;