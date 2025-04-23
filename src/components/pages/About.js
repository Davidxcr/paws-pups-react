import React from 'react';

const About = () => {
  return (
    <>
      <section className="container-fluid px-0">
        <div className="row align-items-center">
          <div className="col-md-6 order-2 order-md-1">
            <img src="/imgs/dog5.jpg" alt="Dog" className="img-fluid" />
          </div>
          <div className="col-md-6 text-center order-1 order-md-2">
            <div className="row justify-content-center">
              <div className="col-10 col-lg-8 blurb mb-5 mb-md-0">
                <h2>ABOUT PAWS & PUPS</h2>
                <img src="/imgs/paw_icon.svg" alt="paw icon" className="d-none d-lg-inline" style={{ width: '30px', height: '30px' }} />
                <p className="lead">Paws & Pups was founded in 2015 with a simple mission: to find loving homes for dogs in need. What started as a small rescue operation has grown into a comprehensive adoption center that has helped thousands of dogs find their forever families.</p>
                <p className="lead">Our team consists of dedicated animal lovers, veterinarians, and trainers who work tirelessly to ensure the health and happiness of every dog in our care. We believe that every dog deserves a loving home, and we're committed to making that happen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="display-4" style={{ color: '#6b4226' }}>OUR TEAM</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title" style={{ color: '#6b4226' }}>Dr. Sarah Johnson</h3>
                <h6 className="card-subtitle mb-2 text-muted">Founder & Veterinarian</h6>
                <p className="card-text">Dr. Sarah has over 15 years of experience in veterinary medicine and a lifelong passion for animal rescue.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title" style={{ color: '#6b4226' }}>Mike Thompson</h3>
                <h6 className="card-subtitle mb-2 text-muted">Head Trainer</h6>
                <p className="card-text">Mike specializes in positive reinforcement training methods and has helped rehabilitate hundreds of dogs.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title" style={{ color: '#6b4226' }}>Lisa Chen</h3>
                <h6 className="card-subtitle mb-2 text-muted">Adoption Coordinator</h6>
                <p className="card-text">Lisa has a knack for matching dogs with the perfect families and has facilitated over 1,000 adoptions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 className="display-4" style={{ color: '#6b4226' }}>OUR FACILITY</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="lead">Our state-of-the-art facility includes:</p>
            <ul className="lead">
              <li>Spacious indoor and outdoor play areas</li>
              <li>Comfortable, climate-controlled kennels</li>
              <li>On-site veterinary clinic</li>
              <li>Training center</li>
              <li>Grooming station</li>
            </ul>
          </div>
          <div className="col-md-6">
            <p className="lead">We pride ourselves on providing a stress-free environment for our dogs while they wait for their forever homes. Each dog receives personalized care, regular exercise, socialization, and lots of love from our staff and volunteers.</p>
            <p className="lead">We invite you to visit our facility and see for yourself the loving care we provide to our furry friends.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
