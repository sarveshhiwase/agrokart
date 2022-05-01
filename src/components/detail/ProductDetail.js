import { useState, useEffect, useContext, useRef } from 'react';
// import { useHistory } from 'react-router';
// import * as routeService from '../../services/route';
import * as storageService from '../../services/storage';
// import * as wishlistService from '../../services/wishlist';
import app from 'firebase';
import { Context } from '../../context/AppContext';

// import * as ROUTES from '../../constants/routes';
import * as STORAGE_KEYS from '../../constants/storage-keys';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const priceRef = useRef(null);
  const productDescriptionRef = useRef(null);
  // const history = useHistory();
  const { user } = useContext(Context);

  useEffect(() => {
    const product = JSON.parse(storageService.get(STORAGE_KEYS.PRODUCT));

    if (product) {
      setProduct(() => product);
    }
  }, []);

  const addToWishlist = async () => {
    if (!priceRef.current.value || !productDescriptionRef.current.value) {
      alert('Please add a price and description');
      return;
    }
    const productRef = app.database().ref('products').child(product.id);
    if (!product.interested) {
      product.interested = [];
    }
    productRef.update({
      interested: [
        {
          user: user.id,
          price: priceRef.current.value,
          description: productDescriptionRef.current.value,
        },
        ...product.interested,
      ],
    });
    try {
    } catch (err) {
      alert(err);
    }
    // wishlistService.addToWishlist(product);
  };

  // const chatWithSeller = () => {
  //   storageService.save({
  //     key: STORAGE_KEYS.SELLER,
  //     payload: product.createdBy,
  //   });
  //   routeService.navigate({ route: ROUTES.SELLER, push: history.push });
  // };

  if (!product) return <></>;

  return (
    <div className="product__detail">
      <div className="product__detaili">
        <img src={product.image} alt="product" />
      </div>
      <div className="product__detailinf">
        <p className="product__detailn">{product.name}</p>
        <p className="product__detailp">{product.price}$</p>
        <div className="product__detailqc">
          <span>Price: </span>
          <input
            className="product__detailq"
            type="text"
            defaultValue={1}
            min={1}
            ref={priceRef}
          />
          <label htmlFor="biddesc">
            <span>Description: </span>
          </label>
          <textarea
            type="text"
            id="biddesc"
            className="sell__description"
            placeholder="Product Description"
            ref={productDescriptionRef}
          />
        </div>
        <div className="product__detaila">
          <button onClick={addToWishlist}>Interested</button>
          {/* <button onClick={chatWithSeller}>Chat with Seller</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
