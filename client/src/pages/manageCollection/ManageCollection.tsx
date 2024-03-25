import { useParams } from 'react-router-dom';
import './ManageCollection.scss';
import AdminNav from '../../components/adminNav/AdminNav';
import { useState } from 'react';
import defImage from '../../assets/images/k1.jpg';

const ManageCollection = () => {
  const { type } = useParams();
  const [image, setImage] = useState<File | null>(null); 

  console.log(image);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); 
    }
  };

  return (
    <div className='manage-collection-wrapper'>
      <AdminNav />
      {type === 'create' ? (
        <form className='create-content-wrapper'>
          <div className="img-input">
            <img width={500} height={400} src={image ? URL.createObjectURL(image) : defImage} alt="" /> {/* Use URL.createObjectURL to display image */}
            <input type="file" required={true} onChange={handleImageChange} />
          </div>
          <div className='collection-info-inputs'>
            <div className='input-wrapper'>
              <label htmlFor="collectionName">Collection name:</label>
              <input type="text" required={true} id="collectionName"/>
            </div>
            <div className='input-wrapper'>
              <label htmlFor="description">Description:</label>
              <textarea cols={30} required={true} rows={10} id='description'></textarea>
            </div>
            <div className='input-wrapper'>
              <label htmlFor="topic">Topic:</label>
              <input required={true} type="text" id="topic"/>
            </div>
          </div>
          <button className='create-btn'>Create</button>
        </form>
      ) : (
        <div className='edit-content-wrapper'></div>
      )}
    </div>
  );
};

export default ManageCollection;
