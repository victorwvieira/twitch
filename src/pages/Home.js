import React, { useState } from 'react'
import {
    StyleSheet,
    View
} from 'react-native';
import { SearchDataContext, ParametersSearchContext } from '../context'
import SearchBox from '../components/SearchBox'
import ListVideos from '../components/ListVideos'

const Home = ({ navigation }) => {
    const [searchData, setSearchData] = useState()
    const [parametersSearch, setParametersSearch] = useState()

    return (
        <ParametersSearchContext.Provider value={{ parametersSearch, setParametersSearch }}>
            <SearchDataContext.Provider value={{ searchData, setSearchData }}>
                <View style={styles.container}>
                    <SearchBox />
                    <ListVideos nav={navigation} />
                </View>
            </SearchDataContext.Provider>
        </ParametersSearchContext.Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchBox: {
        marginTop: 80,
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#404340',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    searchBoxText: {
        flex: 0.9,
        padding: 10,
    },
    searchBoxIcon: {
        width: 24,
        height: 24,
        margin: 10,
    }
});

export default Home;