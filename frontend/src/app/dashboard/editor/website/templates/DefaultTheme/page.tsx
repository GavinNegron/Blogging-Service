import './styles.sass';

export default function DefaultTheme() {
  return (
    <>
    <div className="container">
      <div className="nav">
          <div className="nav__inner">
            <div className="nav__group">
              <div className="nav__logo">
                <span>HappyBlogger</span>
              </div>
            </div>
            <div className="nav__group">
              <div className="nav__links">
                <div className="nav__links__item">
                  <a href="#">Home</a>
                </div>
                <div className="nav__links__item">
                  <a href="#news">News</a>
                </div>
                <div className="nav__links__item">
                  <a href="#about">About</a>
                </div>
                <div className="nav__links__item">
                  <a href="#about">Contact</a>
                </div>
              </div>
              <div className="nav__cta">
                <button className='cta-btn'>Newsletter</button>
              </div>
            </div>
            <div className="nav__group">
              <div className="nav__search">
                <input type="text" />
              </div>
            </div>
          </div>
      </div>
      <main className="main">
         
      </main>
    </div>
    </>
  )
}