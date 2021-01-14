import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MaterialTable, {Column} from "material-table";
import {Box, lighten, makeStyles, Typography, useTheme} from "@material-ui/core";
import Team from '../../types/Team'

const FAVORITE_TEAM_LOCAL_STORAGE_KEY = 'favoriteTeamId'
const TITLE_TEXT = 'Soccer Teams'

const createClasses = makeStyles(() => {
    return {
        crest: {
            width: '40px'
        }
    }
})

const SoccerTeamsTable: React.FC = () => {
    const classes = createClasses();
    const theme = useTheme();

    const [soccerTeams, setSoccerTeams] = useState<Team[]>([])
    const [favoriteTeamId, setFavoriteTeamId] = useState<Team['id']>(localStorage.getItem(FAVORITE_TEAM_LOCAL_STORAGE_KEY) || '')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('');

    // Fetch on mount
    useEffect(() => {
        setIsLoading(true);
        axios.get<Team[]>('/api/soccerTeams').then((response) => {
            setSoccerTeams(response.data)
            setError('');
        }).catch(() => {
            setError('Something went wrong, please try again later');
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    // Syncs the the current selected team to local storage
    useEffect(() => {
        localStorage.setItem(FAVORITE_TEAM_LOCAL_STORAGE_KEY, favoriteTeamId || '');
    }, [favoriteTeamId])

    return (
        <div>
            <Box mb={1}>
                <Typography variant='subtitle1' color='error'>{error}</Typography>
            </Box>
            <MaterialTable<Team>
                title={<Typography variant='h3' color='primary'>{TITLE_TEXT}</Typography>}
                isLoading={isLoading}
                data={soccerTeams}
                onRowClick={((event, team) => {
                    setFavoriteTeamId((prevFavoriteTeamId) => {
                        if (prevFavoriteTeamId === team?.id) {
                            return '';
                        } else {
                            return team?.id || '';
                        }
                    })
                })}
                columns={[
                    {
                        title: "Crest",
                        field: "crestUrl",
                        render: (team) => (<img src={team.crestUrl} alt='team crest' className={classes.crest}/>)
                    },
                    {
                        title: "Name",
                        field: "name"
                    },
                    {
                        title: "Year founded",
                        field: "founded"
                    }
                ].map((column): Column<Team> => ({
                    // Adding styles to all columns
                    ...column,
                    cellStyle: (teams, currentTeam) => ({
                        backgroundColor: currentTeam.id === favoriteTeamId ? lighten(theme.palette.secondary.main, 0.7) : 'initial',
                        textAlign: 'center'
                    }),
                    headerStyle: {
                        textAlign: "center"
                    }
                }))}
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
                style={{
                    backgroundColor: theme.palette.background.default,
                }}
            />
        </div>
    )
}

export default SoccerTeamsTable;
export {TITLE_TEXT}