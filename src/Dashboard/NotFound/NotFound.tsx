import React from 'react';
import { Redirect } from 'react-router-dom';

export function NotFound(): React.ReactElement {
    /* return ( */
    /*     <div className="container"> */
    /*         <div className="message"> */
    /*             <h1>404 - Page Not Found</h1> */
    /*             <p> */
    /*                 Uh oh, Gandalf can&apost find the way! */
    /*                 <br /> */
    /*                 Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton? */
    /*             </p> */
    /*         </div> */
    /*     </div> */
    /* ); */
    return <Redirect to="/dashboard/login" />;
}
