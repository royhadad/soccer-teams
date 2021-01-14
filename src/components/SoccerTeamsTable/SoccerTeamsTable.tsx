import React, {useEffect, useState} from 'react';
import axios from 'axios';

const SoccerTeamsTable = () => {
    const [soccerTeams, setSoccerTeams] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/soccerTeams').then((response) => {
            setSoccerTeams(response.data)
        }).catch((err) => {

        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    return <div>isLoading: {isLoading}, data: {JSON.stringify(soccerTeams)}
        <table></table>
    </div>
}

export default SoccerTeamsTable;