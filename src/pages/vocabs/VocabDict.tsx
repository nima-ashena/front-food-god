import { useEffect, useRef, useState } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getVocabsApi, plusTrueVocabApi } from '../../api/admin.service';
import { IVocab } from '../../interface/restaurant.interface';

let counter: number = 0;

const VocabDict = () => {
   const [panel, setPanel] = useState(0);

   // Panel 0
   const [sliderValue, setSliderValue] = useState(15);

   // Panel 1
   const [counterState, setStateCounter] = useState<number>(0);
   const [again, setAgain] = useState(false);
   const [left, setLeft] = useState<number>(0);
   const [ahead, setAhead] = useState<number>(0);
   const [accurate, setAccurate] = useState<number>(0);
   const [vocabs, setVocabs] = useState<IVocab[]>([{ _id: '', title: '' }]);
   const [p, setP] = useState<string>('0%');
   const [input, setInput] = useState<string>('');
   const audioRef = useRef<HTMLAudioElement>(null);

   // finish modal
   const [showModal, setShowModal] = useState(false);
   const handleModalClose = () => {
      setShowModal(false);
      setPanel(0);
   };

   useEffect(() => {
      if (panel == 0) return;
      const id = toast.loading('Loading...');
      getVocabsApi(
         (isOk: boolean, result) => {
            if (isOk) {
               toast.dismiss(id);
               if (result.vocabs.length == 0) {
                  setPanel(0);
                  return toast.info('There is no Vocabs to review');
               }
               setVocabs(result.vocabs);
               setAhead(0);
               setLeft(result.vocabs.length);
               counter = 0;
               if (audioRef.current) {
                  audioRef.current.src = result.vocabs[0].audio;
                  audioRef.current.play();
               }
            } else {
               console.log(result.message);
               toast.error(result.message);
            }
         },
         [
            { name: 'trueGuessLimit', value: sliderValue },
            { name: 'sort', value: '-true-guess-count' },
         ],
      );
   }, [again]);

   const startClick = () => {
      setPanel(1);
      setAgain(!again);
   };

   const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      let res = calculateAccuracy(e.target.value, vocabs[counter].title);

      setAccurate(res);
      setP(`${res}%`);
      if (res == 100) {
         setInput('');
         setAhead(ahead + 1);
         setLeft(left - 1);
         // setCounter(counter + 1);
         plusTrueVocabApi(vocabs[counter]._id, isOk => {
            if (!isOk) toast.error('Plus counter failed');
         });
         counter += 1;
         // Check Finish
         if (counter == vocabs.length) {
            // return toast.success('Review Done');
            setShowModal(true);
         }
         setP('0%');
         setAccurate(0);
         if (audioRef.current) {
            audioRef.current.src = vocabs[counter].audio;
            audioRef.current.play();
         }
      }
   };

   const showAnswerClick = () => {
      setP(vocabs[counter].title);
   };

   const againClick = () => {
      handleModalClose();
      setAgain(!again);
   };

   return (
      <div className="container">
         {panel == 0 && (
            <div className="pt-3 col-12 col-md-6 col-lg-4">
               <label className="form-label">
                  Select count of true guess: {sliderValue}
               </label>
               <input
                  type="range"
                  className="form-range mb-2"
                  min="5"
                  max="20"
                  value={sliderValue}
                  onChange={e => {
                     setSliderValue(Number(e.target.value));
                  }}
               ></input>
               <button className="btn btn-primary w-100" onClick={startClick}>
                  Start
               </button>
            </div>
         )}
         {panel == 1 && (
            <>
               <div className="pt-3 col-12 col-md-6 col-lg-4">
                  <div className="mb-2 w-100 d-flex justify-content-between">
                     <span
                        className="badge bg-success"
                        style={{ fontSize: 20 }}
                     >
                        {ahead}
                     </span>
                     <span className="badge bg-danger" style={{ fontSize: 20 }}>
                        {left}
                     </span>
                  </div>
                  <audio
                     className="mb-2 w-100 rounded-2"
                     controls
                     ref={audioRef}
                  ></audio>
                  <div className="mb-3">
                     <input
                        type="text"
                        onChange={e => inputChange(e)}
                        value={input}
                        className="form-control mb-2"
                        placeholder="write your answer"
                     />
                  </div>
                  <ProgressBar now={accurate} />
                  <p className="" style={{ fontSize: 28 }}>
                     {p}
                  </p>
                  <button
                     className="btn btn-primary w-100"
                     onClick={showAnswerClick}
                  >
                     Show Answer
                  </button>
               </div>

               {/* Modal */}
               <Modal show={showModal} onHide={handleModalClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>
                        Review done. Do you want do it again?
                     </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleModalClose}>
                        No
                     </Button>
                     <Button variant="primary" onClick={againClick}>
                        Yes
                     </Button>
                  </Modal.Footer>
               </Modal>
            </>
         )}
      </div>
   );
};

const calculateAccuracy = (inputValue: string, answer: string) => {
   inputValue = inputValue.toLowerCase();
   answer = answer.toLowerCase();

   let n = 0;
   for (let i = 0; i < answer.length; i++) {
      if (answer[i] === inputValue[i]) {
         n++;
      }
   }
   return Math.round((n / answer.length) * 100);
};

export default VocabDict;
