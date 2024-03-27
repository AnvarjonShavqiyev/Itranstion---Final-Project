import { useParams } from 'react-router-dom';
import './ManageCollection.scss';
import AdminNav from '../../components/adminNav/AdminNav';
import { useEffect, useState } from 'react';
import defImage from '../../assets/images/k1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createCollection, getSingleCollection, updateCollection } from '../../redux/features/collectionSlice';
import { ToastContainer } from 'react-toastify';
import { Collection, User } from '../../types/ElementTypes';

const ManageCollection = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [image, setImage] = useState<File | null | any>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const collection = useSelector((state: RootState) => state.collections.collection) as Collection;
  const user = useSelector((state: RootState) => state.auth.user) as User;
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const createCol = (formData: FormData) => {
    dispatch(createCollection(formData));
  };

  const updateCol = (formData: FormData) => {
    id && dispatch(updateCollection([formData, id]));
  };

  useEffect(() => {
    const loadData = async () => {
      if (type === 'edit' && id) {
        await dispatch(getSingleCollection(id));
      }
      if (type === 'create') {
        setImage(null);
        setDescription('');
        setName('');
        setTopic('');
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (type === 'edit' && collection) {
      setImage(collection.image);
      setDescription(collection.discreption);
      setName(collection.name);
      setTopic(collection.topic);
    }
  }, [collection]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('discreption', description);
    formData.append('topic', topic); 
    formData.append('user_id', user._id as string);  
    if (type === 'create') {
      createCol(formData);
    } 
    if (type === 'edit') {
      updateCol(formData);
    }
  };

  return (
    <div className='manage-collection-wrapper'>
      <AdminNav />
      <form className='create-content-wrapper' onSubmit={handleSubmit}>
        <div className="img-input">
          {type === 'create' ? 
            <img width={500} height={400} src={image ? URL.createObjectURL(image) : defImage} alt="" />
            :
            <img width={500} height={400} src={image} alt="" />
          }
          <input type="file" required={true} onChange={handleImageChange} />
        </div>
        <div className='collection-info-inputs'>
          <div className='input-wrapper'>
            <label htmlFor="collectionName">Collection name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required={true} id="collectionName" />
          </div>
          <div className='input-wrapper'>
            <label htmlFor="description">Description:</label>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} cols={30} required={true} rows={10} id='description'></textarea>
          </div>
          <div className='input-wrapper'>
            <label htmlFor="topic">Topic:</label>
            <input onChange={(e) => setTopic(e.target.value)} value={topic} required={true} type="text" id="topic" />
          </div>
        </div>
        <button type='submit' className='create-btn'>{type === 'create' ? 'Create' : 'Update'}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ManageCollection;
