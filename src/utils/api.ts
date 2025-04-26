import { gql, request } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://api.ftcscout.org/graphql';

export const fetchMatchData = async (eventCode: string, teamNumber: number) => {
  const query = gql`
    query GetMatchData($season: Int!, $code: String!, $teamNumber: Int!) {
      eventByCode(season: $season, code: $code) {
        teamMatches(teamNumber: $teamNumber) {
          season
          eventCode
          matchId
          alliance
          station
          teamNumber
          allianceRole
          surrogate
          noShow
          dq
          onField
          createdAt
          updatedAt
          match {
            id
            hasBeenPlayed
            scheduledStartTime
            actualStartTime
            postResultTime
            tournamentLevel
            series
            matchNum
            description
            scores {
              __typename
              ... on MatchScores2024 {
                red {
                  totalPoints
                }
                blue {
                  totalPoints
                }
              }
            }
            teams {
              team {
                number
              }
            }
          }
        }
      }
    }
  `;

  try {
    const variables = { season: 2024, code: eventCode, teamNumber };
    const data = await request<{ eventByCode: { teamMatches: any[] } }>(GRAPHQL_ENDPOINT, query, variables);
    return data.eventByCode.teamMatches;
  } catch (error) {
    console.error('Error fetching match data:', error);
    throw error;
  }
};

export const fetchQueuingData = async (eventCode: string) => {
  const query = gql`
    query GetEventTeams($season: Int!, $code: String!) {
      eventByCode(season: $season, code: $code) {
        teams {
          teamNumber
        }
      }
    }
  `;

  try {
    const variables = { season: 2024, code: eventCode };
    console.log('Fetching queuing data with query:', query);
    console.log('Variables:', variables);
    const data = await request<{ eventByCode: { teams: { teamNumber: number }[] } }>(GRAPHQL_ENDPOINT, query, variables);
    return data.eventByCode.teams;
  } catch (error) {
    console.error('Error fetching queuing data:', error);
    throw error;
  }
};