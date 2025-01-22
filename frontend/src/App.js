import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Checkout from "./CheckOut";
import toast from "react-hot-toast";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

function Navbar() {

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "200px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">Krishi Bazaar</h1>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>

          </ul>
          <FontAwesomeIcon icon={faBars} onClick={openNav} className='menuicon' />
        </div>
      </nav>
      <div id="mySidenav" className="sidenav">
        <div className="closebtn" onClick={closeNav}><FontAwesomeIcon icon={faClose} /></div>
        <div onClick={closeNav}><a href="#home"  >Home</a></div>
        <div onClick={closeNav}><a href="#products"  >Products</a></div>
        <div onClick={closeNav}><a href="#about"  >About</a></div>
        <div onClick={closeNav}><a href="#contact"  >Contact</a></div>
      </div >
    </>
  );
}

function Home() {

  return (
    // <section id="home" className="home">
    //   <div className="container">
    //     <h2>Welcome to Krishi Bazaar</h2>
    //     <p>Your one-stop solution for agricultural products.</p>
    //     <a href="#products" className="btn">Shop Now</a>
    //   </div>
    // </section>
    <section class="hero-slider" id="home">
      <div class="slider-container" id="slide">
        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop" alt="Farm Fresh Products" />
        <img src="/img/upscale1737032542002.jpg" alt="Quality Seeds" />
        <img src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=1200&h=400&fit=crop" alt="Best Fertilizers" />
      </div>
      {/* <button onClick={()=>leftSlider('left')} class="slider-btn prev">❮</button>
      <button class="slider-btn next" onClick={()=>leftSlider('right')} >❯</button> */}
    </section>
  );
}

function Products({ addToCart }) {
  const productList = [
    { id: 1, name: "Organic Fertilizer", price: 499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gUUbWlyL8AHSv8OK4sFCF-KtNdobvaQ_pQ&s" },
    { id: 2, name: "Bio Pesticide", price: 299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQH1mETyYzMC40_BOA1U-dPBl6pYjKTU75hQ&s" },
    { id: 3, name: "Hybrid Seeds", price: 199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSulF9Sl2pAwTXyaMhjSfUadtZnk7d7jfN8aQ&s" },
    { id: 4, name: "Farming Tools", price: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFrae3KqZxQN6jDhyMALx74YB0duxBmGWPow&s" },
  ];

  return (
    <section id="products" className="products">
      <div className="container">
        <h2>Our Products</h2>
        <div className="product-grid">
          {productList.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cart({ cartItems }) {
  const navigate = useNavigate();

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <button><a href="#checkout">Proceed to Checkout</a></button>
      )}
    </div>
  );
}


function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Us</h2>
        <p>
          At <strong>Krishi Bazaar</strong>, we are dedicated to supporting farmers and gardeners
          with high-quality agricultural products and tools. Our mission is to revolutionize
          the agricultural sector by providing eco-friendly and cost-effective solutions.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <h3>🌱 Our Mission</h3>
            <p>
              To empower farmers and gardeners with sustainable agricultural products
              that ensure maximum yield while preserving the environment.
            </p>
          </div>
          <div className="about-card">
            <h3>🌟 Our Vision</h3>
            <p>
              To become the most trusted platform for agricultural products and create
              a positive impact on the global farming community.
            </p>
          </div>
          <div className="about-card">
            <h3>💡 Why Choose Us?</h3>
            <ul>
              <li>Premium quality products</li>
              <li>Affordable pricing</li>
              <li>Eco-friendly solutions</li>
              <li>Dedicated customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState("");

  const sendMail = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post('https://krishi-bazar-ply9.onrender.com/contactus', { name, email, mobile, message },
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
        setMessage("");
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
    <section id="contact" className="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required />
          <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Your Mobile number" required />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" required></textarea>
          {
            loading ? (
              <button className="btn">
                <img src="./img/loader.png" alt="" className='Loader' />
                Please wait
              </button>
            ) : (
              <button type="submit" className="btn" onClick={sendMail}>Send Message</button>
            )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 Krishi Bazaar. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Navbar />
      <Home />
      <Products addToCart={addToCart} />
      <About />
      <Contact />
      <Cart cartItems={cartItems} />
      <Checkout cartItems={cartItems} onClearCart={clearCart} />
      <Footer />
    </div>
  );
}


export default App;