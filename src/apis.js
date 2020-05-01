import { useContext, useEffect } from 'react'
import api from 'axios'
import { SearchDataContext, ParametersSearchContext, LoadingContext } from './context'

const BASE_URL = 'https://api.twitch.tv';
api.defaults.headers.common['Client-ID'] = '5nk47s82n9896y0wzqkn1hzlvsyaqy';
api.defaults.headers.common['Accept'] = 'application/vnd.twitchtv.v5+json';

export const useGetStreams = () => {
    const { setSearchData } = useContext(SearchDataContext)
    const { parametersSearch } = useContext(ParametersSearchContext)
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        getData()
    }, [parametersSearch])

    const getData = () => {
        setLoading(true)
        api.get(BASE_URL + '/kraken/search/streams?query=' + parametersSearch).then((response) => {
            setSearchData(response.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    return [getData]
}