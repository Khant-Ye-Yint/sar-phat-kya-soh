import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

export default function HomeComponent() {
  return (
    <div>
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
