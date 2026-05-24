import { useState, useEffect } from "react";

const API = "https://flower-shop-app-9x1t.onrender.com";
const LOGO = "data:image/png;base64,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";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#c9a84c;--gold-light:#e8c97a;--gold-dark:#a07828;--gold-faint:#1a1508;
  --black:#0a0a0a;--black-mid:#111111;--black-soft:#1a1a1a;--black-card:#141414;
  --border:#2a2410;--border-gold:#3d3010;
  --text:#f0e6c8;--text2:#c9b78a;--text3:#8a7a5a;
  --white:#fff;--success:#1a3a1a;--error:#3a1010;
}
body{font-family:'DM Sans',sans-serif;background:var(--black);color:var(--text);min-height:100vh}

.nav{background:var(--black-mid);border-bottom:1px solid var(--border-gold);padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:70px;position:sticky;top:0;z-index:100;box-shadow:0 2px 20px rgba(201,168,76,0.1)}
.nav-brand{display:flex;align-items:center;gap:12px}
.nav-logo{width:52px;height:52px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(201,168,76,0.4))}
.nav-brand-text{font-family:'Playfair Display',serif;font-size:20px;color:var(--gold);font-weight:700;letter-spacing:1px}
.nav-brand-text span{color:var(--text2);font-size:11px;display:block;font-family:'DM Sans',sans-serif;font-weight:300;letter-spacing:3px;text-transform:uppercase;margin-top:1px}
.nav-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.nav-btn{background:none;border:1px solid var(--border-gold);border-radius:20px;padding:6px 16px;font-size:13px;cursor:pointer;color:var(--text2);font-family:'DM Sans',sans-serif;transition:all .2s}
.nav-btn:hover{background:var(--gold-faint);border-color:var(--gold);color:var(--gold)}
.nav-btn.primary{background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--black);border-color:var(--gold);font-weight:500}
.nav-btn.primary:hover{background:linear-gradient(135deg,var(--gold),var(--gold-light))}
.cart-btn{position:relative;background:var(--gold-faint);border:1px solid var(--gold-dark);border-radius:20px;padding:6px 16px;font-size:13px;cursor:pointer;color:var(--gold);font-family:'DM Sans',sans-serif;transition:all .2s}
.cart-btn:hover{background:var(--border-gold);border-color:var(--gold)}
.cart-count{position:absolute;top:-6px;right:-6px;background:var(--gold);color:var(--black);font-size:10px;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-weight:700}

.main{flex:1;padding:28px;max-width:980px;margin:0 auto;width:100%}

.alert{padding:12px 18px;border-radius:8px;font-size:14px;margin-bottom:18px;border-left:3px solid}
.alert.success{background:var(--success);color:#7ec87e;border-color:#4a8a4a}
.alert.error{background:var(--error);color:#e88a8a;border-color:#8a4a4a}

.card{background:var(--black-card);border:1px solid var(--border-gold);border-radius:12px;padding:28px;margin-bottom:16px}

.form-group{margin-bottom:16px}
.form-group label{display:block;font-size:12px;font-weight:500;color:var(--gold);margin-bottom:6px;letter-spacing:1px;text-transform:uppercase}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 14px;border:1px solid var(--border-gold);border-radius:8px;font-size:14px;font-family:'DM Sans',sans-serif;color:var(--text);background:var(--black-soft);transition:border .2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 2px rgba(201,168,76,0.1)}
.form-group select option{background:var(--black-soft);color:var(--text)}
.form-group textarea{resize:vertical;min-height:80px}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 22px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .2s}
.btn-primary{background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--black);font-weight:600}
.btn-primary:hover{background:linear-gradient(135deg,var(--gold),var(--gold-light));transform:translateY(-1px)}
.btn-secondary{background:var(--black-soft);color:var(--text2);border:1px solid var(--border-gold)}
.btn-secondary:hover{border-color:var(--gold);color:var(--gold)}
.btn-danger{background:var(--error);color:#e88a8a;border:1px solid #5a2020}
.btn-danger:hover{background:#4a1515}
.btn-sm{padding:6px 12px;font-size:12px}
.btn-full{width:100%}
.btn:disabled{opacity:0.4;cursor:not-allowed;transform:none}

.tabs{display:flex;gap:4px;margin-bottom:24px;background:var(--black-card);padding:4px;border-radius:10px;border:1px solid var(--border-gold)}
.tab{flex:1;padding:8px;border:none;background:none;border-radius:7px;font-size:13px;font-weight:500;cursor:pointer;color:var(--text3);font-family:'DM Sans',sans-serif;transition:all .2s}
.tab.active{background:linear-gradient(135deg,var(--gold-dark),var(--gold));color:var(--black);font-weight:600}
.tab:hover:not(.active){color:var(--gold)}

.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:18px}
.product-card{background:var(--black-card);border:1px solid var(--border-gold);border-radius:12px;overflow:hidden;transition:transform .2s,border-color .2s,box-shadow .2s}
.product-card:hover{transform:translateY(-3px);border-color:var(--gold);box-shadow:0 8px 30px rgba(201,168,76,0.15)}
.product-img{background:linear-gradient(135deg,#1a1508,#0f0f0f);height:140px;display:flex;align-items:center;justify-content:center;font-size:52px;border-bottom:1px solid var(--border-gold)}
.product-info{padding:16px}
.product-name{font-weight:500;font-size:14px;margin-bottom:4px;color:var(--text)}
.product-desc{font-size:12px;color:var(--text3);margin-bottom:10px;line-height:1.5}
.product-price{font-size:18px;font-weight:700;color:var(--gold);font-family:'Playfair Display',serif;margin-bottom:4px}
.product-stock{font-size:11px;color:var(--text3);margin-bottom:12px}
.product-stock.low{color:#c9a84c}.product-stock.out{color:#e88a8a}

.badge{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-weight:500;margin-right:4px;margin-bottom:6px}
.badge-cat{background:#1a1508;color:var(--gold);border:1px solid var(--border-gold)}
.badge-occ{background:#0a1a0a;color:#7ec87e;border:1px solid #1a3a1a}

.filter-bar{display:flex;gap:10px;margin-bottom:22px;flex-wrap:wrap}
.filter-bar input,.filter-bar select{padding:9px 14px;border:1px solid var(--border-gold);border-radius:8px;font-size:13px;font-family:'DM Sans',sans-serif;background:var(--black-soft);color:var(--text)}
.filter-bar input{flex:1;min-width:160px}
.filter-bar input:focus,.filter-bar select:focus{outline:none;border-color:var(--gold)}
.filter-bar select option{background:var(--black-soft)}

.cart-item{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border-gold)}
.cart-item:last-child{border-bottom:none}
.cart-emoji{font-size:28px;width:46px;height:46px;background:var(--gold-faint);border:1px solid var(--border-gold);border-radius:8px;display:flex;align-items:center;justify-content:center}
.qty-ctrl{display:flex;align-items:center;gap:8px}
.qty-btn{width:28px;height:28px;border-radius:50%;border:1px solid var(--border-gold);background:var(--black-soft);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;color:var(--gold);transition:all .2s}
.qty-btn:hover{background:var(--gold-faint);border-color:var(--gold)}
.cart-total{background:var(--gold-faint);border:1px solid var(--border-gold);border-radius:10px;padding:18px;margin-top:18px}
.cart-total-row{display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;color:var(--text2)}
.cart-total-row.grand{font-weight:700;font-size:17px;color:var(--gold);border-top:1px solid var(--border-gold);padding-top:8px;margin-top:4px}

.order-card{background:var(--black-card);border:1px solid var(--border-gold);border-radius:12px;padding:18px;margin-bottom:14px}
.order-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px}
.status-badge{padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500}
.status-Pending{background:#1a1508;color:var(--gold);border:1px solid var(--border-gold)}
.status-Processing{background:#08101a;color:#7ab4e8;border:1px solid #1a304a}
.status-Out{background:#0a1a0a;color:#7ec87e;border:1px solid #1a3a1a}
.status-Delivered{background:#0a1a15;color:#7ecab0;border:1px solid #1a3a30}
.status-Cancelled{background:var(--error);color:#e88a8a;border:1px solid #5a2020}
.track-bar{display:flex;align-items:flex-start;margin:14px 0}
.track-step{flex:1;text-align:center;position:relative}
.track-dot{width:18px;height:18px;border-radius:50%;background:var(--black-soft);border:2px solid var(--border-gold);margin:0 auto 4px}
.track-dot.done{background:var(--gold-dark);border-color:var(--gold)}
.track-dot.current{background:var(--gold);border-color:var(--gold-light);box-shadow:0 0 8px rgba(201,168,76,0.5)}
.track-line{position:absolute;top:9px;left:50%;width:100%;height:2px;background:var(--border-gold);z-index:0}
.track-line.done{background:linear-gradient(90deg,var(--gold-dark),var(--gold))}
.track-label{font-size:10px;color:var(--text3);line-height:1.3}
.track-label.done{color:var(--gold-dark)}.track-label.current{color:var(--gold);font-weight:600}

.admin-table{width:100%;border-collapse:collapse;font-size:13px}
.admin-table th{text-align:left;padding:12px 14px;border-bottom:2px solid var(--border-gold);color:var(--gold);font-weight:600;letter-spacing:0.5px;text-transform:uppercase;font-size:11px}
.admin-table td{padding:12px 14px;border-bottom:1px solid var(--border-gold);color:var(--text2)}
.admin-table tr:hover td{background:var(--gold-faint)}

.section-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;margin-bottom:4px;color:var(--gold)}
.section-sub{font-size:14px;color:var(--text3);margin-bottom:22px}
.row{display:flex;gap:16px;flex-wrap:wrap}.col-half{flex:1;min-width:240px}
.divider{border:none;border-top:1px solid var(--border-gold);margin:18px 0}

.delivery-options{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.delivery-opt{border:2px solid var(--border-gold);border-radius:10px;padding:14px;cursor:pointer;text-align:center;transition:all .2s;background:var(--black-soft)}
.delivery-opt:hover{border-color:var(--gold)}
.delivery-opt.selected{border-color:var(--gold);background:var(--gold-faint);box-shadow:0 0 12px rgba(201,168,76,0.1)}
.delivery-opt-icon{font-size:26px;margin-bottom:5px}
.delivery-opt-label{font-size:13px;font-weight:600;color:var(--text)}
.delivery-opt-price{font-size:12px;color:var(--text3);margin-top:2px}

.support-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:22px}
.support-opt{background:var(--black-card);border:1px solid var(--border-gold);border-radius:10px;padding:18px;text-align:center;transition:all .2s}
.support-opt:hover{border-color:var(--gold);box-shadow:0 4px 20px rgba(201,168,76,0.1)}
.support-opt-icon{font-size:26px;margin-bottom:8px}
.support-opt-label{font-size:13px;font-weight:600;color:var(--gold)}

.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;backdrop-filter:blur(4px)}
.modal{background:var(--black-card);border:1px solid var(--gold-dark);border-radius:16px;padding:32px;max-width:440px;width:100%;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.8)}
.modal-logo{width:80px;height:80px;object-fit:contain;display:block;margin:0 auto 16px;filter:drop-shadow(0 0 10px rgba(201,168,76,0.4))}
.modal-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;margin-bottom:20px;color:var(--gold);text-align:center}

.hero{background:linear-gradient(135deg,#0f0c03,#1a1508,#0a0a0a);border:1px solid var(--border-gold);border-radius:16px;padding:50px 32px;text-align:center;margin-bottom:32px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(201,168,76,0.08) 0%,transparent 70%)}
.hero-logo{width:120px;height:120px;object-fit:contain;margin:0 auto 16px;display:block;filter:drop-shadow(0 0 20px rgba(201,168,76,0.5));position:relative;z-index:1}
.hero-title{font-family:'Playfair Display',serif;font-size:36px;font-weight:700;color:var(--gold);margin-bottom:10px;text-shadow:0 2px 20px rgba(201,168,76,0.3);position:relative;z-index:1}
.hero-sub{font-size:15px;color:var(--text2);margin-bottom:24px;position:relative;z-index:1}
.hero-divider{width:60px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:0 auto 20px;position:relative;z-index:1}
.hero-btns{display:flex;gap:12px;justify-content:center;position:relative;z-index:1}

.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:26px}
.stat-card{background:var(--black-card);border:1px solid var(--border-gold);border-radius:10px;padding:18px;text-align:center;transition:border-color .2s}
.stat-card:hover{border-color:var(--gold)}
.stat-num{font-size:26px;font-weight:700;font-family:'Playfair Display',serif;color:var(--gold)}
.stat-label{font-size:12px;color:var(--text3);margin-top:3px;text-transform:uppercase;letter-spacing:0.5px}

.empty{text-align:center;padding:50px 20px;color:var(--text3)}
.empty-icon{font-size:44px;margin-bottom:14px}
.empty p{font-size:15px;margin-bottom:16px}

.gold-line{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--border-gold),transparent);margin:20px 0}
`;

const STATUS_STEPS = ["Pending", "Processing", "Out for Delivery", "Delivered"];

// ── SHOP VIEW (outside App to fix focus) ──
const ShopView = ({ products, searchQ, setSearchQ, filterCat, setFilterCat,
                    filterOcc, setFilterOcc, filterMax, setFilterMax,
                    user, setModal, addToCart }) => {
  const cats = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];
  const occs = ["All", ...new Set(products.map(p => p.occasion).filter(Boolean))];
  const maxP = filterMax ? +filterMax : Infinity;
  const filtered = products.filter(p =>
    (!searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase()) || (p.description||"").toLowerCase().includes(searchQ.toLowerCase()))
    && (filterCat === "All" || p.category === filterCat)
    && (filterOcc === "All" || p.occasion === filterOcc)
    && parseFloat(p.price) <= maxP
  );
  return (
    <div>
      {!user && (
        <div className="hero">
          <img src={LOGO} alt="JM Flower Shop" className="hero-logo" />
          <div className="hero-title">JM Flower Shop</div>
          <div className="hero-divider"></div>
          <div className="hero-sub">Premium blooms for every special moment — delivered with elegance</div>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => setModal("register")}>Shop Now</button>
            <button className="btn btn-secondary" onClick={() => setModal("login")}>Sign In</button>
          </div>
        </div>
      )}
      <div className="section-title">Our Collection</div>
      <div className="section-sub">{filtered.length} premium arrangement{filtered.length !== 1 ? "s" : ""} available</div>
      <div className="filter-bar">
        <input
          placeholder="Search arrangements..."
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
          autoComplete="off"
        />
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterOcc} onChange={e => setFilterOcc(e.target.value)}>
          {occs.map(o => <option key={o}>{o}</option>)}
        </select>
        <input
          placeholder="Max price ₱"
          value={filterMax}
          onChange={e => setFilterMax(e.target.value)}
          style={{maxWidth:130}}
          autoComplete="off"
        />
      </div>
      {filtered.length === 0
        ? <div className="empty"><div className="empty-icon">🌿</div><p>No arrangements found</p></div>
        : <div className="product-grid">{filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img">{p.emoji}</div>
              <div className="product-info">
                <span className="badge badge-cat">{p.category}</span>
                <span className="badge badge-occ">{p.occasion}</span>
                <div className="product-name">{p.name}</div>
                <div className="product-desc">{p.description}</div>
                <div className="product-price">₱{parseFloat(p.price).toLocaleString()}</div>
                <div className={`product-stock ${p.stock===0?"out":p.stock<=3?"low":""}`}>
                  {p.stock===0?"Out of stock":p.stock<=3?`Only ${p.stock} left`:`${p.stock} in stock`}
                </div>
                <button className="btn btn-primary btn-full btn-sm" disabled={p.stock===0} onClick={() => addToCart(p)}>
                  {p.stock===0?"Out of Stock":"Add to Cart"}
                </button>
              </div>
            </div>
          ))}</div>
      }
    </div>
  );
};

// ── CART VIEW (outside App to fix delivery address focus) ──
const CartView = ({ cart, updateQty, cartTotal, cartQty, grandTotal, deliveryFee,
                    checkoutStep, setCheckoutStep, deliveryType, setDeliveryType,
                    deliveryDate, setDeliveryDate, deliveryTime, setDeliveryTime,
                    deliveryAddr, setDeliveryAddr, giftNote, setGiftNote,
                    checkout, loading, setView }) => {
  if (cart.length === 0) return (
    <div className="empty"><div className="empty-icon">🛒</div><p>Your cart is empty</p>
      <button className="btn btn-primary" onClick={() => setView("shop")}>Browse Collection</button>
    </div>
  );
  if (checkoutStep === 2) return (
    <div>
      <div className="section-title">Checkout</div>
      <div className="section-sub">Complete your order details</div>
      <div className="card">
        <h3 style={{fontFamily:"Playfair Display,serif",marginBottom:16,color:"var(--gold)"}}>Delivery Options</h3>
        <div className="delivery-options">
          {[["delivery","🚚","Home Delivery","+₱150 fee"],["pickup","🏪","Store Pickup","Free"]].map(([type,icon,label,sub]) => (
            <div key={type} className={`delivery-opt ${deliveryType===type?"selected":""}`} onClick={() => setDeliveryType(type)}>
              <div className="delivery-opt-icon">{icon}</div>
              <div className="delivery-opt-label">{label}</div>
              <div className="delivery-opt-price">{sub}</div>
            </div>
          ))}
        </div>
        <div className="form-group"><label>Preferred Date</label>
          <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
        </div>
        <div className="form-group"><label>Preferred Time</label>
          <select value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)}>
            {["","8:00 AM - 10:00 AM","10:00 AM - 12:00 PM","12:00 PM - 2:00 PM","2:00 PM - 4:00 PM","4:00 PM - 6:00 PM"].map(t => <option key={t} value={t}>{t||"Select time slot"}</option>)}
          </select>
        </div>
        {deliveryType==="delivery" && (
          <div className="form-group"><label>Delivery Address</label>
            <textarea
              placeholder="Enter full delivery address..."
              value={deliveryAddr}
              onChange={e => setDeliveryAddr(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}
        <div className="form-group"><label>Gift Note (optional)</label>
          <textarea
            placeholder="Add a personal message..."
            value={giftNote}
            onChange={e => setGiftNote(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="gold-line"></div>
        <h3 style={{fontFamily:"Playfair Display,serif",marginBottom:14,color:"var(--gold)"}}>Payment Method</h3>
        <div className="delivery-options" style={{gridTemplateColumns:"1fr 1fr 1fr"}}>
          {[["💵","Cash on Delivery","Pay when received"],["💳","Credit/Debit Card","Visa, Mastercard"],["📱","E-Wallet","GoPay, Maya, etc"]].map(([icon,label,sub]) => (
            <div key={label} className="delivery-opt selected" style={{cursor:"default"}}>
              <div className="delivery-opt-icon">{icon}</div>
              <div className="delivery-opt-label">{label}</div>
              <div className="delivery-opt-price">{sub}</div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <div className="cart-total-row"><span>Subtotal</span><span>₱{cartTotal().toLocaleString()}</span></div>
          <div className="cart-total-row"><span>Delivery fee</span><span>₱{deliveryFee().toLocaleString()}</span></div>
          <div className="cart-total-row grand"><span>Total</span><span>₱{grandTotal().toLocaleString()}</span></div>
        </div>
        <div style={{display:"flex",gap:10,marginTop:18}}>
          <button className="btn btn-secondary" onClick={() => setCheckoutStep(1)}>Back</button>
          <button className="btn btn-primary" style={{flex:1}} onClick={checkout} disabled={loading}>{loading?"Placing Order...":"Place Order 🌹"}</button>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="section-title">Your Cart</div>
      <div className="section-sub">{cartQty()} item{cartQty()!==1?"s":""}</div>
      <div className="card">
        {cart.map(c => (
          <div className="cart-item" key={c.id}>
            <div className="cart-emoji">{c.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:500,fontSize:14,color:"var(--text)"}}>{c.name}</div>
              <div style={{fontSize:13,color:"var(--text3)"}}>₱{parseFloat(c.price).toLocaleString()} each</div>
            </div>
            <div className="qty-ctrl">
              <button className="qty-btn" onClick={() => updateQty(c.id,-1)}>−</button>
              <span style={{fontSize:14,fontWeight:600,minWidth:24,textAlign:"center",color:"var(--gold)"}}>{c.qty}</span>
              <button className="qty-btn" onClick={() => updateQty(c.id,1)}>+</button>
            </div>
            <div style={{minWidth:80,textAlign:"right",fontWeight:600,color:"var(--gold)",fontFamily:"Playfair Display,serif"}}>₱{(parseFloat(c.price)*c.qty).toLocaleString()}</div>
          </div>
        ))}
        <div className="cart-total">
          <div className="cart-total-row grand"><span>Subtotal</span><span>₱{cartTotal().toLocaleString()}</span></div>
        </div>
        <button className="btn btn-primary btn-full" style={{marginTop:18}} onClick={() => setCheckoutStep(2)}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

// ── MAIN APP ───────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("shop");
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(null);
  const [modal, setModal] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter state lives in App so ShopView can be a stable component
  const [searchQ, setSearchQ] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterOcc, setFilterOcc] = useState("All");
  const [filterMax, setFilterMax] = useState("");

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryAddr, setDeliveryAddr] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [adminTab, setAdminTab] = useState("products");
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "", occasion: "", emoji: "🌹", description: "" });
  const [supportSubj, setSupportSubj] = useState("");
  const [supportMsg, setSupportMsg] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => {
    if (user) {
      fetchMyOrders();
      if (user.role === "admin") { fetchAllOrders(); fetchUsers(); }
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      setProducts(await res.json());
    } catch { showAlert("Cannot connect to server. Make sure backend is running.", "error"); }
  };

  const fetchMyOrders = async () => {
    try { const res = await fetch(`${API}/orders/user/${user.id}`); setOrders(await res.json()); } catch { }
  };

  const fetchAllOrders = async () => {
    try { const res = await fetch(`${API}/orders`); setAllOrders(await res.json()); } catch { }
  };

  const fetchUsers = async () => {
    try { const res = await fetch(`${API}/users`); setUsers(await res.json()); } catch { }
  };

  const showAlert = (msg, type = "success") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const cartTotal = () => cart.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);
  const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);
  const deliveryFee = () => deliveryType === "pickup" ? 0 : 150;
  const grandTotal = () => cartTotal() + deliveryFee();

  const login = async () => {
    if (!loginEmail || !loginPass) return showAlert("Please fill all fields.", "error");
    try {
      const res = await fetch(`${API}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: loginEmail, password: loginPass }) });
      const data = await res.json();
      if (!res.ok) return showAlert(data.message || "Invalid login.", "error");
      setUser(data); setModal(null); setView("shop");
      showAlert(`Welcome back, ${data.name}!`);
    } catch { showAlert("Cannot connect to server.", "error"); }
  };

  const register = async () => {
    if (!regName || !regEmail || !regPass) return showAlert("All fields required.", "error");
    try {
      const res = await fetch(`${API}/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: regName, email: regEmail, password: regPass }) });
      const data = await res.json();
      if (!res.ok) return showAlert(data.message || "Registration failed.", "error");
      setUser(data); setModal(null); setView("shop");
      showAlert(`Account created! Welcome, ${data.name}!`);
    } catch { showAlert("Cannot connect to server.", "error"); }
  };

  const logout = () => { setUser(null); setCart([]); setOrders([]); setView("shop"); };

  const addToCart = (p) => {
    if (!user) return setModal("login");
    if (p.stock <= 0) return showAlert("Out of stock.", "error");
    const existing = cart.find(c => c.id === p.id);
    if (existing && existing.qty >= p.stock) return showAlert("Max stock reached.", "error");
    setCart(prev => existing ? prev.map(c => c.id === p.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { ...p, qty: 1 }]);
    showAlert(`${p.name} added to cart!`);
  };

  const updateQty = (id, delta) => setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));

  const checkout = async () => {
    if (!deliveryDate) return showAlert("Please select a delivery date.", "error");
    if (deliveryType === "delivery" && !deliveryAddr) return showAlert("Please enter delivery address.", "error");
    setLoading(true);
    try {
      const payload = {
        id: "ORD-" + Date.now(),
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        items: cart,
        subtotal: cartTotal(),
        deliveryFee: deliveryFee(),
        total: grandTotal(),
        deliveryType,
        deliveryDate,
        deliveryTime: deliveryTime || "",
        deliveryAddr: deliveryAddr || "",
        giftNote: giftNote || ""
      };
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) return showAlert(data.message || "Failed to place order.", "error");
      setCart([]); setCheckoutStep(1); setDeliveryDate(""); setDeliveryAddr(""); setGiftNote(""); setDeliveryTime("");
      await fetchMyOrders(); setView("orders");
      showAlert("Order placed successfully! 🌹");
    } catch (e) {
      showAlert("Failed to place order. Check your connection.", "error");
    }
    setLoading(false);
  };

  const adminUpdateStatus = async (orderId, status) => {
    try { await fetch(`${API}/orders/${orderId}/status`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); fetchAllOrders(); }
    catch { showAlert("Failed to update status.", "error"); }
  };

  const adminDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try { await fetch(`${API}/products/${id}`, { method: "DELETE" }); fetchProducts(); showAlert("Product deleted."); }
    catch { showAlert("Failed to delete.", "error"); }
  };

  const adminSaveProduct = async () => {
    const np = editProduct || newProduct;
    if (!np.name || !np.price || !np.stock) return showAlert("Fill required fields.", "error");
    try {
      if (editProduct) {
        await fetch(`${API}/products/${np.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(np) });
        setEditProduct(null); showAlert("Product updated!");
      } else {
        await fetch(`${API}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(np) });
        setNewProduct({ name: "", price: "", stock: "", category: "", occasion: "", emoji: "🌹", description: "" }); showAlert("Product added!");
      }
      fetchProducts();
    } catch { showAlert("Failed to save.", "error"); }
  };



  // ── ORDERS VIEW ────────────────────────────────────────
  const OrdersView = () => {
    if (orders.length === 0) return (
      <div className="empty"><div className="empty-icon">📦</div><p>No orders yet</p>
        <button className="btn btn-primary" onClick={() => setView("shop")}>Start Shopping</button>
      </div>
    );
    return (
      <div>
        <div className="section-title">My Orders</div>
        <div className="section-sub">Track your flower deliveries</div>
        {orders.map(order => {
          const si = STATUS_STEPS.indexOf(order.status);
          const items = typeof order.items === "string" ? JSON.parse(order.items) : (order.items || []);
          return (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 3, color: "var(--gold)", fontSize: 14 }}>{order.id}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>₱{parseFloat(order.total).toLocaleString()} · {order.delivery_type === "pickup" ? "Store Pickup" : "Delivery"} · {order.delivery_date}</div>
                </div>
                <span className={`status-badge status-${order.status === "Out for Delivery" ? "Out" : order.status}`}>{order.status}</span>
              </div>
              <div className="track-bar">
                {STATUS_STEPS.map((step, i) => (
                  <div className="track-step" key={step}>
                    {i < STATUS_STEPS.length - 1 && <div className={`track-line ${si > i ? "done" : ""}`} />}
                    <div className={`track-dot ${si > i ? "done" : si === i ? "current" : ""}`} />
                    <div className={`track-label ${si > i ? "done" : si === i ? "current" : ""}`}>{step}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 10 }}>{items.map(i => `${i.emoji} ${i.name} x${i.qty}`).join(", ")}</div>
              {order.gift_note && <div style={{ fontSize: 12, color: "var(--text3)", fontStyle: "italic", marginTop: 6 }}>🌸 "{order.gift_note}"</div>}
            </div>
          );
        })}
      </div>
    );
  };

  // ── ADMIN VIEW ─────────────────────────────────────────
  const AdminView = () => {
    const revenue = allOrders.filter(o => o.status !== "Cancelled").reduce((s, o) => s + parseFloat(o.total || 0), 0);
    const np = editProduct || newProduct;
    const setNp = (field, val) => editProduct ? setEditProduct({ ...editProduct, [field]: val }) : setNewProduct({ ...newProduct, [field]: val });
    return (
      <div>
        <div className="section-title">Admin Dashboard</div>
        <div className="section-sub">Manage your flower shop</div>
        <div className="stats-grid">
          {[["₱" + revenue.toLocaleString(), "Total Revenue"], [String(allOrders.length), "Total Orders"], [String(products.length), "Products"], [String(users.filter(u => u.role === "customer").length), "Customers"]].map(([n, l]) => (
            <div className="stat-card" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
          ))}
        </div>
        <div className="tabs">
          {["products", "orders", "users"].map(t => (
            <button key={t} className={`tab ${adminTab === t ? "active" : ""}`} onClick={() => { setAdminTab(t); if (t === "orders") fetchAllOrders(); if (t === "users") fetchUsers(); }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        {adminTab === "products" && <div>
          <div className="card">
            <h3 style={{ fontFamily: "Playfair Display,serif", marginBottom: 18, color: "var(--gold)" }}>{editProduct ? "Edit Product" : "Add New Product"}</h3>
            <div className="row">
              <div className="col-half">
                <div className="form-group"><label>Name *</label><input placeholder="Product name" value={np.name} onChange={e => setNp("name", e.target.value)} /></div>
                <div className="form-group"><label>Price (₱) *</label><input type="number" placeholder="Price" value={np.price} onChange={e => setNp("price", e.target.value)} /></div>
                <div className="form-group"><label>Stock *</label><input type="number" placeholder="Stock" value={np.stock} onChange={e => setNp("stock", e.target.value)} /></div>
              </div>
              <div className="col-half">
                <div className="form-group"><label>Category</label><input placeholder="e.g. Roses" value={np.category || ""} onChange={e => setNp("category", e.target.value)} /></div>
                <div className="form-group"><label>Occasion</label><input placeholder="e.g. Birthday" value={np.occasion || ""} onChange={e => setNp("occasion", e.target.value)} /></div>
                <div className="form-group"><label>Emoji</label><input placeholder="🌹" value={np.emoji || ""} style={{ maxWidth: 80 }} onChange={e => setNp("emoji", e.target.value)} /></div>
              </div>
            </div>
            <div className="form-group"><label>Description</label><textarea placeholder="Product description..." value={np.description || ""} onChange={e => setNp("description", e.target.value)} /></div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-primary" onClick={adminSaveProduct}>{editProduct ? "Save Changes" : "Add Product"}</button>
              {editProduct && <button className="btn btn-secondary" onClick={() => setEditProduct(null)}>Cancel</button>}
            </div>
          </div>
          <div className="card">
            <table className="admin-table">
              <thead><tr>{["Flower", "Category", "Occasion", "Price", "Stock", "Actions"].map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{products.map(p => (
                <tr key={p.id}>
                  <td style={{ color: "var(--text)" }}>{p.emoji} {p.name}</td>
                  <td>{p.category || "—"}</td><td>{p.occasion || "—"}</td>
                  <td style={{ color: "var(--gold)" }}>₱{parseFloat(p.price).toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td><div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditProduct({ ...p })}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => adminDeleteProduct(p.id)}>Delete</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>}
        {adminTab === "orders" && <div className="card">
          {allOrders.length === 0 ? <div className="empty"><div className="empty-icon">📋</div><p>No orders yet</p></div>
            : <table className="admin-table">
              <thead><tr>{["Order ID", "Customer", "Total", "Date", "Delivery Date", "Status", "Update"].map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{allOrders.map(o => (
                <tr key={o.id}>
                  <td style={{ color: "var(--gold)", fontSize: 12 }}>{o.id}</td>
                  <td style={{ color: "var(--text)" }}>{o.user_name || o.user_email}</td>
                  <td style={{ color: "var(--gold)" }}>₱{parseFloat(o.total || 0).toLocaleString()}</td>
                  <td>{o.created_at ? new Date(o.created_at).toLocaleDateString() : "—"}</td>
                  <td>{o.delivery_date || "—"}</td>
                  <td><span className={`status-badge status-${(o.status || "Pending") === "Out for Delivery" ? "Out" : (o.status || "Pending")}`}>{o.status}</span></td>
                  <td><select style={{ fontSize: 12, padding: "5px 8px", border: "1px solid var(--border-gold)", borderRadius: 6, background: "var(--black-soft)", color: "var(--text)" }} value={o.status} onChange={e => adminUpdateStatus(o.id, e.target.value)}>
                    {[...STATUS_STEPS, "Cancelled"].map(s => <option key={s}>{s}</option>)}
                  </select></td>
                </tr>
              ))}</tbody>
            </table>}
        </div>}
        {adminTab === "users" && <div className="card">
          <table className="admin-table">
            <thead><tr>{["ID", "Name", "Email", "Role"].map(c => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>{users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td><td style={{ color: "var(--text)" }}>{u.name}</td><td>{u.email}</td>
                <td><span className={`badge ${u.role === "admin" ? "badge-occ" : "badge-cat"}`}>{u.role}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>}
      </div>
    );
  };

  // ── SUPPORT VIEW ───────────────────────────────────────
  const SupportView = () => (
    <div>
      <div className="section-title">Customer Support</div>
      <div className="section-sub">We're here to help you</div>
      <div className="support-grid">
        {[["📞", "Call Us", "0917-XXX-XXXX"], ["📧", "Email", "support@jmflowers.com"], ["💬", "Live Chat", "Available 9AM–6PM"]].map(([icon, label, sub]) => (
          <div className="support-opt" key={label}>
            <div className="support-opt-icon">{icon}</div>
            <div className="support-opt-label">{label}</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{ fontFamily: "Playfair Display,serif", marginBottom: 18, color: "var(--gold)" }}>Send a Message</h3>
        <div className="form-group"><label>Subject</label>
          <select value={supportSubj} onChange={e => setSupportSubj(e.target.value)}>
            {["Select topic", "Order Issue", "Delivery Problem", "Product Inquiry", "Return/Refund", "Other"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Message</label>
          <textarea placeholder="Describe your concern..." style={{ minHeight: 120 }} value={supportMsg} onChange={e => setSupportMsg(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => {
          if (!supportMsg) return showAlert("Please enter a message.", "error");
          setTickets(prev => [...prev, { id: "TKT-" + Date.now(), subj: supportSubj, msg: supportMsg, date: new Date().toLocaleDateString(), status: "Open" }]);
          setSupportMsg(""); setSupportSubj("");
          showAlert("Support ticket submitted! We'll respond within 24 hours.");
        }}>Submit Ticket</button>
        {tickets.length > 0 && <div style={{ marginTop: 22 }}>
          <h4 style={{ marginBottom: 12, fontWeight: 600, color: "var(--gold)" }}>Your Tickets</h4>
          {tickets.map(t => (
            <div key={t.id} style={{ padding: 12, background: "var(--black-soft)", border: "1px solid var(--border-gold)", borderRadius: 8, marginBottom: 10, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 600, color: "var(--text)" }}>{t.id} — {t.subj}</span><span className="badge badge-occ">{t.status}</span></div>
              <div style={{ color: "var(--text2)", marginTop: 5 }}>{t.msg}</div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );

  // ── MAIN RENDER ────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div id="app">
        <nav className="nav">
          <div className="nav-brand">
            <img src={LOGO} alt="JM Flower Shop Logo" className="nav-logo" />
            <div className="nav-brand-text">JM Flower Shop <span>premium florist</span></div>
          </div>
          <div className="nav-actions">
            {user ? <>
              <button className="nav-btn" onClick={() => setView("shop")}>Shop</button>
              <button className="nav-btn" onClick={() => { fetchMyOrders(); setView("orders"); }}>My Orders</button>
              {user.role === "admin" && <button className="nav-btn" onClick={() => { fetchAllOrders(); fetchUsers(); setView("admin"); }}>Admin</button>}
              <button className="nav-btn" onClick={() => setView("support")}>Support</button>
              <button className="nav-btn" onClick={logout}>Logout ({user.name.split(" ")[0]})</button>
              <button className="cart-btn" onClick={() => setView("cart")}>
                {cartQty() > 0 && <span className="cart-count">{cartQty()}</span>}
                Cart{cartTotal() > 0 ? ` ₱${cartTotal().toLocaleString()}` : ""}
              </button>
            </> : <>
              <button className="nav-btn" onClick={() => setModal("login")}>Login</button>
              <button className="nav-btn primary" onClick={() => setModal("register")}>Register</button>
            </>}
          </div>
        </nav>

        <div className="main">
          {alert && <div className={`alert ${alert.type}`}>{alert.msg}</div>}

          {view === "shop" && (
            <ShopView
              products={products}
              user={user}
              setModal={setModal}
              addToCart={addToCart}
              searchQ={searchQ}
              setSearchQ={setSearchQ}
              filterCat={filterCat}
              setFilterCat={setFilterCat}
              filterOcc={filterOcc}
              setFilterOcc={setFilterOcc}
              filterMax={filterMax}
              setFilterMax={setFilterMax}
            />
          )}
          {view === "cart" && (
            <CartView
              cart={cart}
              updateQty={updateQty}
              cartTotal={cartTotal}
              cartQty={cartQty}
              grandTotal={grandTotal}
              deliveryFee={deliveryFee}
              checkoutStep={checkoutStep}
              setCheckoutStep={setCheckoutStep}
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
              deliveryTime={deliveryTime}
              setDeliveryTime={setDeliveryTime}
              deliveryAddr={deliveryAddr}
              setDeliveryAddr={setDeliveryAddr}
              giftNote={giftNote}
              setGiftNote={setGiftNote}
              checkout={checkout}
              loading={loading}
              setView={setView}
            />
          )}
          {view === "orders" && user && <OrdersView />}
          {view === "admin" && user?.role === "admin" && <AdminView />}
          {view === "support" && <SupportView />}
        </div>

        {modal === "login" && (
          <div className="modal-overlay" onClick={e => e.target.classList.contains("modal-overlay") && setModal(null)}>
            <div className="modal">
              <img src={LOGO} alt="JM Flower Shop" className="modal-logo" />
              <div className="modal-title">Welcome Back</div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="your@email.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} /></div>
              <div className="form-group"><label>Password</label><input type="password" placeholder="Password" value={loginPass} onChange={e => setLoginPass(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} /></div>
              <button className="btn btn-primary btn-full" onClick={login}>Login</button>
              <div className="gold-line"></div>
              <p style={{ textAlign: "center", fontSize: 13, color: "var(--text3)" }}>No account? <span style={{ color: "var(--gold)", cursor: "pointer", fontWeight: 500 }} onClick={() => setModal("register")}>Register here</span></p>
              <p style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "var(--text3)" }}>Admin: admin@test.com / admin123</p>
            </div>
          </div>
        )}
        {modal === "register" && (
          <div className="modal-overlay" onClick={e => e.target.classList.contains("modal-overlay") && setModal(null)}>
            <div className="modal">
              <img src={LOGO} alt="JM Flower Shop" className="modal-logo" />
              <div className="modal-title">Create Account</div>
              <div className="form-group"><label>Full Name</label><input placeholder="Your name" value={regName} onChange={e => setRegName(e.target.value)} /></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="your@email.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} /></div>
              <div className="form-group"><label>Password</label><input type="password" placeholder="Password" value={regPass} onChange={e => setRegPass(e.target.value)} onKeyDown={e => e.key === "Enter" && register()} /></div>
              <button className="btn btn-primary btn-full" onClick={register}>Create Account</button>
              <div className="gold-line"></div>
              <p style={{ textAlign: "center", fontSize: 13, color: "var(--text3)" }}>Have an account? <span style={{ color: "var(--gold)", cursor: "pointer", fontWeight: 500 }} onClick={() => setModal("login")}>Sign in</span></p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}