https://supabase.com/dashboard/project/cswdadlxiubwdzvqzywc/api/graphiql


====================================================================================================
{
    employeesCollection(first: 1) {
      edges {
        node {
          id
          name
          firstname
          lastname
          salary
          ayto_url
        }
      }
    }
    positionsCollection(first: 1) {
      edges {
        node {
          id
          position
        }
      }
    }
  }


  Respuesta

  {
    "data": {
      "employeesCollection": {
        "edges": [
          {
            "node": {
              "id": 1,
              "name": "María José",
              "salary": "Ayuntamiento = 74.135,35 Senado= 28.658,14 Total= 102.793,49  ",
              "ayto_url": "https://transparencia.jerez.es/infopublica/institucional/corporacion/2023-2027/maria-jose-garcia-pelayo",
              "lastname": "Pelayo",
              "firstname": "García"
            }
          }
        ]
      },
      "positionsCollection": {
        "edges": [
          {
            "node": {
              "id": 1,
              "position": "Alcaldía-Presidencia"
            }
          }
        ]
      }
    }
  }

====================================================================================================

{
    employeesCollection(filter: {id: {eq: 101}}) {
      edges {
        node {
          id
          name
          firstname
          lastname
          salary
          ayto_url
        }
      }
    }
    positionsCollection(first: 1) {
      edges {
        node {
          id
          position
        }
      }
    }
  }


  Respuesta

{
  "data": {
    "employeesCollection": {
      "edges": [
        {
          "node": {
            "id": 101,
            "name": "Agustin",
            "salary": "57.867",
            "ayto_url": "https://transparencia.jerez.es/infopublica/institucional/corporacion/agustin-munoz",
            "lastname": "Marin",
            "firstname": "Muñoz"
          }
        }
      ]
    },
    "positionsCollection": {
      "edges": [
        {
          "node": {
            "id": 1,
            "position": "Alcaldía-Presidencia"
          }
        }
      ]
    }
  }
}


  ====================================================================================================

{
  employeesCollection(filter: {id: {eq: 1}}) {
    edges {
      node {
        id
        name
        firstname
        lastname
      }
    }
  }
  positionsCollection(filter: {id: {eq: 1}}) {
    edges {
      node {
        id
        position
      }
    }
  }
  positions_externalCollection(filter: {id: {eq: 1}}) {
    edges {
      node {
        id
        position
      }
    }
  }
  recordsCollection(filter: {id: {eq: 1}}) {
    edges {
      node {
        id
        name
      }
    }
  }
}




NO FUNCIONA
{
    employeesCollection(where: { id: { _eq: 1 } }) {
        id
        nombre
        edad
    }
}



select
  graphql.resolve (
    $$
    {
      employeesCollection(first: 2) {
        edges {
          node {
            id,
            name
          }
        }
      }
        positionsCollection(first: 2) {
        edges {
          node {
            id, position
            
          }
        }
      }
    }
  $$
  );
