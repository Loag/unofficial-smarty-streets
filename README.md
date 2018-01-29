# unofficial-smarty-streets
unofficial wrapper for smarty streets api 

## usage
```
  const smartystreets = require('smarty-streets-unofficial-api')({auth_id:'YOUR_AUTH_ID', auth_token:'YOUR_AUTH_TOKEN'});

  smartystreets.clean_address({prefix: 'prefix', city_filter: 'city', state_filter: 'state'}, (err, res) => {
    console.log(res);
  });

  smartystreets.validate_address('full address as string here', (err, res) => {
    console.log(res);
  });
```
