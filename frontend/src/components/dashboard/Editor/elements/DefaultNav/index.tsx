const DefaultNav = () =>
  <>
    <div className="element__wrapper no-select" data-block="DefaultNav">
      <nav className="element-DefaultNavbar">
        <div className="element-DefaultNavbar__container">
          <div className="element-DefaultNavbar__logo">MySite</div>
          <button className="element-DefaultNavbar__toggle" aria-label="Toggle menu">☰</button>
          <ul className="element-DefaultNavbar__links element__wrapper" data-block="DefaultNav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div className="element-DefaultNavbar__overlay"></div>
    </div>
  </>

export default DefaultNav