import React from 'react';
import { Jumbotron, Button, Carousel } from 'react-bootstrap';

export default function HomeComponent() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/wukyanlay/image/upload/v1589652872/UCSP/uni2_iivljr.jpg"
            alt="First slide"
            height="50%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/wukyanlay/image/upload/v1589652872/UCSP/uni4_g07lzg.jpg"
            alt="Third slide"
            height="50%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/wukyanlay/image/upload/v1589652872/UCSP/uni5_geohkt.jpg"
            alt="Third slide"
            height="50%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/wukyanlay/image/upload/v1589652872/UCSP/uni3_ibce6x.jpg"
            alt="Fourth slide"
            height="50%"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/wukyanlay/image/upload/v1589652872/UCSP/uni1_h757ub.jpg"
            alt="Fifth slide"
            height="50%"
          />
        </Carousel.Item>
      </Carousel>
      <Jumbotron>
        <h4>
          မင်္ဂလာပါခင်ဗျာ။ ကျွန်တော်တို့ ကွန်ပျူတာတက္ကသိုလ်(ပုသိမ်)
          ကျောင်းသားသမဂ္ဂရဲ့ "စာဖတ်ကြစို့" page ကနေကြိုဆိုလိုက်ပါတယ်။
        </h4>
        <p>
          ကျောင်းဖွင့်ရက်တိုင်းမှာ လာရောက်ငှားယူနိုင်မှာဖြစ်ပြီး ကျောင်းသားကဒ်
          တစ်ခုပဲလိုမှာဖြစ်လို့ စာဖတ်ဝါသနာရှင်အားလုံးကို ဖိတ်ခေါ်လိုက်ရပါတယ်။
        </p>
        <p>
          <Button variant="dark">စည်းကမ်းချက်များ။</Button>
        </p>
      </Jumbotron>
    </div>
  );
}
