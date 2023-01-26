import { FC, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteVocabApi } from '../../api/admin.service';
import { IVocab } from '../../interface/restaurant.interface';
import './style.css';

// const Vocab = ({ vocab }: { vocab: IVocab }, renderValue: boolean) => {
const Vocab = (props: any) => {
   const vocab: IVocab = props.vocab;
   const render: boolean = props.render;
   const setRender: React.Dispatch<React.SetStateAction<boolean>> =
      props.setRender;

   const [show, setShow] = useState(false);
   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => {
      setShow(true);
   };

   const deleteVocabClick = () => {
      handleClose();
      deleteVocabApi(vocab._id, (isOk, result) => {
         const t = toast.loading('Deleting Vocab...');
         if (isOk) {
            setRender(!render);
            toast.update(t, {
               render: 'vocab deleted successfully',
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
         <div className="col-sm-4 col-md-4 col-lg-3">
            <div className="card bg-dark text-light" id="vocab">
               <div className="card-body text-center">
                  <p className="card-title mb-3">
                     <span className="badge bg-primary mx-2">
                        {vocab.true_guess_count?.toString()}
                     </span>
                     {vocab.title}
                     {vocab?.completed == true && (
                        <i
                           className="bi bi-check-circle-fill mx-2"
                           style={{ color: 'green' }}
                        ></i>
                     )}
                  </p>
                  <div>
                     <Link to={``} className="btn my-1">
                        <i className="bi bi-eye" style={{ color: '#198754' }} />
                     </Link>
                     <Link
                        to={`/vocabs/edit/${vocab._id}`}
                        className="btn my-1"
                        style={{ color: '#fff' }}
                     >
                        <i className="bi bi-pen" />
                     </Link>
                     <Link
                        to={``}
                        className="btn my-1"
                        style={{ color: 'red' }}
                        onClick={handleShow}
                     >
                        <i className="bi bi-trash" />
                     </Link>
                     {/* Modal */}
                     <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                           <Modal.Title>
                              Delete Vocab: {vocab.title} ?
                           </Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                           <Button variant="secondary" onClick={handleClose}>
                              Close
                           </Button>
                           <Button variant="danger" onClick={deleteVocabClick}>
                              Yes
                           </Button>
                        </Modal.Footer>
                     </Modal>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Vocab;
