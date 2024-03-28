import { useParams } from "react-router-dom"
import { Container } from "../../utils/Utils"
import AdminNav from "../../components/adminNav/AdminNav"
import defImage from '../../assets/images/k1.jpg';
import { useEffect, useState } from "react";
import './ManageItems.scss'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addItem, editItem } from "../../redux/features/collectionSlice";
import { Collection, Item, User } from "../../types/ElementTypes";
import { ToastContainer } from "react-toastify";
import { getSingleItem } from "../../redux/features/itemSlice";

const ManageItems = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [image, setImage] = useState<File | null | any>(null);
  const [name, setName] = useState<string>('');
  const [tags, setTags] = useState<string>('')
  const [keyInput, setKeyInput] = useState<string>('');
  const [valueInput, setValueInput] = useState<string>('');
  const [items, setItems] = useState<{ [key: string]: string }[]>([]);
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state:RootState) => state.auth.user) as User
  const collection = useSelector((state:RootState) => state.collections.collection) as Collection
  const item = useSelector((state:RootState) => state.items.item) as Item

  const handleKeyInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyInput(event.target.value);
  };
  const handleValueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  };
  const handleButtonClick = () => {
    const newItem = { [keyInput]: valueInput };
    setItems([...items, newItem]);
    setKeyInput('');
    setValueInput('');
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
    formData.append('additionalInfo', JSON.stringify(items));
    if (type === 'create'){
      dispatch(addItem(formData))
    }
    if (type === 'edit'){
      id && dispatch(editItem([formData, id]))
    }
  }
  useEffect(() => {
    const loadData = async () => {
      if (type === 'edit' && id) {
        await dispatch(getSingleItem(id));
      }
      if (type === 'create') {
        setImage(null);
        setName('');
        setTags('')
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    if (type === 'edit' && item) {
      setImage(item.image);
      setName(item.name);
      setTags(item.tags)
      setItems(JSON.parse(item.additionalInfo))
    }
  }, [item]);

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
                <div>
                  <input
                    type="text"
                    value={keyInput}
                    onChange={handleKeyInputChange}
                    placeholder="Enter key..."
                  />
                  <input
                    type="text"
                    value={valueInput}
                    onChange={handleValueInputChange}
                    placeholder="Enter value..."
                  />
                  <button type="button" onClick={handleButtonClick}>Add</button>
                  {
                    items.map((item, index) => (
                      Object.entries(item).map(([key, value]) => (
                        <p key={index}>{`${key}:${value}`}</p>
                      ))
                    ))
                  }
                </div>
              </div>
              <button style={{width:"100%"}} className="addInput-btn">{type === 'edit' ? 'Edit' : 'Add'} Item</button>
            </div>
          </form>
        </div>
        <ToastContainer/>
      </Container>
    </>
  )
}

export default ManageItems