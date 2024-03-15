import { Collection } from "../../types/ElementTypes"
import { useTranslation } from "react-i18next"
const CollectionC = ({collection}:{collection:Collection}) => {
  const { t } = useTranslation()
  return (
    <div className="collection-wrapper" key={collection._id}>
        <img width={400} height={300} src={collection.image} alt="" />
        <div className="collection-info">
          <p>{collection.name}</p>
          <p>{collection.items.length}{collection.items.length > 1 ? ' ' + t('items') : ' ' + t('item')}</p>
        </div>
    </div>
  )
}

export default CollectionC