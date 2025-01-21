import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from 'axios';

function Checkout({ cartItems, onClearCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTotal = () => {
    let totalprize = 0;
    cartItems?.map((curElem) => {
      totalprize = totalprize + curElem?.price;
    })
    setTotal(totalprize);
  }

  useEffect(() => {
    getTotal();
  }, [cartItems]);

  const sendMail = async () => {
    try {
      setLoading(true);
      const res = await axios.post('https://krishi-bazar-ply9.onrender.com/mailus', { name, email, mobile, address, cartItems, total },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }

      )
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setTotal("");
        onClearCart();
      }
      else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error('error while placing your order\nPlease try later!')
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div class="container" id="checkout">
        <div class="checkout">
          <div class="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {
                cartItems?.map((curElem, index) => (
                  <li><span> {index + 1}. {curElem?.name}</span><span>₹{curElem?.price}</span></li>
                ))
              }
            </ul>
            <div class="total">
              {
                total > 0 ? <>Total: ₹{total}
                </> : ''
              }
            </div>
          </div>

          <div class="billing-details">
            <h2>Billing Details</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
            <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile number" />
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"></textarea>
            {
              loading ? (
                <button className="checkout-btn">
                  <img src="./img/loader.png" alt="" className='Loader' />
                  Please wait
                </button>
              ) : (
                <button class="checkout-btn" onClick={sendMail}>Submit Order</button>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;