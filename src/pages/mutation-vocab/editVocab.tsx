import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { IVocab } from '../../interface/restaurant.interface';
import { getVocabApi } from '../../api/admin.service';
import { editVocabApi } from '../../api/admin.service';

// ! when edit vocab done, audio doesn't reload
const EditVocab = () => {
   const { vocabId } = useParams();

   const [vocab, setVocab] = useState<IVocab>({ _id: '', title: '' });
   const [file, setFile] = useState<File>();

   // const

   useEffect(() => {
      getVocabApi(vocabId, (isOk: boolean, result) => {
         if (isOk) {
            setVocab(result.vocab);
         } else {
            console.log(result.message);
            toast.error(result.message);
         }
      });
   }, []);

   const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      const fileList = e.target.files;

      if (!fileList) return;

      setFile(fileList[0]);
   };

   const submitClick = function (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (vocab.title == '') return toast.warn('Please fill title');

      const t = toast.loading('Editing Vocab...');
      const formData = new FormData();
      if (vocab.title) formData.append('title', vocab.title);
      if (vocab.phonetics) formData.append('phonetics', vocab.phonetics);
      if (vocab.definition) formData.append('definition', vocab.definition);
      if (vocab.example) formData.append('example', vocab.example);
      if (vocab.completed) formData.append('completed', 'true');
      else formData.append('completed', 'false');
      if (file) {
         formData.append('audioFile', file, file.name);
      }
      editVocabApi(vocabId, formData, (isOk: boolean, result) => {
         if (isOk) {
            console.log(result.vocab);
            setVocab(result.vocab);
            toast.update(t, {
               render: 'vocab edited successfully',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
         } else {
            console.log(result.message);
            toast.update(t, {
               render: result.message,
               type: 'error',
               isLoading: false,
               autoClose: 2000,
            });
         }
      });
   };

   return (
      <>
         <div className="container">
            <form
               className="pt-3 col-sm-12 col-md-8 col-lg-6 row"
               onSubmit={event => {
                  submitClick(event);
               }}
            >
               <div className="mb-3 col-lg-6">
                  <label className="form-label">Title</label>
                  <input
                     type="text"
                     className="form-control"
                     onChange={e => {
                        setVocab({ ...vocab, title: e.target.value });
                     }}
                     value={vocab.title}
                  />
               </div>
               <div className="mb-3 col-lg-6">
                  <label className="form-label">Phonetics</label>
                  <input
                     type="text"
                     className="form-control"
                     onChange={e => {
                        setVocab({ ...vocab, phonetics: e.target.value });
                     }}
                     value={vocab.phonetics}
                  />
               </div>
               <div className="mb-3">
                  <label className="form-label">Definition</label>
                  <textarea
                     className="form-control"
                     onChange={e => {
                        setVocab({ ...vocab, definition: e.target.value });
                     }}
                     value={vocab.definition}
                     rows={3}
                  ></textarea>
               </div>
               <div className="mb-4">
                  <label className="form-label">Example</label>
                  <textarea
                     className="form-control"
                     onChange={e => {
                        setVocab({ ...vocab, example: e.target.value });
                     }}
                     value={vocab.example}
                     rows={3}
                  ></textarea>
               </div>

               <audio
                  className="mb-2 w-100"
                  controls
                  src={`${vocab.audio}`}
               ></audio>

               <div className="mb-3">
                  <label className="form-label">Upload Audio</label>
                  <input
                     type="file"
                     className="mx-2"
                     onChange={handleFileChange}
                  />
               </div>

               <div className="col-12">
                  <div className="form-check form-switch">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        checked={vocab?.completed ? true : false}
                        onChange={e => {
                           setVocab({ ...vocab, completed: e.target.checked });
                        }}
                     />
                     <label className="form-check-label">completed</label>
                  </div>
               </div>

               <div className="col">
                  <button
                     type="submit"
                     className="btn btn-primary btn-lg w-100 add-btn my-2"
                  >
                     Edit Vocab
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default EditVocab;
