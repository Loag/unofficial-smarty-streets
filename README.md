# unofficial-smarty-streets
unofficial wrapper for smarty streets api 

## usage
```
  const smartystreets = require('smarty-streets-unofficial-api')({auth_id:'YOUR_AUTH_ID', auth_token:'YOUR_AUTH_TOKEN'});

  smartystreets.clean_address({prefix: 'prefix', city_filter: 'city', state_filter: 'state'}, (err, res) => {
    console.log(res);
  });

  smartystreets.batch_validate(['array of address objects'], (err, res) => {
    console.log(res);
  });
```
