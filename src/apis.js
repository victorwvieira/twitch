import { useState, useEffect } from 'react'
import api from 'axios'

const BASE_URL = 'https://api.twitch.tv';
api.defaults.headers.common['Client-ID'] = '5nk47s82n9896y0wzqkn1hzlvsyaqy';
api.defaults.headers.common['Accept'] = 'application/vnd.twitchtv.v5+json';

export const useGet = (resource) => {
    const [responseData, setResponseData] = useState({})

    const getData = (parameter) => {
        api.get(BASE_URL + resource + parameter).then((response) => {
            setResponseData(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return [responseData, getData]
}