import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { searchByTag } from "../../redux/features/searchSlice";
import { Container } from "../../utils/Utils";
import "./SearchRpage.scss";
import ItemC from "../../components/item/Item";
import { Collection, Item } from "../../types/ElementTypes"; // Assuming correct import for Item and KeySearchResult
import Nav from "../../components/nav/Nav";
import CollectionC from "../../components/collection/Collection";

const SearchRpage: React.FC = () => {
  const tagResult = useSelector((state: RootState) => state.search.tagResult);
  const keyResult = useSelector((state: RootState) => state.search.keyResult);
  const dispatch = useDispatch<AppDispatch>();
  const { tag } = useParams<{ tag?: string }>();

  useEffect(() => {
    if (tag) {
      dispatch(searchByTag(tag));
    }
  }, [tag]);

  console.log(keyResult);

  return (
    <Container>
      <Nav />
      <p className="search-result-title">Search Results</p>
      <p className="search-section-title">Items</p>
      <div className="search-result-wrapper">
        {tagResult ? (
          tagResult.map((el: Item) => {
            return <ItemC key={el._id} item={el} />;
          })
        ) : (
          <p>No items</p>
        )}
      </div>
      <p className="search-section-title">Collections</p>
      <div className="search-result-wrapper">
        {keyResult ? (
          keyResult.collections.map((el: Collection) => {
            return <CollectionC key={el._id} collection={el} />;
          })
        ) : (
          <p>No collections</p>
        )}
      </div>
    </Container>
  );
};

export default SearchRpage;
