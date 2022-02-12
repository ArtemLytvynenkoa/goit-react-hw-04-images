import { useState, useEffect } from "react";
import Searchbar from "./components/Searchbar";
import Notification from "./components/Notification";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Button from "./components/Button";
import Loader from "./components/Loader";

const KEY = '24721773-f59b82dfb25f93d819ad2a8ec';
const perPage = 12;
const MAINURL = `https://pixabay.com/api/?key=${KEY}`;
let page = 1;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [activeOptionIndex, setActiveOptionIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return
    }

      page = 1;
      setImages([]);
      setStatus('pending')

    fetch(`${MAINURL}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
      .then(response => response.json())
      .then(({ total, hits }) => {
        if (hits.length === 0) {
          return Promise.reject(
            new Error('Nothing was found for this query!')
          )
        }

        page += 1

        setImages(
          hits.map(({ id, webformatURL, largeImageURL }) => ({
            id, webformatURL, largeImageURL
          }))
        );

        setTotalImages(total);

        setStatus('resolve');
      })
      .catch((error) => {
        setError(error);
        setStatus('rejected')
      });
    
  }, [searchQuery]);

  const handleLoadMore = () => {
    setStatus('pending')
    
    fetch(`${MAINURL}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
        .then(response => response.json())
        .then(({ hits }) => {
          page += 1;

          setImages(state => {
            return [...state, ...hits.map(({ id, webformatURL, largeImageURL }) => ({
              id, webformatURL, largeImageURL
            }))]
          });

          setStatus('resolve',);
        })
  }

  const toggleModal = () => setShowModal(state =>  !state);

  const setActiveIndex = index => {
    setActiveOptionIndex(index);
    toggleModal();
  };

  const getLargeImageURL = () => images[activeOptionIndex].largeImageURL;

  return (
    <>
      <Searchbar onSubmit={setSearchQuery} />

      {status === 'idle' && <Notification message='Enter a query!' />}
        
      {status === 'rejected' && error !== null && 
        < Notification message={error.message} />}
        
      {(status === 'resolve' || status === 'pending') &&
        <>
          <ImageGallery
            images={images}
            onClick={setActiveIndex}
          />
          {status === 'pending' && <Loader />}
          {
          totalImages > perPage
          && images.length < totalImages
          && status === 'resolve'
          && <Button loadMore={handleLoadMore} />
          }
        </>
      }
      {
        showModal &&
        <Modal
          image={getLargeImageURL()}
          onClose={toggleModal}
        />
      }
    </>
  );

}

// class App extends Component {
//   state = {
//     searchQuery: '',
//     totalImages: 0,
//     images: [],
//     status: "idle",
//     error: null,
//     activeOptionIndex: null,
//     showModal: false
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchQuery } = this.state;

//     if (prevState.searchQuery !== searchQuery) {
//       page = 1

//       this.setState({
//           status: 'pending',
//           images: []
//       })
        
//       fetch(`${MAINURL}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
//           .then(response =>  response.json())
//           .then(({total, hits}) => {
//               if (hits.length === 0) {
//                   return Promise.reject(
//                       new Error('Nothing was found for this query!')
//                   )
//               }

//               page += 1

//               return this.setState({
//                   images: hits.map(({ id, webformatURL, largeImageURL }) => ({
//                       id, webformatURL, largeImageURL
//                   })),
//                   totalImages: total,
//                   status: 'resolve'
//               })
//           })
//           .catch(error => this.setState({error, status: 'rejected'}))
//     }
//   };

//   handleLoadMore = () => {
//     const { searchQuery } = this.state;
    
//     this.setState({ status: 'pending' })
    
//     fetch(`${MAINURL}&q=${searchQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
//         .then(response => response.json())
//         .then(({ hits }) => {
//             page += 1;
//             return this.setState(prevState => ({
//                 images: [...prevState.images, ...hits.map(({ id, webformatURL, largeImageURL }) => ({
//                         id, webformatURL, largeImageURL
//                 }))],
//                 status: 'resolve',
//             }))
//         })
//   }

//   handleSearchQueryFormSubmit = query => {
//     this.setState({ searchQuery: query })
//   };

//   setActiveIndex = index => {
//     this.setState({
//         activeOptionIndex: index,
//         showModal: !this.state.showModal
//     });
//   }

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//         showModal: !showModal,
//     }))
//   }

//   getLargeImageURL = () => {
//     const { images, activeOptionIndex } = this.state;
//     return images[activeOptionIndex].largeImageURL;
//   }

//   render() {
//     const { images, error, status, totalImages, showModal, activeOptionIndex } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleSearchQueryFormSubmit} />

//         {status === 'idle' && <Notification message='Enter a query!' />} 
        
//         {status === 'rejected' && <Notification message={error.message} />}
        
//         {(status === 'resolve' || status === 'pending') && 
//           <>
//             <ImageGallery
//               images={images}
//               onClick={this.setActiveIndex}
//             />
//             {status === 'pending' && <Loader />}
//             {
//               totalImages > perPage && images.length < totalImages && status === 'resolve' &&
//               <Button loadMore={this.handleLoadMore} />
//             }
//           </>
//         }
//         {
//           showModal && 
//           <Modal
//               image={this.getLargeImageURL()}
//               onClose={this.toggleModal}
//           />
//         }
//       </>
//     )
//   }
// }

export default App;
