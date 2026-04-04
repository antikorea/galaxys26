'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <main className={styles.mainContainer}>
      <div className={styles.viewControls}>
        <button 
          className={viewMode === 'desktop' ? styles.activeBtn : ''} 
          onClick={() => setViewMode('desktop')}
        >
          Desktop View
        </button>
        <button 
          className={viewMode === 'mobile' ? styles.activeBtn : ''} 
          onClick={() => setViewMode('mobile')}
        >
          Mobile View
        </button>
      </div>

      <div className={`${styles.deviceWrapper} ${viewMode === 'mobile' ? styles.mobileMode : styles.desktopMode}`}>
        <div className={styles.appContent}>
          <header className={styles.navbar}>
            <div className={styles.logo}>
              <img src="/assets/logo.png" alt="Logo" width={50} height={50} />
              <span>ARES TACTICAL</span>
            </div>
            <nav className={viewMode === 'mobile' ? styles.navHidden : styles.navLinks}>
              <a href="#">Shop</a>
              <a href="#">About</a>
              <a href="#">Cart (0)</a>
            </nav>
            {viewMode === 'mobile' && <a href="#" style={{color:'white', fontWeight:600}}>Cart</a>}
          </header>

          <section className={styles.hero}>
            <h1>GEAR UP FOR THE UNKNOWN.</h1>
            <p>Premium civilian-military equipment for survival and adventure.</p>
          </section>

          <section className={`${styles.productGrid} ${viewMode === 'mobile' ? styles.mobileGrid : ''}`}>
            {/* Product 1 */}
            <div className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img src="/assets/apparel.png" alt="Boot" />
              </div>
              <div className={styles.productInfo}>
                <h3>Phantom Combat Boot</h3>
                <p className={styles.price}>$189.99</p>
                <button className={styles.buyBtn}>Add to Cart</button>
              </div>
            </div>

            {/* Product 2 */}
            <div className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img src="/assets/gear.png" alt="Knife" />
              </div>
              <div className={styles.productInfo}>
                <h3>Obsidian Folding Knife</h3>
                <p className={styles.price}>$89.50</p>
                <button className={styles.buyBtn}>Add to Cart</button>
              </div>
            </div>

            {/* Product 3 */}
            <div className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img src="/assets/survival.png" alt="MRE" />
              </div>
              <div className={styles.productInfo}>
                <h3>Elite Survival Ration</h3>
                <p className={styles.price}>$24.00</p>
                <button className={styles.buyBtn}>Add to Cart</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
