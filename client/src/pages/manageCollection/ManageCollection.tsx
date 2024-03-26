import { useParams } from 'react-router-dom';
import './ManageCollection.scss';
import AdminNav from '../../components/adminNav/AdminNav';
import { useState } from 'react';
import defImage from '../../assets/images/k1.jpg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createCollection } from '../../redux/features/collectionSlice';

const ManageCollection = () => {
  const { type } = useParams();
  const [image, setImage] = useState<File | null | any>(null); 
  const [name, setName] = useState<string>(''); 
  const [description, setDescription] = useState<string>(''); 
  const [topic, setTopic] = useState<string>(''); 
  const dispatch = useDispatch<AppDispatch>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]); 
    }
  };
 
  function createCol(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      const collectionForm = new FormData()
      collectionForm.append('name',name)
      collectionForm.append('image',image)
      collectionForm.append('discreption',description)
      collectionForm.append('topic',topic)
      dispatch(createCollection(collectionForm))
  }

  return (
    <div className='manage-collection-wrapper'>
      <AdminNav />
      {type === 'create' ? (
        <form className='create-content-wrapper'  onSubmit={(e) => createCol(e)}>
          <div className="img-input">
            <img width={500} height={400} src={image ? URL.createObjectURL(image) : defImage} alt="" />
            <input type="file" required={true} onChange={handleImageChange} />
          </div>
          <div className='collection-info-inputs'>
            <div className='input-wrapper'>
              <label htmlFor="collectionName">Collection name:</label>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" required={true} id="collectionName"/>
            </div>
            <div className='input-wrapper'>
              <label htmlFor="description">Description:</label>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} cols={30} required={true} rows={10} id='description'></textarea>
            </div>
            <div className='input-wrapper'>
              <label htmlFor="topic">Topic:</label>
              <input onChange={(e) => setTopic(e.target.value)} value={topic} required={true} type="text" id="topic"/>
            </div>
          </div>
          <button type='submit' className='create-btn'>Create</button>
        </form>
      ) : (
        <div className='edit-content-wrapper'></div>
      )}
    </div>
  );
};

export default ManageCollection;
