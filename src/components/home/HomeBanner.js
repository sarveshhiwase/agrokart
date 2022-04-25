import banner from '../../images/banner.jpg';

const HomeBanner = () => {
  return (
    <div className="home__banner">
      <img src={banner} alt="banner" />
      <div className="home__bannert">
        <span className="home__bannert--big">A World of Agriculture</span>
        <span className="home__bannert--small">
          Find the products you need for your farms, plants and more.
        </span>
        <button className="home__bannerbtn">
          Explore Now.
          {/* <img src={next} alt="next" /> */}
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
