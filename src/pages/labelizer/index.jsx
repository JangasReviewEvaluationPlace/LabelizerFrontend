import React from 'react'
import queryString from 'query-string';

import Funnel from './funnel';
import Labeling from './labeling';

export default function Labelizer() {
  const {sources, tags} = queryString.parse(window.location.search)
  const [checkedSources, setCheckedSources] = React.useState([]);
  const [checkedTags, setCheckedTags] = React.useState([]);

  return (
    <div>
      {
        sources === undefined || tags === undefined ?
          <Funnel 
            checkedSources={checkedSources}
            setCheckedSources={setCheckedSources}
            checkedTags={checkedTags}
            setCheckedTags={setCheckedTags}
          /> : <Labeling/>
      }
    </div>
  )
}
