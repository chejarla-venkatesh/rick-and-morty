import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }        
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        created        
        characters {
          id
          name
          image
          status          
        }
      }
    }
  }
`;

export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        image
        status
        species
        origin { name }
      }
    }
  }
`;