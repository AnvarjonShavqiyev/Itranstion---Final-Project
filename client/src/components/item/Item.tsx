import { Link } from "react-router-dom"
import { Item } from "../../types/ElementTypes"
import { useTranslation } from "react-i18next"
const ItemC = ({item}:{item:Item}) => {
  const { t } = useTranslation()
  console.log(item)
  return (
    <div className="collection-wrapper" key={item._id}>
      <img width={400} height={350} src={item.image} alt="" />
      <div className="collection-info">
        <Link to={`/singleItem/${item._id}`}>View item</Link>
      </div>
      <div className="collection-info-wrapper">
        <p>{item.name}</p>
        <p>
          {item.comments.length} {item.comments.length > 1 ? ' ' + t('comments') : ' ' + t('comment')}
        </p>
      </div>
      <p>
        0{item.like} {item.like > 1 ? ' ' + t('likes') : ' ' + t('like')}
      </p>
    </div>
  )
}

export default ItemC