import { useRef, useState, useEffect } from 'react';

const Test = () => {
   const myRef = useRef<HTMLAudioElement>(null);
   const [state, setState] = useState(false)

   useEffect(() => {
      console.log('useEffect called');
   }, [state])

   const btnClick = () => {
      setState(!state)
      // if (myRef.current) {
      //    myRef.current.play();
      // }
   };
   const stopClick = () => {
      if (myRef.current) {
         myRef.current.pause();
      }
   };

   console.log('component rerendered');
   

   return (
      <div className="container">
         <div className="col-md-4 pt-3">
            <input type="text" className="form-control mb-2" />
            <button
               className="btn btn-primary form-control mb-3"
               onClick={btnClick}
            >
               Play
            </button>
            <button
               className="btn btn-secondary form-control mb-3"
               type={'button'}
               onClick={stopClick}
            >
               Stop
            </button>
            <audio
               ref={myRef}
               controls
               src="http://localhost:3001/dict/static/nima/vocabs/girl.mp3"
            ></audio>
         </div>
      </div>
   );
};

export default Test;
