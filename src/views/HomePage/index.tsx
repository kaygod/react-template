import React,{useEffect} from 'react';
import "./index.less"; 

interface locationType {
    search:string
}

interface defaultProps {
  location:locationType
}

export const globalRef:{value:any} = {
    value:null
}


const HomePage = (props:defaultProps) => {
        return (
            <div className="client-manage">
              Hello world
            </div>
        );
};


export default HomePage;