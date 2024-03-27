import { useParams } from "react-router-dom"
import { Container } from "../../utils/Utils"
import AdminNav from "../../components/adminNav/AdminNav"
import defImage from '../../assets/images/k1.jpg';
import { useState } from "react";
import './ManageItems.scss'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addItem } from "../../redux/features/collectionSlice";
import { Collection, User } from "../../types/ElementTypes";
import { ToastContainer } from "react-toastify";
interface InputField {
  id: number;
  value: string;
}
const ManageItems = () => {
  const {type} = useParams()
  const [image, setImage] = useState<File | null | any>(null);
  const [name, setName] = useState<string>('');
  const [tags, setTags] = useState<string>('')
  const [inputFields, setInputFields] = useState<InputField[]>([{ id: 0, value: '' }]);
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state:RootState) => state.auth.user) as User
  const collection = useSelector((state:RootState) => state.collections.collection) as Collection
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ id: inputFields.length, value: '' });
    setInputFields(values);
  };
  const handleInputChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...inputFields];
    const index = values.findIndex(field => field.id === id);
    if (index !== -1) {
      values[index].value = event.target.value;
      setInputFields(values);
    }
  };
  const handleRemoveFields = (id: number) => {
    const values = inputFields.filter(field => field.id !== id);
    setInputFields(values);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('tags', tags);
    formData.append('user_id', user._id); 
    formData.append('collection_id', collection._id); 
    if (type === 'create'){
      dispatch(addItem(formData))
    }
    if (type === 'edit'){

    }
  }
  return (
    <>
      <AdminNav/>
      <Container>
        <div className="manage-item-wrapper">
          <form className="create-content-wrapper" onSubmit={(e) => handleSubmit(e)}>
            <div className="img-input">
              {type === 'create' ? 
                <img width={500} height={400} src={image ? URL.createObjectURL(image) : defImage} alt="" />
                :
                <img width={500} height={400} src={image} alt="" />
              }
              <input type="file" onChange={handleImageChange} />
            </div>
            <div className='collection-info-inputs'>
              <div className='input-wrapper'>
                <label htmlFor="collectionName">Item name:</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" required={true} id="collectionName" />
              </div>
              <div className='input-wrapper'>
                <label htmlFor="topic">Tags:</label>
                <p style={{color:'#d50000'}}>Each tag should be sperated with hashtag(#) like: #tags#tag#taggs</p>
                <input onChange={(e) => setTags(e.target.value)} value={tags} required={true} type="text" id="topic" />
              </div>
              <div>
                {inputFields.map(inputField => (
                  <div className="additional-inputs" key={inputField.id}>
                    <input
                      type="text"
                      placeholder="Key"
                      value={inputField.value}
                      onChange={event => handleInputChange(inputField.id, event)}
                    />
                    <p>:</p>
                    <input
                      type="text"
                      placeholder="Value"
                      value={inputField.value}
                      onChange={event => handleInputChange(inputField.id, event)}
                    />
                    <button type="button" className="addInput-btn" onClick={() => handleRemoveFields(inputField.id)}>Remove</button>
                  </div>
                ))}
                <button type="button" className="create-btn" onClick={handleAddFields}>Add Information</button>
              </div>
              <button style={{width:"100%"}} className="addInput-btn">Add Item</button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </Container>
    </>
  )
}

export default ManageItems