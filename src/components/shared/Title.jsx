import React from 'react'
import {Helmet} from "react-helmet-async"
const Title =({title="chat App",
    description="this is a chat App",

}) => {
  return (
   <Helmet>
<title>{title}</title>
<meta name="description" content={description} />
   </Helmet>
  );
};

export default Title
