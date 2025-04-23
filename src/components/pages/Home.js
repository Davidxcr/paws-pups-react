import React from 'react';

const Home = () => {
  return (
    <>
      <section className="container-fluid px-0">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div id="headingGroup" className="text-white text-center d-none d-lg-block mt-5">
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
              <h1 className="display-2">PAWS<span>/</span>PUPS<span>/</span>LOVE</h1>
            </div>
          </div>
          <div className="col-lg-6">
            <img className="img-fluid" src="/imgs/dog1.jpg" alt="Dog" />
          </div>
        </div>
      </section>

      <section className="container-fluid px-0">
        <div className="row align-items-center content">
          <div className="col-md-6 order-2 order-md-1">
            <img src="/imgs/dog2.jpg" alt="Dog" className="img-fluid" />
          </div>
          <div className="col-md-6 text-center order-1 order-md-2">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
                <h2>WELCOME TO PAWS & PUPS</h2>
                <img src="/imgs/paw_icon.svg" alt="paw icon" className="d-none d-lg-inline" style={{ width: '30px', height: '30px' }} />
                <p className="lead">Welcome to Paws & Pups, where every dog finds their forever home! Our mission is to connect loving families with adorable canine companions. From playful puppies to wise senior dogs, we celebrate the joy and unconditional love that dogs bring to our lives. Visit us to meet your new best friend and experience the magic of puppy cuddles and wagging tails.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center content">
          <div className="col-md-6 text-center">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
                <h2>DOG ADOPTION</h2>
                <img src="/imgs/paw_icon.svg" alt="paw icon" className="d-none d-lg-inline" style={{ width: '30px', height: '30px' }} />
                <p className="lead">Adopting a dog is a rewarding experience that changes both your life and theirs. Our adoption process is designed to ensure the perfect match between dogs and their new families. We provide all necessary information about each dog's personality, needs, and background to help you make an informed decision. Every adoption includes initial vaccinations, microchipping, and a starter kit to help your new friend settle in.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src="/imgs/dog3.jpg" alt="Dog" className="img-fluid" />
          </div>
        </div>
        <div className="row align-items-center content">
          <div className="col-md-6 order-2 order-md-1">
            <img src="/imgs/dog4.jpg" alt="Dog" className="img-fluid" />
          </div>
          <div className="col-md-6 text-center order-1 order-md-2">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
                <h2>PAWSOME CARE</h2>
                <img src="/imgs/paw_icon.svg" alt="paw icon" className="d-none d-lg-inline" style={{ width: '30px', height: '30px' }} />
                <p className="lead">Providing the best care for your furry friend is essential for their health and happiness. From nutritional advice to training tips, we're here to support you throughout your journey as a pet parent. Our experienced team can help with everything from puppy training to senior dog care. Remember, a healthy pup is a happy pup, and we're committed to helping your dog live their best life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
