import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { Collection } from "../../../types/ElementTypes";
import './Collections.scss'
import AdminTable from "../../../components/adminTable/AdminTable";
const Collections = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const collectionsStore = useSelector((state: RootState) => state.collections.collections) as Collection[];
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if(collections && user){
      user?.role === 'admin' ? setCollections(collectionsStore) : setCollections(user?.collections);
    }
  }, [user, collectionsStore]);
  console.log(collections)
  return (
    <div className="admin-collection-wrapper">
      <h2>Your collections</h2>
      <AdminTable collections={collections}/>
    </div>
  );
};

export default Collections;
