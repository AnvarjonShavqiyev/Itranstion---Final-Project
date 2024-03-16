import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { searchByTag } from "../../redux/features/searchSlice";
import { Container } from "../../utils/Utils";
import "./SearchRpage.scss";
import ItemC from "../../components/item/Item";
import { Collection, Comment, Item } from "../../types/ElementTypes"; // Assuming correct import for Item and Collection
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
  }, [tag, dispatch]);

  return (
    <Container>
      <Nav />
      <p className="search-result-title">Search Results</p>
      <div className="search-result-section">
        <div className="search-section-title">Items by #tag</div>
        <div className="search-result-wrapper">
          {tagResult && tagResult.length > 0 ? (
            tagResult.map((el: Item) => (
              <ItemC key={el._id} item={el} />
            ))
          ) : (
            <p>No items</p>
          )}
        </div>
      </div>
      <div className="search-result-section">
        <div className="search-section-title">Collections</div>
        <div className="search-result-wrapper">
          {keyResult && keyResult.collections.length > 0 ? (
            keyResult.collections.map((el: Collection) => (
              <CollectionC key={el._id} collection={el} />
            ))
          ) : (
            <p>No collections</p>
          )}
        </div>  
        <div className="search-section-title">Comments</div>
        <div className="search-result-wrapper">
          {keyResult && keyResult.comments.length > 0 ? (
            keyResult.comments.map((el: Comment) => (
              <div>
                <p>{el.text}</p>
              </div>
            ))
          ) : (
            <p>No comments</p>
          )}
        </div>  
      </div>
    </Container>
  );
};

export default SearchRpage;
