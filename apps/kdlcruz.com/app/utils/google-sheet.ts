import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

export const getSheetDoc = () => {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCJdKN8gfN9Kmjj\ntjlmoxqTRul5QbIyPTNcALfuYzyPawBetjOXfpadIsPhZ0FVIRLD90+JxIQ5JfWT\nK+jPiD49KZ5REI7WnmxBu91xcWZlRzYYpFixb6m666OGhSqsdzr9RioW78xBBytY\nRij9GfrNOVZXa36I+i8+cBmWMMCSoBaxqu3dzLex9lwZBnjoiV7axeHzwbC/UkTl\nbmlYAEu0MYJ6Fbw13s6YqOY6BlseJMtd5TPHls2Ndw1qb8J4mysZ277ocL6UKK/R\nd/ItOESZjsWqsGzEEE5qulrcg8PyxN9kKectoMqETychM8Yz5lhDH8FyfF3JQvG3\nsiCFOkkNAgMBAAECggEABnPnNzGFi/Ruo0lQarD7pCV8e+Cu5sdd5B2KL5gmhWgP\n8XegYTtZguEZLM7Ir8r4mHesGvWoAbkhDRU5sxZnBOmG1luOjQ+NBE1MsRDnrkJN\nzTyCh7qMJKt/ttFaZmlxfObV6SjoNTb1h18XI6ycIWq7PX7dHD08dF6rANSN5xl9\nt8CrLnjeQs1fo00L3oJnLTebDTSxdsXvTbuVXSJsZ5o9J3JJmzthvuIMt33Z9Gat\nv8pCE2wM0NRhD1P8D9XKbgr4xmOi+eXFsr4mPFkldhZift5ffq2lKJMTgp/ddHDp\nPbw7aaqkMnwISq62qPlzAfoKElX3hj1arnvnK1pxEQKBgQC8UwwHltXzCilQ2lf0\n4zIfcUbDPkNNIETzvhISYhFxXZE2psx3TcI3zRLQo5TtgQ21/00rMu9kj8LFbgQt\nVM3fO8v1F95srFK/I3NYamft7fxp5CjKZYE3cQD4aXTDexKXMtUjXQBrtnWtHO1Z\n0GhAaFs6BlVLbeXx83z/icfpMQKBgQC62eeRQqdadZ1XoVauYjGIEkpnxn8d8X42\nLFBpdOLm9M8J1Puk++OCaGPk2fRpLPRmhZj7FDB06Cog42CkjjQ+5Mn76xEyijKg\nkaDq9aE5LIRkq/LP5r1sUOMWC/V8E7tSoVU5Xsckrc8J42gy2QQ1Av0NP0IQXQ0q\nmto7GHMmnQKBgGIgU5BQw8ITdVuvqUzsZN2FRH3PH3o8ajEmxHvXpYcQXe3AE6HG\nXoB81mToF115dQ9zq13q+FnJno8IuBx2p569pZRbj4XIdIUrj5puNyD+dBsoyyhK\no32j4AGP0UtaAWHPFseKWgHF3KMLA5FcyjVlKsOdMSxQYxQi7uqnfAbBAoGARHOZ\nwvyBJMGbv8OqZr4wWSIiQfxVC1oyG5SGbOvWSDf9NSPigKGKynaFygwS3wkKDBj7\nX1gZHGsFLAFAoWg7OaNFX9XQ+gvo2iwfoJQV2UU2x0666HEmiezkFGqTJz5vTKkv\n+JGBMS2/gGbgAGjCgs0yeUzoXehI74fFVQry/H0CgYASFsT1e4gQLrMI8cjMaDWR\nqQL7GzC0whjIAAT6zPbfsogrX/EHuDEImI9iW05/OL8UucvC5azwZNeA090AJ7Cm\nNG/6MYfXcJFcMoCEumMN4EbbIG4pxr5xYiUrl3h/c3KeVi5kUlOwo8WZYrrOr12H\ntwDPtZWePH97tHgNVhoBZQ==\n-----END PRIVATE KEY-----\n",
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
  
  const doc = new GoogleSpreadsheet(process.env?.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth)

  return doc
}