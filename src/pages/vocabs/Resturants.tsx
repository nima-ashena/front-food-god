import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getRestaurantsApi, getVocabsApi } from '../../api/admin.service';
import Vocab from '../../components/vocab/Vocab';
import { IVocab } from '../../interface/restaurant.interface';

const Vocabs = () => {
   const [loading, setLoading] = useState(true);

   const [vocabs, setVocabs] = useState<IVocab[]>([]);
   const [render, setRender] = useState<boolean>(false);

   useEffect(() => {
      // const id = toast.loading('Loading...');
      getRestaurantsApi((isOk, result) => {
         if (isOk) {
            setVocabs(result);
            setLoading(false);
            // toast.dismiss(id)
         } else {
            console.log(result.message);
            // toast.update(id, {
            //    render: result.response.data.message,
            //    type: 'error',
            //    isLoading: false,
            //    autoClose: 2000,
            // });
         }
      });
   }, [render]);

   return (
      <>
         <div className="container">
            <div className="accordion my-3" id="accordionHooks">
               <div className="accordion-item">
                  <h2 className="accordion-header ">
                     <button
                        className="accordion-button collapsed"
                        style={{ transition: '1000' }}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapseHeading`}
                        aria-expanded="true"
                        aria-controls={`collapseHeading`}
                     >
                        Enable Filter
                     </button>
                  </h2>
                  <div
                     id={`collapseHeading`}
                     className="accordion-collapse collapse"
                     aria-labelledby="heading"
                     data-bs-parent="#accordionHooks"
                  >
                     <div className="accordion-body">
                        <form className="pt-3 col-sm-6 col-md-4 col-lg-4">
                           <div className="mb-3">
                              <label className="form-label">Search</label>
                              <input type="text" className="form-control" />
                           </div>
                           <label className="form-label">Sort By</label>
                           <select
                              className="form-select mb-3"
                              aria-label="Default select example"
                           >
                              <option value="1">Name</option>
                              <option value="2">Date</option>
                           </select>
                           <button
                              type="submit"
                              className="btn btn-primary btn-lg w-100"
                           >
                              Search
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>

            {loading && (
               <Button className="w-100 py-3" variant="primary" disabled>
                  <Spinner
                     className="mx-2"
                     as="span"
                     animation="grow"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                  />
                  Loading...
               </Button>
            )}

            <div className="row align-items-center px-1 g-1">
               {vocabs.map(item => (
                  <Vocab
                     vocab={item}
                     render={render}
                     setRender={setRender}
                     key={item._id}
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default Vocabs;
