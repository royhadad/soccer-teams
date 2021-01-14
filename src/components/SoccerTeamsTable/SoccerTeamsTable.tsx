import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MaterialTable, {Column} from "material-table";
import {lighten, makeStyles, Typography, useTheme} from "@material-ui/core";

interface Team {
    id: string;
    name: string;
    founded: number;
    crestUrl: string;
}

const createClasses = makeStyles(() => {
    return {
        crest: {
            width: '40px'
        }
    }
})

const SoccerTeamsTable = () => {
    const classes = createClasses();
    const theme = useTheme();

    const [soccerTeams, setSoccerTeams] = useState<Team[]>([])
    const [favoriteTeamId, setFavoriteTeamId] = useState<Team['id']>(localStorage.getItem('favoriteTeamId'))
    const [isLoading, setIsLoading] = useState(false)

    // Fetch on mount
    useEffect(() => {
        setIsLoading(true);
        axios.get<Team[]>('/api/soccerTeams').then((response) => {
            setSoccerTeams(response.data)
        }).catch((err) => {

        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    // Syncs the the current selected team to local storage
    useEffect(() => {
        localStorage.setItem('favoriteTeamId', favoriteTeamId);
    }, [favoriteTeamId])

    return (
        <div>
            <MaterialTable<Team>
                onRowClick={((event, team) => {
                    setFavoriteTeamId((prevFavoriteTeamId) => (prevFavoriteTeamId === team.id ? undefined : team.id))
                })}
                isLoading={isLoading}
                data={soccerTeams}
                options={{
                    sorting: false,
                    filtering: false,
                    search: false,
                    paging: false,
                    headerStyle: {
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.primary.dark,
                        fontSize: '1.5rem',
                        fontWeight: "bold"
                    }
                }}
                title={<Typography variant='h3' color='primary'>Soccer Teams</Typography>}
                style={{
                    backgroundColor: theme.palette.background.default,
                }}
                columns={[
                    {
                        title: "Crest",
                        field: "crestUrl",
                        render: (team) => (<img src={team.crestUrl} alt='team crest' className={classes.crest}/>)
                    },
                    {title: "Name", field: "name"},
                    {title: "Year founded", field: "founded"}
                ].map((column): Column<Team> => ({
                    ...column,
                    cellStyle: (teams, currentTeam) => ({
                        backgroundColor: currentTeam.id === favoriteTeamId ? lighten(theme.palette.secondary.main, 0.7) : 'initial',
                        textAlign: 'center'
                    }),
                    headerStyle: {
                        textAlign: "center"
                    }
                }))}/>
        </div>
    )
}

export default SoccerTeamsTable;