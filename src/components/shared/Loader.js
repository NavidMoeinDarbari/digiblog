import React from 'react'; 
import { Dna } from 'react-loader-spinner';

const Loader = ({size, marginTop}) => {
   return (
      <div className={`w-full h-full ${marginTop} flex justify-center items-center`}>
         <Dna
            visible={true}
            height={size}
            width={size}
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
         />
      </div>
   );
};

export default Loader;