// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSubTotal } from "./store/invoiceSlice";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import "./App.css";
import InvoiceGeneralInfo from "./InvoiceGeneralInfo";
import InvoiceItems from "./InvoiceItems";
import InvoiceTotals from "./InvoiceTotals";

function App() {
  // const [count, setCount] = useState(0);
  const invoice = useSelector((state) => state.invoice.subTotal);
  const dispatch = useDispatch();
  const methods = useForm();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   getValues,
  //   formState: { errors },
  // } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="p-5" style={{ background: "#fafafb" }}>
      {/* <div>{invoice}</div>
      <button onClick={() => dispatch(setSubTotal({ subTotal: 5 }))}>
        set sub total
      </button> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <InvoiceGeneralInfo />
          <InvoiceItems />
          <InvoiceTotals />
          {/* include validation with required or other standard HTML validation rules */}

          {/* <input type="submit" /> */}
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
