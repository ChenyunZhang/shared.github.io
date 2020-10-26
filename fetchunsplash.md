import React from 'react'
import Unsplash, { toJson } from 'unsplash-js';

function RightNavBar() {

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const unsplash = new Unsplash({ accessKey: "tiLpw6NIQBzOyXVdnNxVbVpkgLI0mCidl3M7DgbM1wc"});

unsplash.search.photos("dogs", 1, 20, { orientation: "portrait", color: "green" })
  .then(toJson)
  .then(json => {
    console.log(json)
  });

    return (
        <div>
            
        </div>
    )
}

export default RightNavBar