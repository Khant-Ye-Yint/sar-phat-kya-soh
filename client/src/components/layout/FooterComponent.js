import React from 'react';

export default function FooterComponent() {
  return (
    <div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-7 col-sm-5">
              <h5>Our Address</h5>
              <address class="address">
                University of Computer Studies
                <br />
                Pathein
                <br />
                Myanmar
                <br />
                Tel.: +852 1234 5678
                <br />
                Fax: +988 7765 7786
                <br />
                Email:{' '}
                <a href="ucspathein@wukong.gamil.com">
                  ucspathein@wukong.gamil.com
                </a>
              </address>
            </div>
            <div class="col-12 col-sm-4 align-self-center">
              <div class="text-center">
                <a href="http://google.com/+">Google+</a>
                <a href="http://www.facebook.com/profile.php?id=">Facebook</a>
                <a href="http://www.linkedin.com/in/">LinkedIn</a>
                <a href="http://twitter.com/">Twitter</a>
                <a href="http://youtube.com/">YouTube</a>
                <a href="mailto:">Mail</a>
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
