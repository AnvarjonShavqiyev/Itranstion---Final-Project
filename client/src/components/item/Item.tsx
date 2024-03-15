import { Item } from "../../types/ElementTypes"
import { useTranslation } from "react-i18next"
const ItemC = ({item}:{item:Item}) => {
  const { t } = useTranslation()
  return (
    <div className="collection-wrapper" key={item._id}>
      <img width={400} height={350} src={item.image} alt="" />
      <div className="collection-info">
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