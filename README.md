# rss-simple-crud-api

## Available api calls:
`GET, POST, PUT, DELETE`

For `PUT` call you should pass whole user object without id field, otherwise error will thrown:
#### Example: 
```
{
  "username": "Foo",
  "age": 25,
   "hobbies" ["Bar"]
}
```


Clone repo: 
```
git clone https://github.com/Nectire/rss-simple-crud-api.git
```

Go to directory:
```
cd rss-simple-crud-api
```

### Start Application:

#### To start app in dev mode:
```
npm run start:dev
```

#### To start app in prod mode in one thread:
```
npm run start:prod
```

#### To start app in prod in multi thread (horizontal scaling):
```
npm run start:multi
```

#### To start tests:
```
npm run test
```
