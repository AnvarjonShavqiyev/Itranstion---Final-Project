import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Collection, User } from "../../types/ElementTypes";
import './Dashboard.scss';
import { Link, Outlet } from "react-router-dom";
import AdminNav from "../../components/adminNav/AdminNav";
import AdminTable from "../../components/adminTable/AdminTable";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user) as User;
  const allCollections = useSelector((state: RootState) => state.collections.collections) as Collection[];
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      setCollections(allCollections);
    } else {
      setCollections(user?.collections || []);
    }
  }, [user, allCollections]);

  return (
    <div>
      <AdminNav />
      <div className="dashboard-wrapper">
        <div className="actions-wrapper">
          <Link to={`manage-collection/create/${user._id}`}>Create</Link>
          <Link to='manage-collection/edit'>Edit</Link>
          <button>Delete</button>
        </div>
        <AdminTable collections={collections} />
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
