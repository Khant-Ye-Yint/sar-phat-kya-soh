import React from 'react';

export default function FooterComponent() {
  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        padding: '50px',
        color: 'white',
      }}
    >
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-5">
              <h5>Our Address</h5>
              <address class="address">
                University of Computer Studies
                <br />
                Pathein
                <br />
                Myanmar
                <br />
                Tel1: +95 779 000 658
                <br />
                Tel2: +95 957 156 912
                <br />
                Email:{' '}
                <a href="tinhtunwin@ucspathein.edu.mm">
                  tinhtunwin@ucspathein.edu.mm
                </a>
              </address>
            </div>
            <div class="col-12 col-sm-4 align-self-center">
              <div class="text-center">
                <a href="https://www.facebook.com/ttp.ucspsu/">
                  <img src="/facebook-logo.png" width="100px" />{' '}
                </a>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-auto">
              <p>© Copyright 2020 Khant Ye Yint</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
