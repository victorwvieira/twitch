import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Text,
    Keyboard
} from 'react-native';
import { ParametersSearchContext, LoadingContext } from '../context'

const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('')
    const [numberResults, setNumberResults] = useState(5)
    const { setParametersSearch } = useContext(ParametersSearchContext)

    return (
        <React.Fragment>
            <View style={styles.searchBox}>
                <TextInput style={styles.searchBoxText} placeholder="Search..." onChangeText={(text) => { setSearchValue(text) }} />
                <TouchableOpacity onPressIn={Keyboard.dismiss} onPressOut={() => setParametersSearch(`${searchValue}&limit=${numberResults}`)}>
                    <Image style={styles.searchBoxIcon} source={require('../../assets/search.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.numberResults}>
                <Text style={styles.numberResultsText}>Limit results:</Text>
                <TextInput style={styles.numberResultsInput} maxLength={2} keyboardType='number-pad' placeholder="5"
                    onChangeText={(numberResults) => {
                        numberResults === 0 ? setNumberResults(5) : setNumberResults(numberResults)
                    }}
                />
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        marginTop: 80,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
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
    },
    numberResults: {
        flexDirection: 'row',
        justifyContent: "center",
    },
    numberResultsInput: {
        backgroundColor: '#FFF',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#404340',
        borderRadius: 10,
    },
    numberResultsText: {
        fontSize: 15,
        paddingTop: 5,
        fontWeight: 'bold'
    }
});

export default SearchBox;